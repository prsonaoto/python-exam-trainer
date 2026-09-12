window.addEventListener('load',()=>{
  const VERSION='7.1';
  const STAR_KEY='python_exam_question_star_v1';

  function loadStars(){
    try{
      const raw=JSON.parse(localStorage.getItem(STAR_KEY)||'{}');
      if(!raw||Array.isArray(raw)||typeof raw!=='object')return {};
      const out={};
      for(const [id,v] of Object.entries(raw))if(v===true)out[id]=true;
      return out;
    }catch(e){return {};}
  }
  function saveStars(stars){localStorage.setItem(STAR_KEY,JSON.stringify(stars));}
  function isStarred(id){return Boolean(id&&loadStars()[id]===true);}
  function setStarred(id,value){
    if(!id)return;
    const stars=loadStars();
    if(value)stars[id]=true;else delete stars[id];
    saveStars(stars);
  }
  function starIds(){return Object.keys(loadStars());}

  window.getQuestionStar=isStarred;
  window.setQuestionStar=setStarred;

  // ---- UI: current question star ----
  const quizCard=document.getElementById('quizCard');
  const tags=document.getElementById('tags');
  let starBtn=document.getElementById('starBtn');
  if(!starBtn&&quizCard&&tags){
    const row=document.createElement('div');
    row.id='starRow';
    row.style.cssText='display:flex;justify-content:flex-end;margin:8px 0 2px';
    starBtn=document.createElement('button');
    starBtn.id='starBtn';
    starBtn.type='button';
    starBtn.style.cssText='border:1px solid var(--line);background:var(--card);color:var(--text);border-radius:999px;padding:7px 11px;font-size:13px;font-weight:700;cursor:pointer';
    row.appendChild(starBtn);
    tags.insertAdjacentElement('afterend',row);
  }

  function currentQuestion(){return Array.isArray(session)&&session[current]?session[current]:null;}
  function updateStarButton(){
    if(!starBtn)return;
    const q=currentQuestion();
    if(!q){starBtn.style.display='none';return;}
    starBtn.style.display='inline-block';
    const on=isStarred(q.id);
    starBtn.textContent=on?'★ 苦手':'☆ 苦手';
    starBtn.setAttribute('aria-pressed',on?'true':'false');
    starBtn.title=on?'苦手印を外す':'定着度が低い問題として印を付ける';
  }
  function syncLatestAttemptStar(qid,value){
    const h=loadHistory();
    for(let i=h.length-1;i>=0;i--){
      const r=h[i];
      if(r&&r.question_id===qid&&r.session_id===sessionId){
        r.starred=value;
        saveHistory(h);
        return;
      }
    }
  }
  if(starBtn){
    starBtn.onclick=()=>{
      const q=currentQuestion();if(!q)return;
      const next=!isStarred(q.id);
      setStarred(q.id,next);
      syncLatestAttemptStar(q.id,next);
      updateStarButton();
      updateSummary();
    };
  }

  const baseRenderQuestion=window.renderQuestion;
  if(typeof baseRenderQuestion==='function'){
    window.renderQuestion=function(){const out=baseRenderQuestion();updateStarButton();return out;};
  }

  // ---- Selection: starred questions are repeatedly reviewed ----
  // At most half of a session is reserved for starred questions. With one star,
  // that question appears in every eligible session until the user removes the star.
  const baseChooseQuestions=window.chooseQuestions;
  if(typeof baseChooseQuestions==='function'){
    window.chooseQuestions=function(pool,n){
      const eligible=(pool||[]).filter(q=>q&&!q.retired);
      const total=Math.min(Number(n)||0,eligible.length);
      if(total<=0)return [];
      const starred=eligible.filter(q=>isStarred(q.id));
      if(!starred.length)return baseChooseQuestions(eligible,total);
      const starTarget=Math.min(starred.length,Math.max(1,Math.ceil(total/2)));
      const starPick=baseChooseQuestions(starred,starTarget);
      const picked=new Set(starPick.map(q=>q.id));
      const restPool=eligible.filter(q=>!picked.has(q.id));
      const restPick=baseChooseQuestions(restPool,total-starPick.length);
      const combined=[...starPick,...restPick];
      for(let i=combined.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[combined[i],combined[j]]=[combined[j],combined[i]];}
      return combined;
    };
  }

  // ---- Stamp current bank/star state into new attempts ----
  function stampLatest(before,q){
    const h=loadHistory();
    if(h.length<=before||!q)return;
    const r=h[h.length-1];
    if(!r||r.session_id!==sessionId||r.question_id!==q.id)return;
    r.bank_version=VERSION;
    r.question_version=q.question_version||1;
    r.source_scope=q.source_scope||null;
    r.starred=isStarred(q.id);
    saveHistory(h);
  }
  const previousAnswer=window.answer;
  if(typeof previousAnswer==='function'){
    window.answer=function(i,btn){const before=loadHistory().length,q=currentQuestion();const out=previousAnswer(i,btn);stampLatest(before,q);return out;};
  }
  const previousSkip=window.skipQuestion;
  if(typeof previousSkip==='function'){
    window.skipQuestion=function(){const before=loadHistory().length,q=currentQuestion();const out=previousSkip();stampLatest(before,q);return out;};
    const skipBtn=document.getElementById('skipBtn');if(skipBtn)skipBtn.onclick=window.skipQuestion;
  }

  // ---- Export/share: stars are a separate subjective weakness signal ----
  function analysisPrompt(){
    return 'Python 3 エンジニア認定データ分析試験トレーナーの回答履歴です。skipped=trueは「分からない」として強い知識不足シグナルとして扱い、正答率には含めないでください。star=true または starred_question_ids に含まれる問題は、ユーザーが「苦手・定着度が低い」と主観的に手動指定した問題です。誤答やスキップとは独立した重要な弱点シグナルとして、復習優先度と問題バンク改善の判断に使ってください。ask_mode=incorrectは「誤っているものを選ぶ」問題、correctは「正しいものを選ぶ」問題です。source_scopeがある問題は、その資料範囲を超えた知識を前提に問題品質を批判しないでください。question_versionとbank_versionがある場合は改訂前後を混同しないでください。偶然正解の可能性も考慮し、知識不足と問題バンク側の改善点を分けて指摘してください。';
  }
  function payload(){
    const history=loadHistory();
    const stars=loadStars();
    const byId=new Map((window.QUESTION_BANK||[]).map(q=>[q.id,q]));
    const ids=new Set(history.map(r=>r.question_id).filter(Boolean));
    for(const id of Object.keys(stars))ids.add(id);
    const questions=[...ids].map(id=>byId.get(id)).filter(Boolean).map(q=>({
      id:q.id,v:q.question_version||1,c:q.category,t:q.topic,d:q.difficulty,m:q.ask_mode||'correct',q:q.q,o:q.choices,a:q.choices[q.answer],oe:q.option_explanations||null,src:q.source_scope||null,sec:q.source_section||null,retired:Boolean(q.retired),star:Boolean(stars[q.id])
    }));
    const attempts=history.map(r=>({
      q:r.question_id,bv:r.bank_version??null,qv:r.question_version??null,src:r.source_scope??null,m:r.ask_mode??null,c:r.skipped===true?null:Boolean(r.correct),s:r.skipped===true,star_at_answer:r.starred??null,sa:r.selected_answer??null,sc:r.selected_choice??null,ca:r.correct_answer??null,cc:r.correct_choice??null,n:r.attempt_no??null,at:r.answered_at??null
    }));
    const activeBank=(window.QUESTION_BANK||[]).filter(q=>!q.retired);
    return{app:`Pythonデータ分析 模擬トレーナー v${VERSION}`,bank_active:activeBank.length,bank_stored:(window.QUESTION_BANK||[]).length,exported:new Date().toISOString(),starred_question_ids:Object.keys(stars),questions,attempts};
  }
  async function copyText(text){
    try{await navigator.clipboard.writeText(text);return true;}catch(e){}
    try{const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.focus();ta.select();const ok=document.execCommand('copy');ta.remove();return ok;}catch(e){return false;}
  }
  function validChatUrl(v){return /^https:\/\/(chatgpt\.com|chat\.openai\.com)\//i.test(v||'');}
  function getChatUrl(){const v=(localStorage.getItem('python_exam_chat_url_v1')||'').trim();return validChatUrl(v)?v:'https://chatgpt.com/';}
  window.sendToChatGPT=async function(){
    const text=analysisPrompt()+'\n\n---DATA(JSON)---\n'+JSON.stringify(payload());
    const ok=await copyText(text);if(!ok){alert('クリップボードへのコピーに失敗しました。JSON保存を使ってください。');return;}
    alert(`分析プロンプト＋回答履歴をコピーしました（約${Math.ceil(new Blob([text]).size/1024)}KB）。ChatGPTを開きます。入力欄へ貼り付けて送信してください。`);
    location.href=getChatUrl();
  };
  window.exportJSON=function(){
    const blob=new Blob([JSON.stringify(payload(),null,2)],{type:'application/json'}),a=document.createElement('a');
    a.href=URL.createObjectURL(blob);a.download=`python_exam_history_${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500);
  };
  window.copySummary=async function(){const ok=await copyText(analysisPrompt());alert(ok?'分析・改善プロンプトをコピーしました。':'コピーに失敗しました。');};
  window.shareSummary=window.sendToChatGPT;
  const shareBtn=document.getElementById('shareBtn');if(shareBtn)shareBtn.onclick=window.sendToChatGPT;
  const exportBtn=document.getElementById('exportBtn');if(exportBtn)exportBtn.onclick=window.exportJSON;
  const copyBtn=document.getElementById('copyBtn');if(copyBtn)copyBtn.onclick=window.copySummary;
  const preview=document.getElementById('sharePreview');if(preview)preview.textContent=analysisPrompt();

  // ---- Version / simple explanation ----
  document.title=`Pythonデータ分析 模擬トレーナー v${VERSION}`;
  const h1=document.querySelector('.top h1');if(h1)h1.textContent=`Pythonデータ分析 模擬トレーナー v${VERSION}`;
  window.__BANK_VERSION=VERSION;
  const setup=document.querySelector('#setupCard .muted');
  if(setup)setup.textContent='未回答問題を優先して出題します。★を付けた苦手問題は、各模擬で最大半分まで優先して繰り返し出題します。選択肢の正解位置はA〜Dに偏りにくいよう分散します。';

  function updateSummary(){
    const activeBank=(window.QUESTION_BANK||[]).filter(q=>!q.retired);
    const count=starIds().filter(id=>activeBank.some(q=>q.id===id)).length;
    const scikitCount=activeBank.filter(q=>q.category==='scikit-learn').length;
    const summary=document.getElementById('bankSummary');
    if(summary)summary.textContent=`${activeBank.length}問・scikit-learn書籍準拠${scikitCount}問・★苦手${count}問・未出題優先`;
  }
  updateSummary();
  updateStarButton();
});
