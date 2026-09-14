window.QUESTION_BANK=window.QUESTION_BANK||[];

(function(){
  const VERSION='7.2';
  const SOURCE='公式書籍 第3版 4.4 scikit-learn';
  const byId=new Map(window.QUESTION_BANK.map(q=>[q.id,q]));

  function revise(id,topic,difficulty,text,choices,answer,explanations){
    const q=byId.get(id);
    if(!q)return;
    Object.assign(q,{
      topic,
      difficulty,
      q:text,
      choices,
      answer,
      option_explanations:explanations,
      explanation:'1問1論点で、公式書籍の範囲を確認する問題です。',
      ask_mode:'correct',
      type:'single_concept',
      format_version:8,
      question_version:2,
      source_scope:q.source_scope||SOURCE,
      book_aligned:true,
      learning_stage:'foundation'
    });
  }

  // 4.4.1 前処理：否定文探索ではなく、1つの役割・意味を直接問う。
  revise('Q453','欠損値','easy',
    '欠損値への代表的な対応として、最も適切なものはどれですか？',
    ['欠損している行・列の削除や、値の補完を検討する','欠損値が1つでもあればDataFrame全体を破棄する','欠損値は必ず文字列へ変換する','欠損値は必ず0へ置き換える'],0,
    ['正しい。削除や補完が代表的な対応です。','誤り。DataFrame全体を破棄する必要はありません。','誤り。文字列化が必須ではありません。','誤り。0での補完だけが方法ではありません。']);

  revise('Q454','SimpleImputer','easy',
    'SimpleImputerの主な役割はどれですか？',
    ['欠損値を補完する','行を並べ替える','グラフを描画する','クラスタ数を決める'],0,
    ['正しい。SimpleImputerは欠損値補完に使います。','誤り。並べ替えのためのクラスではありません。','誤り。描画のためのクラスではありません。','誤り。クラスタ数を決めるクラスではありません。']);

  revise('Q455','LabelEncoder','easy',
    'LabelEncoderの主な用途はどれですか？',
    ['カテゴリを0, 1, 2のような数値ラベルへ変換する','連続値を平均0・標準偏差1へ変換する','欠損値を平均値で補完する','特徴量を2次元へ圧縮する'],0,
    ['正しい。カテゴリを数値ラベルへ変換します。','誤り。それは標準化の説明です。','誤り。それは欠損値補完の説明です。','誤り。それは次元削減の説明です。']);

  revise('Q456','One-hotエンコーディング','easy',
    'One-hotエンコーディングでは、カテゴリ変数をどのように表しますか？',
    ['カテゴリごとに0/1の列へ展開する','すべて同じ整数へ置き換える','平均0・標準偏差1へ変換する','欠損行だけを削除する'],0,
    ['正しい。カテゴリごとの0/1列で表します。','誤り。すべてを同じ値にはしません。','誤り。それは標準化です。','誤り。欠損値処理ではありません。']);

  revise('Q457','ColumnTransformer','easy',
    'ColumnTransformerの主な用途はどれですか？',
    ['指定した列ごとに異なる前処理を適用する','目的変数yだけを分割する','モデルの予測精度を計算する','クラスタ中心を更新する'],0,
    ['正しい。列を選んで前処理を適用できます。','誤り。目的変数だけを分割するクラスではありません。','誤り。評価指標を計算するクラスではありません。','誤り。クラスタリングの処理ではありません。']);

  revise('Q458','標準化','easy',
    'StandardScalerによる標準化として、最も適切な説明はどれですか？',
    ['各特徴量を平均0・標準偏差1を基準とする尺度へ変換する','各特徴量を必ず0〜1へ変換する','カテゴリを整数ラベルへ変換する','欠損行を削除する'],0,
    ['正しい。平均と標準偏差を基準に変換します。','誤り。0〜1への変換はMinMaxScalerの代表例です。','誤り。カテゴリの符号化ではありません。','誤り。欠損値削除ではありません。']);

  revise('Q459','MinMaxScaler','easy',
    'MinMaxScalerの既定の変換範囲はどれですか？',
    ['0〜1','-1〜1','0〜100','平均0・標準偏差1'],0,
    ['正しい。既定では0〜1へ変換します。','誤り。既定値ではありません。','誤り。既定値ではありません。','誤り。それはStandardScalerの説明です。']);

  // 4.4.2 分類
  revise('Q461','サポートベクターマシン','easy',
    'SVMで「サポートベクトル」と呼ばれるのは、主にどのようなデータ点ですか？',
    ['分類境界の近くにあり、境界の決定に強く関わる点','分類境界から最も遠い点だけ','必ず各クラスの平均値にある点','目的変数を持たない点だけ'],0,
    ['正しい。境界付近の重要な点です。','誤り。最も遠い点ではありません。','誤り。平均値に限定されません。','誤り。そのような定義ではありません。']);

  revise('Q462','SVM・カーネル','easy',
    'RBFカーネルを使う主な目的として、最も適切なものはどれですか？',
    ['直線だけでは分けにくいデータで、非線形な境界を扱う','欠損値を平均で補完する','特徴量を必ず0〜1へ変換する','クラスタ数を自動で決める'],0,
    ['正しい。RBFカーネルは非線形な境界を扱えます。','誤り。欠損値補完ではありません。','誤り。スケーリング機能ではありません。','誤り。クラスタ数を決める機能ではありません。']);

  revise('Q463','SVM・C','easy',
    'SVCのパラメータCを変えると、主に何が変化することがありますか？',
    ['決定境界やマージンの様子','分類するクラス数そのもの','入力データの列名','目的変数のデータ型'],0,
    ['正しい。Cは境界やマージンの様子に関係します。','誤り。クラス数を指定する引数ではありません。','誤り。列名には関係しません。','誤り。データ型を指定する引数ではありません。']);

  revise('Q465','決定木・不純度','easy',
    '決定木で使う「不純度」は、何を表す指標ですか？',
    ['ノード内でクラスがどの程度混ざっているか','木の本数','特徴量の平均値','テストデータの件数'],0,
    ['正しい。クラスの混ざり具合を表します。','誤り。木の本数ではありません。','誤り。特徴量の平均値ではありません。','誤り。テスト件数ではありません。']);

  revise('Q466','ランダムフォレスト','easy',
    'RandomForestClassifierのn_estimatorsは何を指定しますか？',
    ['構築する決定木の本数','各決定木の最大深さ','分類するクラス数','特徴量の列数'],0,
    ['正しい。n_estimatorsは木の本数です。','誤り。最大深さはmax_depthです。','誤り。クラス数ではありません。','誤り。特徴量数ではありません。']);

  // 4.4.3 回帰
  revise('Q468','LinearRegression','easy',
    'LinearRegressionは、主に何を行うモデルですか？',
    ['説明変数と目的変数の線形な関係を使って連続値を予測する','カテゴリをOne-hot化する','欠損値を補完する','クラスタを作る'],0,
    ['正しい。LinearRegressionは線形回帰モデルです。','誤り。前処理器ではありません。','誤り。欠損値補完器ではありません。','誤り。クラスタリング手法ではありません。']);

  revise('Q469','線形回帰・係数','easy',
    '線形回帰式で、説明変数に掛かる値を何と呼びますか？',
    ['係数','切片','クラスタ','不純度'],0,
    ['正しい。説明変数に掛かる値が係数です。','誤り。切片は定数項です。','誤り。クラスタではありません。','誤り。不純度ではありません。']);

  revise('Q470','学習と予測','easy',
    'LinearRegressionでpredict()を使う前に、通常必要な処理はどれですか？',
    ['fit()でモデルを学習する','plot()でグラフを描く','dropna()で全行を削除する','PCA()で必ず2次元へ変換する'],0,
    ['正しい。先にfit()で学習します。','誤り。描画は学習の必須処理ではありません。','誤り。全行削除は不要です。','誤り。PCAは必須ではありません。']);

  revise('Q472','分類と回帰','easy',
    '分類と回帰の代表的な違いとして、正しいものはどれですか？',
    ['分類はクラスラベル、回帰は連続値を予測する','分類も回帰もクラスタ番号だけを返す','回帰は教師なし学習だけを指す','分類では目的変数を使わない'],0,
    ['正しい。代表的な違いです。','誤り。クラスタリングの説明ではありません。','誤り。回帰は教師あり学習で使われます。','誤り。教師あり分類では目的変数を使います。']);

  revise('Q473','データ分割','easy',
    '回帰モデルを評価するとき、テストデータは主に何のために使いますか？',
    ['学習後のモデルを評価する','モデルの係数を学習するためだけに使う','列名を変更する','欠損値を作る'],0,
    ['正しい。学習に使っていないデータで評価します。','誤り。学習は学習データで行います。','誤り。列名変更のためではありません。','誤り。欠損値を作るためではありません。']);

  // 4.4.4 次元削減
  revise('Q474','次元削減の目的','easy',
    '次元削減の主な目的として、最も適切なものはどれですか？',
    ['高次元データをより少ない次元に変換する','目的変数のクラス数を増やす','欠損値をすべて削除する','決定木の本数を増やす'],0,
    ['正しい。特徴量の次元を減らします。','誤り。クラス数を増やす処理ではありません。','誤り。欠損値処理ではありません。','誤り。木の本数とは関係ありません。']);

  revise('Q475','PCA','easy',
    'PCAの主な用途はどれですか？',
    ['特徴量の次元を減らす','分類ラベルを直接予測する','欠損値を補完する','決定木を複数作る'],0,
    ['正しい。PCAは代表的な次元削減手法です。','誤り。分類器ではありません。','誤り。欠損値補完ではありません。','誤り。ランダムフォレストではありません。']);

  revise('Q476','PCA・n_components','easy',
    'PCA(n_components=2)のn_components=2は何を指定しますか？',
    ['変換後に残す主成分を2つにする','入力データを2件だけにする','目的変数を2種類にする','学習を2回だけ行う'],0,
    ['正しい。2つの主成分へ変換します。','誤り。サンプル数を2件にする指定ではありません。','誤り。クラス数の指定ではありません。','誤り。学習回数の指定ではありません。']);

  revise('Q478','次元削減','easy',
    '次元削減について、正しい説明はどれですか？',
    ['次元を減らすことで、一部の情報が失われる場合がある','元データの情報を必ず100%完全に保存する','必ず予測精度が上がる','必ず教師ラベルが必要になる'],0,
    ['正しい。次元を減らすため情報が失われる場合があります。','誤り。完全保存は保証されません。','誤り。精度向上は保証されません。','誤り。PCAでは目的変数は必須ではありません。']);

  revise('Q480','PCA・主成分','easy',
    'PCAで得られるPC1やPC2は、何を表しますか？',
    ['元の特徴量から作られた新しい軸','元データの列名をそのままコピーしたもの','教師ラベルそのもの','欠損値の位置'],0,
    ['正しい。主成分は変換後の新しい軸です。','誤り。元列そのものとは限りません。','誤り。教師ラベルではありません。','誤り。欠損位置ではありません。']);

  // 4.4.5 モデルの評価
  revise('Q481','適合率','easy',
    '適合率（precision）は、何の割合を表しますか？',
    ['陽性と予測したもののうち、実際に陽性だった割合','実際に陽性のものをどれだけ拾えたか','予測全体のうち正解した割合','回帰誤差の絶対値の平均'],0,
    ['正しい。陽性予測の正しさを見る指標です。','誤り。それは再現率です。','誤り。それは正解率です。','誤り。それはMAEです。']);

  revise('Q483','正解率','easy',
    '正解率（accuracy）は、何の割合を表しますか？',
    ['予測全体のうち正しく予測できた割合','陽性予測だけの正しさ','実際の陽性を拾えた割合','回帰誤差の二乗平均'],0,
    ['正しい。全予測に対する正解の割合です。','誤り。それは適合率に近い説明です。','誤り。それは再現率です。','誤り。それはMSEです。']);

  revise('Q485','cross_val_score','easy',
    'cross_val_scoreの主な用途はどれですか？',
    ['交差検証で複数回の評価値を得る','欠損値を平均で補完する','カテゴリをOne-hot化する','主成分を計算する'],0,
    ['正しい。交差検証の評価値を得る関数です。','誤り。欠損値補完ではありません。','誤り。One-hot化ではありません。','誤り。PCAの処理ではありません。']);

  revise('Q486','ROC曲線','easy',
    'ROC曲線の軸の組み合わせとして正しいものはどれですか？',
    ['横軸が偽陽性率（FPR）、縦軸が真陽性率（TPR）','横軸が適合率、縦軸がMAE','横軸が正解率、縦軸がMSE','横軸がR²、縦軸がAUC'],0,
    ['正しい。ROC曲線はFPRとTPRで表します。','誤り。ROC曲線の軸ではありません。','誤り。ROC曲線の軸ではありません。','誤り。ROC曲線の軸ではありません。']);

  revise('Q487','AUC','easy',
    'AUCが0.5付近のとき、識別性能は一般にどのように解釈されますか？',
    ['ランダムな判定に近い','完全に識別できている','回帰誤差が0である','必ず過学習している'],0,
    ['正しい。0.5付近はランダムに近い識別です。','誤り。完全識別ではありません。','誤り。回帰誤差の指標ではありません。','誤り。AUCだけで過学習とは断定できません。']);

  // 4.4.6 ハイパーパラメータの最適化
  revise('Q489','best_params_','easy',
    'GridSearchCVのbest_params_で確認できるものはどれですか？',
    ['探索で選ばれた最良のハイパーパラメータ','テストデータの全予測値','学習データの列名','ROC曲線の座標'],0,
    ['正しい。最良のパラメータ組み合わせを確認できます。','誤り。予測値ではありません。','誤り。列名ではありません。','誤り。ROC座標ではありません。']);

  revise('Q490','best_estimator_','easy',
    'GridSearchCVのbest_estimator_で確認できるものはどれですか？',
    ['探索後に選ばれた最適な推定器','最良パラメータの名前だけ','テストデータの全予測値','欠損値の位置'],0,
    ['正しい。最適な推定器を確認できます。','誤り。それはbest_params_の説明に近いです。','誤り。予測値そのものではありません。','誤り。欠損値の位置ではありません。']);

  revise('Q491','GridSearchCV・予測','easy',
    'GridSearchCVをfit()した後、テストデータの予測に使えるメソッドはどれですか？',
    ['predict()','dropna()','plot()','reshape()'],0,
    ['正しい。探索・学習後にpredict()で予測できます。','誤り。欠損値処理のメソッドです。','誤り。描画のためのメソッドです。','誤り。配列形状変更のメソッドです。']);

  revise('Q493','グリッドサーチ','easy',
    'グリッドサーチは、どの範囲からハイパーパラメータを探索しますか？',
    ['あらかじめ指定した候補の組み合わせ','指定していない無限個の値すべて','テストデータの予測値だけ','特徴量名だけ'],0,
    ['正しい。用意した候補を比較します。','誤り。無限個を自動探索する方法ではありません。','誤り。予測値を候補にはしません。','誤り。特徴量名だけを探索するものではありません。']);

  // 4.4.7 クラスタリング
  revise('Q496','k-means','easy',
    'k-means法は、どの種類の学習に分類されますか？',
    ['教師なし学習','教師あり分類だけ','回帰だけ','強化学習だけ'],0,
    ['正しい。正解ラベルを使わない教師なし学習です。','誤り。教師あり分類ではありません。','誤り。回帰ではありません。','誤り。強化学習ではありません。']);

  revise('Q497','KMeans・n_clusters','easy',
    'KMeansのn_clustersは何を指定しますか？',
    ['作成するクラスタ数','入力データの特徴量数','目的変数の種類数','学習回数だけ'],0,
    ['正しい。作成するクラスタ数です。','誤り。特徴量数ではありません。','誤り。目的変数は使いません。','誤り。学習回数ではありません。']);

  revise('Q498','KMeans・fit_predict','easy',
    'KMeansのfit_predict(X)で得られるものはどれですか？',
    ['学習後の各データのクラスタラベル','教師データyの正解ラベル','回帰の連続予測値','PCAの主成分だけ'],0,
    ['正しい。学習とクラスタ割り当てを行います。','誤り。正解ラベルyは必須ではありません。','誤り。回帰ではありません。','誤り。PCAではありません。']);

  revise('Q500','AgglomerativeClustering','easy',
    'AgglomerativeClusteringは、主に何に使うクラスですか？',
    ['凝集型の階層クラスタリング','線形回帰','欠損値補完','決定木の深さ最適化だけ'],0,
    ['正しい。階層型クラスタリングに使います。','誤り。回帰モデルではありません。','誤り。欠損値補完ではありません。','誤り。決定木専用ではありません。']);

  revise('Q501','クラスタリング','easy',
    'k-means法と階層型クラスタリングに共通する点はどれですか？',
    ['どちらも教師なし学習のクラスタリングに利用できる','どちらも正解ラベルyが必須である','どちらも線形回帰の手法である','どちらも欠損値補完だけを行う'],0,
    ['正しい。どちらも教師なしクラスタリングです。','誤り。正解ラベルは必須ではありません。','誤り。回帰手法ではありません。','誤り。欠損値補完ではありません。']);

  // 改訂した問題は通常学習用として扱う。
  for(const q of window.QUESTION_BANK){
    if(q && q.source_scope===SOURCE && !q.retired){
      q.book_aligned=true;
      if(q.ask_mode==='correct' && !q.learning_stage)q.learning_stage='foundation';
    }
  }

  window.__BANK_VERSION=VERSION;
})();

