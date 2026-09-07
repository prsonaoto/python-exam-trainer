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
