window.QUESTION_BANK=window.QUESTION_BANK||[];

(function(){
  const VERSION='6.4';
  const Q=(id,topic,difficulty,askMode,text,choices,answer,explanations)=>({
    id,category:'pandas',topic,difficulty,type:'statement',q:text,choices,answer,
    explanation:'各選択肢の正誤と理由を確認してください。',
    option_explanations:explanations,ask_mode:askMode,format_version:6,question_version:1
  });

  window.QUESTION_BANK.push(
    Q('Q447','行列の削除','medium','incorrect',
      'DataFrameのdrop()に関する説明として、誤っているものを1つ選んでください。',
      ['df.drop("1行") のようにaxisを省略した場合、既定では行ラベルを削除する','列を削除するときは axis=1 を指定できる','drop()は既定で元のDataFrameそのものを直接書き換える','削除対象として存在しないラベルを指定するとKeyErrorになることがある'],2,
      ['正しい。drop()の既定はaxis=0で、行ラベルを対象にします。','正しい。列を削除する場合はaxis=1を指定できます。','誤り。既定では削除後の新しいDataFrameを返し、元のDataFrameは変更しません。','正しい。存在しないラベルを指定するとKeyErrorになることがあります。']),

    Q('Q448','行列の削除','medium','correct',
      '列「B列」を削除するコードとして正しいものを1つ選んでください。',
      ['df.drop("B列", axis=1)','df.drop("B列")','df.drop(axis=0, "B列")','df.drop("B列", inplace=False, axis=0)'],0,
      ['正しい。列を削除するのでaxis=1を指定します。','誤り。axisを省略すると既定では行ラベルとして解釈されます。','誤り。この書き方は構文として不適切で、axis=0は行方向です。','誤り。axis=0では行ラベルを削除します。']),

    Q('Q449','行列の削除','medium','incorrect',
      'drop()のaxisに関する説明として、誤っているものを1つ選んでください。',
      ['axis=0 は行ラベルを削除する指定として使う','axis=1 は列ラベルを削除する指定として使う','列を削除する場合、drop()ではaxis=1を指定する','axis=1 は行だけを削除するための指定である'],3,
      ['正しい。drop()ではaxis=0が行方向です。','正しい。axis=1が列方向です。','正しい。列削除ではaxis=1を使います。','誤り。axis=1は列方向です。']),

    Q('Q450','行列の削除','hard','incorrect',
      'drop()とinplaceに関する説明として、誤っているものを1つ選んでください。',
      ['df2 = df.drop("1行") とすれば、削除後のDataFrameを別変数で受け取れる','df.drop("1行", inplace=True) とすれば、元のdf自体を変更できる','inplace=Trueを指定しない通常のdrop()では、元のDataFrameはそのまま残る','inplace=Trueを指定しても、元のDataFrameは絶対に変更されない'],3,
      ['正しい。既定では削除後の新しいDataFrameを返します。','正しい。inplace=Trueでは元のDataFrameへ変更を反映します。','正しい。既定では非破壊的な操作です。','誤り。inplace=Trueを指定すると元のDataFrame自体が変更されます。']),

    Q('Q451','行列の削除','hard','correct',
      'DataFrame df の2番目の列を、その列名を直接書かずに削除したいとき、正しい考え方を1つ選んでください。',
      ['df.columns[1] で列ラベルを取得し、そのラベルをdrop(..., axis=1)へ渡す','df.index[1] を取得し、常にaxis=1へ渡す','df.columns[1] は列そのもののデータを返すためdropには使えない','drop()ではcolumns属性を利用した指定はできない'],0,
      ['正しい。df.columns[1]で2番目の列ラベルを取得し、そのラベルを削除対象にできます。','誤り。df.indexは行ラベルを表します。','誤り。df.columns[1]は列ラベルを返します。','誤り。columns属性から取得した列ラベルをdropへ渡せます。']),

    Q('Q452','行列の削除','medium','incorrect',
      '次のDataFrameで df.drop("存在しない行") を実行した場合の説明として、誤っているものを1つ選んでください。',
      ['指定したラベルがindexに存在しなければKeyErrorになることがある','axisを省略しているため、既定では行ラベルとして探す','存在しないラベルでも常に無視され、必ず正常終了する','削除対象ラベルが実際に存在するかどうかが重要である'],2,
      ['正しい。存在しないラベルを指定するとKeyErrorになることがあります。','正しい。既定のaxis=0では行ラベルを対象にします。','誤り。既定では存在しないラベルを指定するとKeyErrorになることがあります。','正しい。指定したラベルが対象軸に存在する必要があります。'])
  );

  const ids=new Set();
  window.QUESTION_BANK=window.QUESTION_BANK.filter(q=>{
    if(!q||!q.id||ids.has(q.id))return false;
    ids.add(q.id);
    if(!Array.isArray(q.choices)||q.choices.length!==4)return false;
    if(new Set(q.choices.map(String)).size!==4)return false;
    if(!Number.isInteger(q.answer)||q.answer<0||q.answer>3)return false;
    if(q.option_explanations&&q.option_explanations.length!==4)return false;
    return true;
  });
  window.__BANK_VERSION=VERSION;
})();

window.addEventListener('load',()=>{
  const VERSION='6.4';
  document.title=`Pythonデータ分析 模擬トレーナー v${VERSION}`;
  const h1=document.querySelector('.top h1');
  if(h1)h1.textContent=`Pythonデータ分析 模擬トレーナー v${VERSION}`;

  const activeBank=window.QUESTION_BANK.filter(q=>!q.retired);
  const retired=window.QUESTION_BANK.filter(q=>q.retired).length;
  const summary=document.getElementById('bankSummary');
  if(summary)summary.textContent=`${activeBank.length}問・重複${retired}問を出題対象外・未出題優先・選択肢分散`;
  const counts={};for(const q of activeBank)counts[q.category]=(counts[q.category]||0)+1;
  const sel=document.getElementById('categoryFilter');
  if(sel){for(const o of [...sel.options]){if(o.value!=='ALL'&&counts[o.value]!=null)o.textContent=`${o.value} (${counts[o.value]}問)`;}}

  function stampLatest(before,q){
    const h=loadHistory();
    if(h.length<=before)return;
    const r=h[h.length-1];
    if(!r||r.session_id!==sessionId||r.question_id!==q.id)return;
    r.bank_version=VERSION;
    r.question_version=q.question_version||1;
    saveHistory(h);
  }
  const baseAnswer=window.answer;
  window.answer=function(i,btn){const before=loadHistory().length,q=session[current];const out=baseAnswer(i,btn);stampLatest(before,q);return out;};
  const baseSkip=window.skipQuestion;
  window.skipQuestion=function(){const before=loadHistory().length,q=session[current];const out=baseSkip();stampLatest(before,q);return out;};
  const skipBtn=document.getElementById('skipBtn');if(skipBtn)skipBtn.onclick=window.skipQuestion;
});