window.addEventListener('load',()=>{
  const VERSION='7.2';
  const STAR_KEY='python_exam_question_star_v1';

  function loadStars(){
    try{
      const x=JSON.parse(localStorage.getItem(STAR_KEY)||'{}');
      return x&&typeof x==='object'&&!Array.isArray(x)?x:{};
    }catch(e){return {};}
  }
  function eligible(q){return q && !q.retired && (q.ask_mode||'correct')!=='incorrect';}

  // 通常模擬では「誤っているものを選ぶ」問題を停止する。
  // 既存の選択ロジック（未回答優先、★優先、skip扱い等）はそのまま利用する。
  const previousChoose=window.chooseQuestions;
  if(typeof previousChoose==='function'){
    window.chooseQuestions=function(pool,n){
      return previousChoose((pool||[]).filter(eligible),n);
    };
  }

  function currentQuestion(){return Array.isArray(session)&&session[current]?session[current]:null;}
  function stampV72(before,q){
    const h=loadHistory();
    if(h.length<=before||!q)return;
    const r=h[h.length-1];
    if(!r||r.session_id!==sessionId||r.question_id!==q.id)return;
    r.bank_version=VERSION;
    r.question_version=q.question_version||1;
    r.source_scope=q.source_scope||null;
    r.starred=Boolean(loadStars()[q.id]);
    saveHistory(h);
  }

  const previousAnswer=window.answer;
  if(typeof previousAnswer==='function'){
    window.answer=function(i,btn){
      const before=loadHistory().length,q=currentQuestion();
      const out=previousAnswer(i,btn);
      stampV72(before,q);
      return out;
    };
  }
  const previousSkip=window.skipQuestion;
  if(typeof previousSkip==='function'){
    window.skipQuestion=function(){
      const before=loadHistory().length,q=currentQuestion();
      const out=previousSkip();
      stampV72(before,q);
      return out;
    };
    const skipBtn=document.getElementById('skipBtn');if(skipBtn)skipBtn.onclick=window.skipQuestion;
  }

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
    const active=(window.QUESTION_BANK||[]).filter(q=>!q.retired);
    const learning=active.filter(eligible);
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
  window.copySummary=async function(){const ok=await copyText(analysisPrompt());alert(ok?'分析・改善プロンプトをコピーしました。':'コピーに失敗しました。');};
  window.shareSummary=window.sendToChatGPT;
  const shareBtn=document.getElementById('shareBtn');if(shareBtn)shareBtn.onclick=window.sendToChatGPT;
  const exportBtn=document.getElementById('exportBtn');if(exportBtn)exportBtn.onclick=window.exportJSON;
  const copyBtn=document.getElementById('copyBtn');if(copyBtn)copyBtn.onclick=window.copySummary;
  const preview=document.getElementById('sharePreview');if(preview)preview.textContent=analysisPrompt();

  document.title=`Pythonデータ分析 模擬トレーナー v${VERSION}`;
  const h1=document.querySelector('.top h1');if(h1)h1.textContent=`Pythonデータ分析 模擬トレーナー v${VERSION}`;
  window.__BANK_VERSION=VERSION;

  const setup=document.querySelector('#setupCard .muted');
  if(setup)setup.textContent='通常模擬は「正しいものを選ぶ」形式を優先し、1問1論点で確認します。★を付けた苦手問題は繰り返し出題します。';

  const active=(window.QUESTION_BANK||[]).filter(q=>!q.retired);
  const learning=active.filter(eligible);
  const stars=loadStars();
  const starCount=Object.keys(stars).filter(id=>stars[id]===true&&learning.some(q=>q.id===id)).length;
  const scikit=learning.filter(q=>q.category==='scikit-learn').length;
  const summary=document.getElementById('bankSummary');
  if(summary)summary.textContent=`通常出題 ${learning.length}問・scikit-learn書籍準拠${scikit}問・★苦手${starCount}問`;
});
