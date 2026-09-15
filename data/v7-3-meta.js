window.addEventListener('load',()=>{
  const VERSION='7.3';
  const STAR_KEY='python_exam_question_star_v1';
  function loadStars(){
    try{const x=JSON.parse(localStorage.getItem(STAR_KEY)||'{}');return x&&typeof x==='object'&&!Array.isArray(x)?x:{};}catch(e){return {};}
  }
  function eligible(q){return q&&!q.retired&&(q.ask_mode||'correct')!=='incorrect';}
  function analysisPrompt(){
    return 'Python 3 エンジニア認定データ分析試験トレーナーの回答履歴です。skipped=trueは「分からない」として強い知識不足シグナルとして扱い、正答率には含めないでください。star=true または starred_question_ids に含まれる問題は、ユーザーが「苦手・定着度が低い」と主観的に手動指定した問題です。誤答やスキップとは独立した重要な弱点シグナルとして扱ってください。通常模擬は1問1論点の「正しいものを選ぶ」形式を優先しています。source_scopeがある問題はその資料範囲を基準にし、question_versionとbank_versionがある場合は改訂前後を混同しないでください。偶然正解の可能性も考慮し、知識不足と問題バンク側の改善点を分けて指摘してください。';
  }
  function payload(){
    const history=loadHistory(),stars=loadStars();
    const byId=new Map((window.QUESTION_BANK||[]).map(q=>[q.id,q]));
    const ids=new Set(history.map(r=>r.question_id).filter(Boolean));
    for(const id of Object.keys(stars))ids.add(id);
    const questions=[...ids].map(id=>byId.get(id)).filter(Boolean).map(q=>({
      id:q.id,v:q.question_version||1,c:q.category,t:q.topic,d:q.difficulty,m:q.ask_mode||'correct',q:q.q,o:q.choices,a:q.choices[q.answer],oe:q.option_explanations||null,src:q.source_scope||null,sec:q.source_section||null,retired:Boolean(q.retired),star:Boolean(stars[q.id])
    }));
    const attempts=history.map(r=>({
      q:r.question_id,bv:r.bank_version??null,qv:r.question_version??null,src:r.source_scope??null,m:r.ask_mode??null,c:r.skipped===true?null:Boolean(r.correct),s:r.skipped===true,star_at_answer:r.starred??null,sa:r.selected_answer??null,sc:r.selected_choice??null,ca:r.correct_answer??null,cc:r.correct_choice??null,n:r.attempt_no??null,at:r.answered_at??null
    }));
    const active=(window.QUESTION_BANK||[]).filter(q=>!q.retired),learning=active.filter(eligible);
    return{app:`Pythonデータ分析 模擬トレーナー v${VERSION}`,bank_active:learning.length,bank_stored:(window.QUESTION_BANK||[]).length,exported:new Date().toISOString(),starred_question_ids:Object.keys(stars).filter(id=>stars[id]===true),questions,attempts};
  }
  async function copyText(text){
    try{await navigator.clipboard.writeText(text);return true;}catch(e){}
    try{const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.focus();ta.select();const ok=document.execCommand('copy');ta.remove();return ok;}catch(e){return false;}
  }
  function getChatUrl(){const v=(localStorage.getItem('python_exam_chat_url_v1')||'').trim();return /^https:\/\/(chatgpt\.com|chat\.openai\.com)\//i.test(v)?v:'https://chatgpt.com/';}
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
  const shareBtn=document.getElementById('shareBtn');if(shareBtn)shareBtn.onclick=window.sendToChatGPT;
  const exportBtn=document.getElementById('exportBtn');if(exportBtn)exportBtn.onclick=window.exportJSON;
  const preview=document.getElementById('sharePreview');if(preview)preview.textContent=analysisPrompt();
});
