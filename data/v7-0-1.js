window.addEventListener('load',()=>{
  // v7.0 UI hotfix: 公式書籍で確認できた出題範囲を画面上でも明示する。
  const setup=document.querySelector('#setupCard .muted');
  if(setup){
    setup.textContent='未回答問題を優先して出題します。scikit-learnは公式書籍第3版4.4で確認できた範囲に準拠し、4.4.3 回帰ではLinearRegressionを含みます。選択肢の正解位置はA〜Dに偏りにくいようセッション内で分散します。';
  }

  const activeBank=(window.QUESTION_BANK||[]).filter(q=>!q.retired);
  const scikitCount=activeBank.filter(q=>q.category==='scikit-learn').length;
  const summary=document.getElementById('bankSummary');
  if(summary){
    summary.textContent=`${activeBank.length}問・scikit-learnは公式書籍第3版4.4準拠${scikitCount}問・未出題優先・選択肢分散`;
  }
});
