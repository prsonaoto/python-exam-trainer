window.QUESTION_BANK=window.QUESTION_BANK||[];
(function(){
  const q44=window.QUESTION_BANK.find(q=>q.id==='Q044');
  if(q44){q44.choices=['0','2','-3','6'];q44.answer=0;q44.explanation='3×2 + 1×(-6) = 6 - 6 = 0です。';}
  const q67=window.QUESTION_BANK.find(q=>q.id==='Q067');
  if(q67 && q67.topic==='インデックス・スライス')q67.topic='要素指定・スライス';
  const ids=new Set();
  window.QUESTION_BANK=window.QUESTION_BANK.filter(q=>{
    if(!q||!q.id||ids.has(q.id))return false;
    ids.add(q.id);
    if(!Array.isArray(q.choices)||q.choices.length!==4)return false;
    if(new Set(q.choices.map(String)).size!==4)return false;
    return Number.isInteger(q.answer)&&q.answer>=0&&q.answer<=3;
  });
})();

(function(){
  const CHAT_URL_KEY='python_exam_chat_url_v1';
  const DEFAULT_CHAT_URL='https://chatgpt.com/';
  window.addEventListener('load',()=>{
    document.title='Pythonデータ分析 模擬トレーナー v5.2';
    const h1=document.querySelector('.top h1');
    if(h1)h1.textContent='Pythonデータ分析 模擬トレーナー v5.2';

    const style=document.createElement('style');
    style.textContent='.feedback.show.skip{display:block;background:var(--card);border:1px solid var(--line)}.skipMark{font-weight:800}.chatUrlBox{margin-top:14px;padding-top:14px;border-top:1px solid var(--line)}.chatUrlBox input{width:100%;border:1px solid var(--line);border-radius:10px;padding:11px;background:var(--card);color:var(--text);font-size:14px;margin:7px 0}.chatUrlBox .row{align-items:center}';
    document.head.appendChild(style);

    const actions=document.querySelector('.dockActions');
    const quitBtn=document.getElementById('quitBtn');
    if(actions&&quitBtn&&!document.getElementById('skipBtn')){
      const b=document.createElement('button');b.id='skipBtn';b.className='btn';b.textContent='わからない';actions.insertBefore(b,quitBtn);
    }

    window.usageMap=function(){
      const m={};
      for(const r of loadHistory()){
        if(r&&r.skipped===true)continue;
        const x=m[r.question_id]||(m[r.question_id]={count:0,last:0});x.count++;
        const t=Date.parse(r.answered_at)||0;if(t>x.last)x.last=t;
      }
      return m;
    };

    window.__sessionSkipped=0;
    const oldStartQuiz=window.startQuiz;
    window.startQuiz=function(){window.__sessionSkipped=0;return oldStartQuiz();};

    const oldRenderQuestion=window.renderQuestion;
    window.renderQuestion=function(){
      oldRenderQuestion();
      const sb=document.getElementById('skipBtn');if(sb){sb.style.display='inline-block';sb.disabled=false;}
      const ls=document.getElementById('liveScore');if(ls)ls.textContent=`正解 ${score} / スキップ ${window.__sessionSkipped||0}`;
    };

    window.answer=function(i,btn){
      if(answered)return;answered=true;
      const q=session[current],buttons=[...document.querySelectorAll('.choice')];
      buttons.forEach(b=>b.disabled=true);buttons[q._answer].classList.add('correct');
      const ok=i===q._answer;if(ok)score++;else btn.classList.add('wrong');
      const fb=document.getElementById('feedback');fb.className='feedback show '+(ok?'ok':'ng');
      fb.innerHTML=`<b>${ok?'✅ 正解':'❌ 不正解'}</b><br>${ok?'':`正解は ${LETTERS[q._answer]}。<br>`}${q.explanation}`;
      const h=loadHistory(),prev=h.filter(x=>x.question_id===q.id).length;
      h.push({session_id:sessionId,question_id:q.id,category:q.category,topic:q.topic,difficulty:q.difficulty,correct:ok,skipped:false,selected_answer:LETTERS[i],correct_answer:LETTERS[q._answer],selected_choice:q._choices[i],correct_choice:q._choices[q._answer],answered_at:nowISO(),attempt_no:prev+1});
      saveHistory(h);
      const ls=document.getElementById('liveScore');if(ls)ls.textContent=`正解 ${score} / スキップ ${window.__sessionSkipped||0}`;
      document.getElementById('bar').style.width=`${(current+1)/session.length*100}%`;
      const sb=document.getElementById('skipBtn');if(sb)sb.style.display='none';
      const nb=document.getElementById('nextBtn');nb.style.display='inline-block';nb.textContent=current===session.length-1?'結果を見る':'次の問題';
    };

    window.skipQuestion=function(){
      if(answered)return;answered=true;window.__sessionSkipped=(window.__sessionSkipped||0)+1;
      const q=session[current],buttons=[...document.querySelectorAll('.choice')];
      buttons.forEach(b=>b.disabled=true);buttons[q._answer].classList.add('correct');
      const fb=document.getElementById('feedback');fb.className='feedback show skip';fb.innerHTML=`<span class="skipMark">⏭ わからない / スキップ</span><br>正解は ${LETTERS[q._answer]}。<br>${q.explanation}`;
      const h=loadHistory(),prev=h.filter(x=>x.question_id===q.id).length;
      h.push({session_id:sessionId,question_id:q.id,category:q.category,topic:q.topic,difficulty:q.difficulty,correct:null,skipped:true,selected_answer:null,correct_answer:LETTERS[q._answer],selected_choice:null,correct_choice:q._choices[q._answer],answered_at:nowISO(),attempt_no:prev+1});
      saveHistory(h);
      const ls=document.getElementById('liveScore');if(ls)ls.textContent=`正解 ${score} / スキップ ${window.__sessionSkipped}`;
      document.getElementById('bar').style.width=`${(current+1)/session.length*100}%`;
      const sb=document.getElementById('skipBtn');if(sb)sb.style.display='none';
      const nb=document.getElementById('nextBtn');nb.style.display='inline-block';nb.textContent=current===session.length-1?'結果を見る':'次の問題';
    };

    window.nextQuestion=function(){
      if(current<session.length-1){current++;renderQuestion();return;}
      setQuizRunning(false);document.getElementById('quizCard').style.display='none';document.getElementById('resultCard').style.display='block';
      const skipped=window.__sessionSkipped||0,answeredCount=session.length-skipped;
      document.getElementById('resultScore').textContent=`${score} / ${answeredCount}`;
      document.getElementById('resultText').textContent=answeredCount?`回答 ${answeredCount}問 / スキップ ${skipped}問・正答率 ${Math.round(score/answeredCount*100)}%`:`回答 0問 / スキップ ${skipped}問`;
    };

    window.aggregate=function(){
      const allHistory=loadHistory(),h=allHistory.filter(r=>r&&r.skipped!==true),byCat={},byTopic={};
      for(const r of h){
        const c=byCat[r.category]||(byCat[r.category]={total:0,correct:0});c.total++;if(r.correct)c.correct++;
        const key=r.category+'｜'+r.topic,t=byTopic[key]||(byTopic[key]={category:r.category,topic:r.topic,total:0,correct:0});t.total++;if(r.correct)t.correct++;
      }
      return{h,allHistory,byCat,byTopic};
    };

    const oldRenderStats=window.renderStats;
    window.renderStats=function(){
      oldRenderStats();
      const all=[...loadHistory()].reverse().slice(0,12),recent=document.getElementById('recentHistory');
      if(recent&&all.length)recent.innerHTML=`<table class="tbl"><tr><th>問題</th><th>結果</th></tr>${all.map(r=>`<tr><td>${r.category} / ${r.topic}<br><span class="muted">${new Date(r.answered_at).toLocaleString()}</span></td><td>${r.skipped?'⏭':(r.correct?'✅':'❌')}</td></tr>`).join('')}</table>`;
    };

    function analysisPrompt(){
      return 'Python 3 エンジニア認定データ分析試験トレーナーの回答履歴です。以下の回答単位データを分析してください。skipped=true は「分からない」として強い知識不足シグナルとして扱い、正答率には含めないでください。偶然正解の可能性も考慮し、知識不足の論点と、問題文・選択肢・正解設定など問題バンク側の改善点を分けて指摘してください。複数正解、曖昧な表現、重複や不自然な問題があれば具体的に示してください。必要なら追加すべきオリジナル問題の論点と難易度も提案してください。';
    }

    function compactPayload(){
      const history=loadHistory(),byId=new Map(BANK.map(q=>[q.id,q])),usedIds=[...new Set(history.map(r=>r.question_id).filter(Boolean))];
      const questions=usedIds.map(id=>byId.get(id)).filter(Boolean).map(q=>({id:q.id,c:q.category,t:q.topic,d:q.difficulty,q:q.q,o:q.choices,a:q.choices[q.answer]}));
      const attempts=history.map(r=>({q:r.question_id,c:r.skipped===true?null:Boolean(r.correct),s:r.skipped===true,sa:r.selected_answer??null,sc:r.selected_choice??null,ca:r.correct_answer??null,cc:r.correct_choice??null,n:r.attempt_no??null,at:r.answered_at??null}));
      return{app:'Pythonデータ分析 模擬トレーナー v5.2',bank:BANK.length,exported:nowISO(),legend:{questions:'id=問題ID,c=分野,t=トピック,d=難易度,q=問題文,o=選択肢,a=正解本文',attempts:'q=問題ID,c=正誤(true/false/null),s=スキップ,sa=選択肢記号,sc=選択本文,ca=正解記号,cc=正解本文,n=試行回数,at=回答時刻'},questions,attempts};
    }
    function shareText(){return analysisPrompt()+'\n\n---DATA(JSON)---\n'+JSON.stringify(compactPayload());}

    async function copyText(text){
      try{await navigator.clipboard.writeText(text);return true;}catch(e){}
      try{
        const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.focus();ta.select();const ok=document.execCommand('copy');ta.remove();return ok;
      }catch(e){return false;}
    }

    function validChatUrl(v){return /^https:\/\/(chatgpt\.com|chat\.openai\.com)\//i.test(v||'');}
    function getChatUrl(){const v=(localStorage.getItem(CHAT_URL_KEY)||'').trim();return validChatUrl(v)?v:DEFAULT_CHAT_URL;}

    window.sendToChatGPT=async function(){
      const text=shareText(),ok=await copyText(text);
      if(!ok){alert('クリップボードへのコピーに失敗しました。JSON保存を使ってください。');return;}
      const url=getChatUrl();
      alert(`分析プロンプト＋回答履歴をコピーしました（約${Math.ceil(new Blob([text]).size/1024)}KB）。ChatGPTを開きます。入力欄へ貼り付けて送信してください。`);
      location.href=url;
    };

    window.exportJSON=function(){
      const blob=new Blob([JSON.stringify(compactPayload(),null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`python_exam_history_${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500);
    };
    window.copySummary=async function(){const ok=await copyText(analysisPrompt());alert(ok?'分析・改善プロンプトをコピーしました。':'コピーに失敗しました。');};
    window.shareSummary=window.sendToChatGPT;

    const dataCard=document.querySelector('#dataView .card');
    if(dataCard){
      const title=dataCard.querySelector('b');if(title)title.textContent='ChatGPTへ回答履歴を送る';
      const desc=dataCard.querySelector('p');if(desc)desc.textContent='分析プロンプト＋圧縮JSONをクリップボードへコピーし、そのままChatGPTを開きます。';
      if(!document.getElementById('chatUrlInput')){
        const box=document.createElement('div');box.className='chatUrlBox';box.innerHTML='<b>開くChatGPTチャット（任意）</b><div class="muted">この会話のURLを登録すると、送信ボタンで直接その会話を開きます。未登録ならChatGPTトップを開きます。</div><input id="chatUrlInput" type="url" inputmode="url" placeholder="https://chatgpt.com/c/..."><div class="row"><button id="saveChatUrlBtn" class="btn">URLを保存</button><button id="clearChatUrlBtn" class="btn">登録解除</button></div>';dataCard.appendChild(box);
      }
    }
    const urlInput=document.getElementById('chatUrlInput');if(urlInput)urlInput.value=localStorage.getItem(CHAT_URL_KEY)||'';
    const saveUrl=document.getElementById('saveChatUrlBtn');if(saveUrl)saveUrl.onclick=()=>{const v=(urlInput.value||'').trim();if(!validChatUrl(v)){alert('ChatGPTのURLを入力してください。');return;}localStorage.setItem(CHAT_URL_KEY,v);alert('このチャットURLを保存しました。');};
    const clearUrl=document.getElementById('clearChatUrlBtn');if(clearUrl)clearUrl.onclick=()=>{localStorage.removeItem(CHAT_URL_KEY);if(urlInput)urlInput.value='';alert('登録を解除しました。');};

    const sb=document.getElementById('skipBtn');if(sb)sb.onclick=window.skipQuestion;
    const startBtn=document.getElementById('startBtn');if(startBtn)startBtn.onclick=window.startQuiz;
    const nextBtn=document.getElementById('nextBtn');if(nextBtn)nextBtn.onclick=window.nextQuestion;
    const exportBtn=document.getElementById('exportBtn');if(exportBtn){exportBtn.onclick=window.exportJSON;exportBtn.classList.remove('primary');}
    const copyBtn=document.getElementById('copyBtn');if(copyBtn){copyBtn.onclick=window.copySummary;copyBtn.textContent='分析プロンプトだけコピー';}
    const shareBtn=document.getElementById('shareBtn');if(shareBtn){shareBtn.onclick=window.sendToChatGPT;shareBtn.textContent='コピーしてChatGPTを開く';shareBtn.classList.add('primary');}

    const oldShowView=window.showView;
    window.showView=function(id){oldShowView(id);if(id==='dataView'){const p=document.getElementById('sharePreview');if(p)p.textContent=analysisPrompt();}};
    const preview=document.getElementById('sharePreview');if(preview)preview.textContent=analysisPrompt();
    refreshAll();
  });
})();
