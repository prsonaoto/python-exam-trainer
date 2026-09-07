window.QUESTION_BANK=window.QUESTION_BANK||[];
(function(){
  const q44=window.QUESTION_BANK.find(q=>q.id==='Q044');
  if(q44){
    q44.choices=['0','2','-3','6'];
    q44.answer=0;
    q44.explanation='3×2 + 1×(-6) = 6 - 6 = 0です。';
  }
  const q67=window.QUESTION_BANK.find(q=>q.id==='Q067');
  if(q67 && q67.topic==='インデックス・スライス') q67.topic='要素指定・スライス';

  const ids=new Set();
  window.QUESTION_BANK=window.QUESTION_BANK.filter(q=>{
    if(!q || !q.id || ids.has(q.id)) return false;
    ids.add(q.id);
    if(!Array.isArray(q.choices) || q.choices.length!==4) return false;
    if(new Set(q.choices.map(String)).size!==4) return false;
    if(!Number.isInteger(q.answer) || q.answer<0 || q.answer>3) return false;
    return true;
  });
})();

(function(){
  window.addEventListener('load',()=>{
    document.title='Pythonデータ分析 模擬トレーナー v5.1';
    const h1=document.querySelector('.top h1');
    if(h1) h1.textContent='Pythonデータ分析 模擬トレーナー v5.1';

    const style=document.createElement('style');
    style.textContent='.feedback.show.skip{display:block;background:var(--card);border:1px solid var(--line)} .skipMark{font-weight:800}';
    document.head.appendChild(style);

    const actions=document.querySelector('.dockActions');
    const quitBtn=document.getElementById('quitBtn');
    if(actions && quitBtn && !document.getElementById('skipBtn')){
      const b=document.createElement('button');
      b.id='skipBtn';
      b.className='btn';
      b.textContent='わからない';
      actions.insertBefore(b,quitBtn);
    }

    window.usageMap=function(){
      const m={};
      for(const r of loadHistory()){
        if(r && r.skipped===true) continue;
        const x=m[r.question_id]||(m[r.question_id]={count:0,last:0});
        x.count++;
        const t=Date.parse(r.answered_at)||0;
        if(t>x.last)x.last=t;
      }
      return m;
    };

    window.__sessionSkipped=0;
    const oldStartQuiz=window.startQuiz;
    window.startQuiz=function(){
      window.__sessionSkipped=0;
      return oldStartQuiz();
    };

    const oldRenderQuestion=window.renderQuestion;
    window.renderQuestion=function(){
      oldRenderQuestion();
      const sb=document.getElementById('skipBtn');
      if(sb){sb.style.display='inline-block';sb.disabled=false;}
      const ls=document.getElementById('liveScore');
      if(ls) ls.textContent=`正解 ${score} / スキップ ${window.__sessionSkipped||0}`;
    };

    window.answer=function(i,btn){
      if(answered)return;
      answered=true;
      const q=session[current];
      const buttons=[...document.querySelectorAll('.choice')];
      buttons.forEach(b=>b.disabled=true);
      buttons[q._answer].classList.add('correct');
      const ok=i===q._answer;
      if(ok)score++;else btn.classList.add('wrong');
      const fb=document.getElementById('feedback');
      fb.className='feedback show '+(ok?'ok':'ng');
      fb.innerHTML=`<b>${ok?'✅ 正解':'❌ 不正解'}</b><br>${ok?'':`正解は ${LETTERS[q._answer]}。<br>`}${q.explanation}`;
      const h=loadHistory();
      const prev=h.filter(x=>x.question_id===q.id).length;
      h.push({
        session_id:sessionId,question_id:q.id,category:q.category,topic:q.topic,difficulty:q.difficulty,
        correct:ok,skipped:false,
        selected_answer:LETTERS[i],correct_answer:LETTERS[q._answer],
        selected_choice:q._choices[i],correct_choice:q._choices[q._answer],
        answered_at:nowISO(),attempt_no:prev+1
      });
      saveHistory(h);
      const ls=document.getElementById('liveScore');
      if(ls) ls.textContent=`正解 ${score} / スキップ ${window.__sessionSkipped||0}`;
      document.getElementById('bar').style.width=`${(current+1)/session.length*100}%`;
      const sb=document.getElementById('skipBtn');
      if(sb) sb.style.display='none';
      const nb=document.getElementById('nextBtn');
      nb.style.display='inline-block';
      nb.textContent=current===session.length-1?'結果を見る':'次の問題';
    };

    window.skipQuestion=function(){
      if(answered)return;
      answered=true;
      window.__sessionSkipped=(window.__sessionSkipped||0)+1;
      const q=session[current];
      const buttons=[...document.querySelectorAll('.choice')];
      buttons.forEach(b=>b.disabled=true);
      buttons[q._answer].classList.add('correct');
      const fb=document.getElementById('feedback');
      fb.className='feedback show skip';
      fb.innerHTML=`<span class="skipMark">⏭ わからない / スキップ</span><br>正解は ${LETTERS[q._answer]}。<br>${q.explanation}`;
      const h=loadHistory();
      const prev=h.filter(x=>x.question_id===q.id).length;
      h.push({
        session_id:sessionId,question_id:q.id,category:q.category,topic:q.topic,difficulty:q.difficulty,
        correct:null,skipped:true,
        selected_answer:null,correct_answer:LETTERS[q._answer],
        selected_choice:null,correct_choice:q._choices[q._answer],
        answered_at:nowISO(),attempt_no:prev+1
      });
      saveHistory(h);
      const ls=document.getElementById('liveScore');
      if(ls) ls.textContent=`正解 ${score} / スキップ ${window.__sessionSkipped}`;
      document.getElementById('bar').style.width=`${(current+1)/session.length*100}%`;
      const sb=document.getElementById('skipBtn');
      if(sb) sb.style.display='none';
      const nb=document.getElementById('nextBtn');
      nb.style.display='inline-block';
      nb.textContent=current===session.length-1?'結果を見る':'次の問題';
    };

    window.nextQuestion=function(){
      if(current<session.length-1){
        current++;
        renderQuestion();
      }else{
        setQuizRunning(false);
        document.getElementById('quizCard').style.display='none';
        document.getElementById('resultCard').style.display='block';
        const skipped=window.__sessionSkipped||0;
        const answeredCount=session.length-skipped;
        document.getElementById('resultScore').textContent=`${score} / ${answeredCount}`;
        document.getElementById('resultText').textContent=answeredCount
          ? `回答 ${answeredCount}問 / スキップ ${skipped}問・正答率 ${Math.round(score/answeredCount*100)}%`
          : `回答 0問 / スキップ ${skipped}問`;
      }
    };

    window.aggregate=function(){
      const allHistory=loadHistory();
      const h=allHistory.filter(r=>r && r.skipped!==true);
      const byCat={},byTopic={};
      for(const r of h){
        const c=byCat[r.category]||(byCat[r.category]={total:0,correct:0});
        c.total++;if(r.correct)c.correct++;
        const key=r.category+'｜'+r.topic;
        const t=byTopic[key]||(byTopic[key]={category:r.category,topic:r.topic,total:0,correct:0});
        t.total++;if(r.correct)t.correct++;
      }
      return{h,allHistory,byCat,byTopic};
    };

    const oldRenderStats=window.renderStats;
    window.renderStats=function(){
      oldRenderStats();
      const all=[...loadHistory()].reverse().slice(0,12);
      const recent=document.getElementById('recentHistory');
      if(recent && all.length){
        recent.innerHTML=`<table class="tbl"><tr><th>問題</th><th>結果</th></tr>${all.map(r=>`<tr><td>${r.category} / ${r.topic}<br><span class="muted">${new Date(r.answered_at).toLocaleString()}</span></td><td>${r.skipped?'⏭':(r.correct?'✅':'❌')}</td></tr>`).join('')}</table>`;
      }
    };

    function analysisPrompt(){
      return 'Python 3 エンジニア認定データ分析試験トレーナーの回答履歴です。以下の回答単位データを分析してください。skipped=true は「分からない」として強い知識不足シグナルとして扱い、正答率には含めないでください。偶然正解の可能性も考慮し、知識不足の論点と、問題文・選択肢・正解設定など問題バンク側の改善点を分けて指摘してください。複数正解、曖昧な表現、重複や不自然な問題があれば具体的に示してください。必要なら追加すべきオリジナル問題の論点と難易度も提案してください。';
    }

    function shareHistoryRows(){
      const byId=new Map(BANK.map(q=>[q.id,q]));
      return loadHistory().map(r=>{
        const q=byId.get(r.question_id);
        return {
          question_id:r.question_id,
          category:r.category,
          topic:r.topic,
          difficulty:r.difficulty,
          question:q?.q??null,
          choices:q?.choices??null,
          correct:r.skipped===true?null:Boolean(r.correct),
          skipped:r.skipped===true,
          selected_answer:r.selected_answer??null,
          selected_choice:r.selected_choice??null,
          correct_answer:r.correct_answer??null,
          correct_choice:r.correct_choice??(q?q.choices[q.answer]:null),
          attempt_no:r.attempt_no??null,
          answered_at:r.answered_at??null
        };
      });
    }

    function sharePayload(){
      return {
        app:'Pythonデータ分析 模擬トレーナー v5.1',
        bank_size:BANK.length,
        exported_at:nowISO(),
        note:'集計値ではなく回答単位の生データです。skipped=true は「分からない」を表します。',
        history:shareHistoryRows()
      };
    }

    function payloadText(){return JSON.stringify(sharePayload(),null,2);}
    function payloadFilename(ext='json'){return `python_exam_history_${new Date().toISOString().slice(0,10)}.${ext}`;}
    function shareText(){return `${analysisPrompt()}\n\n--- 回答履歴JSON ---\n${payloadText()}`;}

    function downloadPayload(){
      const blob=new Blob([payloadText()],{type:'application/json'});
      const a=document.createElement('a');
      a.href=URL.createObjectURL(blob);
      a.download=payloadFilename('json');
      a.click();
      setTimeout(()=>URL.revokeObjectURL(a.href),1500);
    }

    function downloadShareText(){
      const blob=new Blob([shareText()],{type:'text/plain;charset=utf-8'});
      const a=document.createElement('a');
      a.href=URL.createObjectURL(blob);
      a.download=payloadFilename('txt');
      a.click();
      setTimeout(()=>URL.revokeObjectURL(a.href),1500);
    }

    window.exportJSON=downloadPayload;
    window.copySummary=async function(){
      const t=analysisPrompt();
      try{await navigator.clipboard.writeText(t);alert('分析・改善プロンプトをコピーしました。');}
      catch(e){prompt('この文章をコピーしてください',t);}
    };

    window.shareHistoryToChatGPT=async function(){
      const textFile=new File([shareText()],payloadFilename('txt'),{type:'text/plain'});
      let canShareFile=true;
      try{
        if(navigator.canShare) canShareFile=navigator.canShare({files:[textFile]});
      }catch(e){canShareFile=false;}

      if(navigator.share && canShareFile){
        try{
          await navigator.share({title:'Python試験 学習履歴',files:[textFile]});
          return;
        }catch(e){
          if(e && e.name==='AbortError') return;
        }
      }

      try{
        await navigator.clipboard.writeText(shareText());
        alert('ファイル共有が使えなかったため、分析プロンプト＋回答履歴をクリップボードへコピーしました。ChatGPTに貼り付けてください。');
      }catch(e){
        downloadShareText();
        alert('直接共有できなかったため、TXTファイルとして保存しました。');
      }
    };
    window.shareSummary=window.shareHistoryToChatGPT;

    const oldShowView=window.showView;
    window.showView=function(id){
      oldShowView(id);
      if(id==='dataView'){
        const p=document.getElementById('sharePreview');
        if(p)p.textContent=analysisPrompt();
      }
    };

    const sb=document.getElementById('skipBtn');
    if(sb) sb.onclick=window.skipQuestion;
    const startBtn=document.getElementById('startBtn');
    if(startBtn) startBtn.onclick=window.startQuiz;
    const nextBtn=document.getElementById('nextBtn');
    if(nextBtn) nextBtn.onclick=window.nextQuestion;
    const exportBtn=document.getElementById('exportBtn');
    if(exportBtn){exportBtn.onclick=window.exportJSON;exportBtn.classList.remove('primary');}
    const copyBtn=document.getElementById('copyBtn');
    if(copyBtn){copyBtn.onclick=window.copySummary;copyBtn.textContent='分析プロンプトをコピー';}
    const shareBtn=document.getElementById('shareBtn');
    if(shareBtn){shareBtn.onclick=window.shareHistoryToChatGPT;shareBtn.textContent='ChatGPTへ送る';shareBtn.classList.add('primary');}

    const dataCard=document.querySelector('#dataView .card');
    if(dataCard){
      const title=dataCard.querySelector('b');if(title)title.textContent='ChatGPTへ回答履歴を送る';
      const desc=dataCard.querySelector('p');if(desc)desc.textContent='分析プロンプト＋回答履歴JSONをTXTにまとめ、共有シートからChatGPTへ送ります。';
    }
    const preview=document.getElementById('sharePreview');
    if(preview)preview.textContent=analysisPrompt();
    refreshAll();
  });
})();
