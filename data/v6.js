window.QUESTION_BANK=window.QUESTION_BANK||[];

(function(){
  const q44=window.QUESTION_BANK.find(q=>q.id==='Q044');
  if(q44){q44.choices=['0','2','-3','6'];q44.answer=0;q44.explanation='3×2 + 1×(-6) = 6 - 6 = 0です。';}
  const q67=window.QUESTION_BANK.find(q=>q.id==='Q067');
  if(q67&&q67.topic==='インデックス・スライス')q67.topic='要素指定・スライス';

  const S=(text,explanation)=>({text,explanation});
  const packs=[
    {topic:'前処理',truth:[
      S('`StandardScaler`は各特徴量を平均0、標準偏差1を基準に標準化する。','正しい。`StandardScaler`は平均と標準偏差を用いて標準化します。'),
      S('`MinMaxScaler`は既定では各特徴量を0〜1の範囲へ変換する。','正しい。既定のfeature_rangeは(0, 1)です。'),
      S('`OneHotEncoder`はカテゴリ変数を複数の0/1特徴量へ変換する。','正しい。カテゴリごとの指示変数へ展開する前処理です。'),
      S('前処理器は学習データで`fit`し、テストデータには原則`transform`だけを行う。','正しい。テストデータの情報を前処理の学習へ混ぜないことで、データ漏洩を避けます。'),
      S('`Pipeline`を使うと、前処理と学習器を一連の処理として扱いやすい。','正しい。前処理とモデルをまとめて学習・交差検証できます。'),
      S('`SimpleImputer`は欠損値を平均値や中央値などで補完できる。','正しい。数値特徴量ならmeanやmedianなどの補完戦略を使えます。')],falsehood:[
      S('`StandardScaler`は必ず全特徴量を0〜1の範囲へ変換する。','誤り。0〜1への範囲変換は典型的には`MinMaxScaler`です。'),
      S('学習データとテストデータでは、それぞれ別々に前処理器を`fit`するのが望ましい。','誤り。テストデータ側で`fit`すると、評価時にテスト情報を利用してしまいます。'),
      S('`OneHotEncoder`は目的変数を予測する分類モデルである。','誤り。`OneHotEncoder`はカテゴリ変数を符号化する前処理器です。'),
      S('`MinMaxScaler`を使えば外れ値は自動的に削除される。','誤り。値のスケーリングを行うもので、外れ値を削除する機能ではありません。'),
      S('`Pipeline`を使えばモデルの精度は必ず向上する。','誤り。処理を一貫して管理しやすくなりますが、精度向上が保証されるわけではありません。'),
      S('`SimpleImputer`は文字列カテゴリ専用で、数値特徴量には使えない。','誤り。数値特徴量の平均・中央値補完などにも使えます。')]},

    {topic:'データ分割・交差検証',truth:[
      S('`train_test_split`はデータを学習用とテスト用に分割するために使える。','正しい。学習用データと最終評価用データを分ける代表的な関数です。'),
      S('`test_size=0.2`と比率で指定した場合、全体の約20%をテストデータにする。','正しい。0〜1の小数はテストデータの割合として解釈されます。'),
      S('`random_state`を固定すると、乱数を使う分割を再現しやすくなる。','正しい。主目的は再現性です。'),
      S('分類で`stratify=y`を指定すると、学習側とテスト側でクラス比率を保ちやすい。','正しい。元データのクラス比率に近くなるよう層化分割します。'),
      S('k分割交差検証では、検証に使う分割を入れ替えながら複数回評価する。','正しい。各分割を順番に検証用として使います。'),
      S('最終テストデータは、ハイパーパラメータ調整とは分けて最後の評価に使うのが基本である。','正しい。調整に何度も使うと、最終評価が楽観的になりやすいためです。')],falsehood:[
      S('`random_state`を固定すると、モデルの正解率が必ず高くなる。','誤り。固定する主目的は再現性であり、精度向上の保証ではありません。'),
      S('`stratify=y`を指定すると、各クラスの件数が必ず完全に同数になる。','誤り。クラス数を均等化するのではなく、元のクラス比率を保ちやすくします。'),
      S('`test_size=0.2`は、テストデータを必ず20件にする指定である。','誤り。0.2は件数ではなく割合を表します。'),
      S('k分割交差検証のkは、残す特徴量数を表す。','誤り。kはデータをいくつの分割に分けるかを表します。'),
      S('交差検証では、最終テストデータを毎回学習データへ含める。','誤り。最終テストデータは通常、交差検証によるモデル選択から分離します。'),
      S('最終テストデータを繰り返し見ながらハイパーパラメータを調整するのが望ましい。','誤り。最終テストデータへ過度に適合し、評価の信頼性を損ねます。')]},

    {topic:'分類・アンサンブル',truth:[
      S('`SVC`は分類、`SVR`は回帰に用いるサポートベクターマシン系の推定器である。','正しい。SVCは分類、SVRは回帰です。'),
      S('カーネルトリックは、非線形な決定境界を扱いやすくするために利用できる。','正しい。高次元空間での内積を効率よく扱う考え方です。'),
      S('ランダムフォレスト（Random Forest）は複数の決定木を組み合わせるアンサンブル学習である。','正しい。多数の決定木の予測を組み合わせます。'),
      S('`RandomForestClassifier`の`n_estimators`は、構築する決定木の本数を表す。','正しい。アンサンブルに含める木の数です。'),
      S('決定木の`max_depth`を大きくしすぎると、過学習しやすくなることがある。','正しい。木が複雑になり、学習データの細部へ適合しすぎることがあります。'),
      S('ランダムフォレストでは、各木の学習データ作成にブートストラップ標本を使うことがある。','正しい。復元抽出した標本で各木を学習するのが代表的です。')],falsehood:[
      S('ランダムフォレスト（Random Forest）は1本の決定木だけで予測する手法である。','誤り。複数の決定木を組み合わせるアンサンブル学習です。'),
      S('`SVC`は回帰専用で、分類には使用できない。','誤り。`SVC`は分類用です。回帰には`SVR`があります。'),
      S('`SVC(kernel="linear")`を指定すれば、必ず非線形な決定境界になる。','誤り。linearカーネルは線形の決定境界を扱います。'),
      S('`n_estimators`は分類対象のクラス数を指定する引数である。','誤り。`n_estimators`は木などの推定器の数を表します。'),
      S('決定木では`max_depth`を大きくするほど、未知データでの性能が必ず向上する。','誤り。木を深くしすぎると過学習し、汎化性能が低下することがあります。'),
      S('アンサンブル学習では、必ず全く同じ学習器を全く同じデータで学習させなければならない。','誤り。異なるモデルを組み合わせる場合も、同種モデルへ異なる標本や特徴量を与える場合もあります。')]},

    {topic:'回帰',truth:[
      S('回帰は、住宅価格のような連続値を予測する問題で典型的に使われる。','正しい。連続量の予測が代表的な回帰タスクです。'),
      S('平均絶対誤差（MAE）は、予測誤差の絶対値を平均した指標である。','正しい。誤差の符号を打ち消さないよう絶対値を取って平均します。'),
      S('平均二乗誤差（MSE）は誤差を二乗するため、大きな誤差の影響を受けやすい。','正しい。大きい誤差ほど二乗によって強く重みづけされます。'),
      S('二乗平均平方根誤差（RMSE）はMSEの平方根で、目的変数と同じ単位になる。','正しい。MSEの平方根を取るため、元の目的変数と同じ単位です。'),
      S('決定係数（R²）は1に近いほど当てはまりが良く、場合によっては負の値にもなる。','正しい。基準モデルより悪い場合などには負になることがあります。'),
      S('`LinearRegression`は特徴量と目的変数の線形な関係をモデル化する。','正しい。線形回帰を実装する代表的な推定器です。')],falsehood:[
      S('回帰は、犬か猫かのようなクラスラベルだけを予測する手法である。','誤り。そのような離散クラスの予測は典型的には分類です。'),
      S('平均絶対誤差（MAE）は、すべての予測誤差を二乗してから平均する。','誤り。誤差を二乗するのはMSEで、MAEは絶対値を平均します。'),
      S('平均二乗誤差（MSE）の単位は、常に目的変数と同じである。','誤り。誤差を二乗するため、MSEの単位も二乗されたものになります。'),
      S('平均絶対誤差（MAE）は値が大きいほど、予測性能が良い。','誤り。誤差指標なので、一般には小さいほど予測誤差が小さいと解釈します。'),
      S('決定係数（R²）は必ず0以上1以下になる。','誤り。評価データなどでは負の値になることがあります。'),
      S('RMSEはMAEよりも、大きな誤差の影響を受けにくい。','誤り。RMSEは二乗誤差に基づくため、大きな誤差の影響を受けやすいです。')]},

    {topic:'PCA・次元削減',truth:[
      S('主成分分析（PCA）は、目的変数を使わない教師なしの次元削減手法である。','正しい。PCAは特徴量の分散構造を用いる教師なし手法です。'),
      S('主成分は、元の特徴量の線形結合として表される新しい軸である。','正しい。元特徴量を重みづけして合成した方向です。'),
      S('`explained_variance_ratio_`は、各主成分が説明する分散の割合を表す。','正しい。各主成分が元データの分散をどれだけ保持しているかを示します。'),
      S('特徴量ごとの尺度が大きく異なる場合、主成分分析（PCA）の前に標準化することがある。','正しい。大きな尺度の特徴量が分散を支配する影響を抑えるためです。'),
      S('`PCA(n_components=2)`は、出力を2つの主成分へ減らす指定として使える。','正しい。n_componentsで保持する主成分数を指定できます。'),
      S('主成分分析（PCA）で得られる異なる主成分は、互いに直交する。','正しい。主成分は互いに直交する方向として求められます。')],falsehood:[
      S('主成分分析（PCA）は教師あり学習なので、必ず目的変数`y`が必要である。','誤り。PCAは目的変数を使わない教師なしの次元削減手法です。'),
      S('主成分は必ず元データのどれか1つの列と完全に同じになる。','誤り。主成分は通常、複数の元特徴量の線形結合です。'),
      S('`explained_variance_ratio_`は各クラスの分類正解率を表す。','誤り。各主成分が説明する分散の割合を表します。'),
      S('主成分分析（PCA）は標準化しないと必ずエラーになる。','誤り。標準化は状況により有効ですが、PCA実行の必須条件ではありません。'),
      S('主成分分析（PCA）は特徴量の次元を増やすためだけに使う。','誤り。代表的な用途は次元削減です。'),
      S('主成分分析（PCA）で得た主成分は、必ず元の特徴量より意味を解釈しやすい。','誤り。主成分は複数特徴量の線形結合なので、解釈が難しくなることもあります。')]},

    {topic:'評価指標',truth:[
      S('適合率（precision）は、陽性と予測したもののうち実際に陽性だった割合である。','正しい。TP/(TP+FP)で表されます。'),
      S('再現率（recall）は、実際の陽性のうち正しく陽性と予測できた割合である。','正しい。TP/(TP+FN)で表されます。'),
      S('F1スコアは、適合率（precision）と再現率（recall）の調和平均である。','正しい。両者のバランスを見る代表的な指標です。'),
      S('ROC曲線は、横軸に偽陽性率（FPR）、縦軸に真陽性率（TPR）を取る。','正しい。TPRは再現率と同じ式です。'),
      S('ROC-AUCは0.5付近ならランダムに近い識別で、1に近いほど識別性能が高い。','正しい。二値分類のスコア順位づけ性能を見る代表的な指標です。'),
      S('混同行列は、実際のクラスと予測クラスの組み合わせごとの件数を整理する。','正しい。TP、FP、FN、TNなどを確認できます。')],falsehood:[
      S('適合率（precision）は、実際の陽性をどれだけ見逃さず拾えたかを表す。','誤り。その説明は再現率（recall）です。適合率は陽性予測の正しさを見ます。'),
      S('再現率（recall）は、陽性と予測したもののうち実際に陽性だった割合である。','誤り。その説明は適合率（precision）です。'),
      S('F1スコアは、適合率と再現率の単純な算術平均である。','誤り。F1スコアは調和平均です。'),
      S('ROC曲線の横軸は適合率（precision）である。','誤り。ROC曲線の横軸は偽陽性率（FPR）です。'),
      S('ROC-AUCは0に近いほど、一般に識別性能が高い。','誤り。通常は1に近いほど高い識別性能を示します。'),
      S('混同行列は回帰問題の連続値誤差だけを評価するための表である。','誤り。混同行列は主に分類で、実際のクラスと予測クラスの件数を整理します。')]},

    {topic:'ハイパーパラメータ',truth:[
      S('`GridSearchCV`の`param_grid`には、探索したいハイパーパラメータ候補を指定する。','正しい。辞書などでパラメータ名と候補値を指定します。'),
      S('`GridSearchCV`の`cv`は、交差検証の分割数や分割方法を指定する。','正しい。整数や交差検証オブジェクトなどを指定できます。'),
      S('`GridSearchCV`の`best_params_`から、探索で選ばれたハイパーパラメータを確認できる。','正しい。最良評価だったパラメータ組み合わせを保持します。'),
      S('ハイパーパラメータは、モデルが学習データから直接推定する係数とは区別される。','正しい。学習前に設定・探索する値と、学習で得るパラメータは別物です。'),
      S('`Pipeline`内のパラメータは、`ステップ名__パラメータ名`の形式で指定できる。','正しい。二重アンダースコアで階層的なパラメータ名を指定します。'),
      S('`RandomizedSearchCV`は、候補や分布から一部をサンプリングして探索する。','正しい。全組み合わせを総当たりせず探索できます。')],falsehood:[
      S('`param_grid`には学習データ`X`そのものを指定する。','誤り。`param_grid`には探索するハイパーパラメータ候補を指定します。'),
      S('`cv`はモデルの学習率だけを指定する引数である。','誤り。`cv`は交差検証の分割数や分割方法を指定します。'),
      S('`best_params_`には最終的な予測ラベルの配列が保存される。','誤り。`best_params_`には最良だったハイパーパラメータが保存されます。'),
      S('ハイパーパラメータと、学習によって得られる回帰係数は完全に同じ概念である。','誤り。ハイパーパラメータは学習前に設定・探索し、回帰係数などは学習で推定されます。'),
      S('グリッドサーチは、指定していない値も含めて無限の候補から必ず最適解を見つける。','誤り。基本的には指定した候補の組み合わせの中から探索します。'),
      S('`Pipeline`内のパラメータは`ステップ名_パラメータ名`のようにアンダースコア1個で指定する。','誤り。scikit-learnでは二重アンダースコア`__`を使います。')]},

    {topic:'クラスタリング',truth:[
      S('k-means法（`KMeans`）は、目的変数を使わずデータをグループ分けする教師なし学習である。','正しい。特徴量だけを使ってクラスタを形成します。'),
      S('`KMeans`の`n_clusters`は、作成するクラスタ数を指定する。','正しい。いくつのクラスタへ分けるかを指定します。'),
      S('k-means法では、各クラスタの中心をセントロイド（重心）として更新する。','正しい。割り当てと重心更新を反復します。'),
      S('`KMeans`で`random_state`を固定すると、初期化など乱数を使う処理を再現しやすい。','正しい。再現性を確保しやすくなります。'),
      S('シルエット係数は-1〜1の範囲を取り、一般に大きいほどクラスタ分離が良い。','正しい。1に近いほど自クラスタ内でまとまり、他クラスタと離れている傾向です。'),
      S('凝集型クラスタリングは、近いデータやクラスタを段階的に結合する階層型手法である。','正しい。小さなクラスタから順に結合して階層構造を作ります。')],falsehood:[
      S('k-means法（`KMeans`）を学習するには、正解クラス`y`が必須である。','誤り。k-means法は目的変数を使わない教師なし学習です。'),
      S('`n_clusters`は入力データの特徴量数を指定する引数である。','誤り。`n_clusters`は作成するクラスタ数です。'),
      S('k-means法のセントロイドは、各クラスの正解確率を表す。','誤り。セントロイドはクラスタ中心を表す特徴量空間上の点です。'),
      S('シルエット係数は0〜100の百分率だけを取る。','誤り。シルエット係数は-1〜1の範囲を取ります。'),
      S('凝集型クラスタリングでは、学習前に各データの正解ラベルを与える必要がある。','誤り。教師なしのクラスタリングなので、正解ラベルは必須ではありません。'),
      S('デンドログラムは、回帰モデルの予測値と実測値だけを比較するグラフである。','誤り。デンドログラムは階層型クラスタリングの結合関係を木構造で表します。')]}
  ];

  const triples=[[0,1,2],[0,1,3],[0,1,4],[0,1,5],[0,2,3],[0,2,4],[0,2,5],[0,3,4],[0,3,5],[0,4,5]];
  let qid=271;
  packs.forEach((pack,pIndex)=>{
    for(let j=0;j<10;j++){
      const globalIndex=pIndex*10+j;
      const askMode=globalIndex%3===2?'correct':'incorrect';
      let entries,targetOriginal;
      const tri=triples[j];
      if(askMode==='incorrect'){
        entries=[pack.truth[tri[0]],pack.truth[tri[1]],pack.truth[tri[2]],pack.falsehood[(j*5+1)%6]];
        targetOriginal=3;
      }else{
        entries=[pack.truth[j%6],pack.falsehood[tri[0]],pack.falsehood[tri[1]],pack.falsehood[tri[2]]];
        targetOriginal=0;
      }
      const shift=(globalIndex*3)%4;
      const rotated=entries.slice(shift).concat(entries.slice(0,shift));
      const answer=(targetOriginal-shift+4)%4;
      window.QUESTION_BANK.push({
        id:`Q${String(qid++).padStart(3,'0')}`,
        category:'scikit-learn',topic:pack.topic,difficulty:j%4===3?'hard':'medium',type:'statement',
        q:`scikit-learnの「${pack.topic}」に関する説明として、${askMode==='incorrect'?'誤っているもの':'正しいもの'}を1つ選んでください。`,
        choices:rotated.map(x=>x.text),answer,
        explanation:'各選択肢の正誤と理由を確認してください。',
        option_explanations:rotated.map(x=>x.explanation),ask_mode:askMode,format_version:6
      });
    }
  });

  function jp(s){
    if(typeof s!=='string')return s;
    return s
      .replace(/One-hot/g,'ワンホット')
      .replace(/trainデータ/g,'学習データ')
      .replace(/testデータ/g,'テストデータ')
      .replace(/train\/test/g,'学習/テスト')
      .replace(/PCAの/g,'主成分分析（PCA）の')
      .replace(/PCA の/g,'主成分分析（PCA）の')
      .replace(/PCAは/g,'主成分分析（PCA）は')
      .replace(/PCA は/g,'主成分分析（PCA）は')
      .replace(/PCAを/g,'主成分分析（PCA）を')
      .replace(/PCA を/g,'主成分分析（PCA）を')
      .replace(/MAEは/g,'平均絶対誤差（MAE）は')
      .replace(/MAE は/g,'平均絶対誤差（MAE）は')
      .replace(/MSEは/g,'平均二乗誤差（MSE）は')
      .replace(/MSE は/g,'平均二乗誤差（MSE）は')
      .replace(/SVMは/g,'サポートベクターマシン（SVM）は')
      .replace(/SVM は/g,'サポートベクターマシン（SVM）は');
  }
  for(const q of window.QUESTION_BANK){
    if(q.category!=='scikit-learn'||q.format_version===6)continue;
    q.q=jp(q.q);q.choices=q.choices.map(jp);q.explanation=jp(q.explanation);
  }

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
})();

(function(){
  const CHAT_URL_KEY='python_exam_chat_url_v1';
  const DEFAULT_CHAT_URL='https://chatgpt.com/';

  window.addEventListener('load',()=>{
    document.title='Pythonデータ分析 模擬トレーナー v6';
    const h1=document.querySelector('.top h1');
    if(h1)h1.textContent='Pythonデータ分析 模擬トレーナー v6';

    const style=document.createElement('style');
    style.textContent='.feedback.show.skip{display:block;background:var(--card);border:1px solid var(--line)}.skipMark{font-weight:800}.choiceReview{margin-top:12px;padding-top:10px;border-top:1px solid var(--line);display:grid;gap:8px}.choiceReviewItem{font-size:13px;line-height:1.5}.choiceReviewItem b{display:inline-block;min-width:1.5em}.chatUrlBox{margin-top:14px;padding-top:14px;border-top:1px solid var(--line)}.chatUrlBox input{width:100%;border:1px solid var(--line);border-radius:10px;padding:11px;background:var(--card);color:var(--text);font-size:14px;margin:7px 0}.chatUrlBox .row{align-items:center}';
    document.head.appendChild(style);

    const actions=document.querySelector('.dockActions'),quitBtn=document.getElementById('quitBtn');
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

    const baseChooseQuestions=window.chooseQuestions;
    function usageAware(pool,n){
      const used=usageMap();
      return pool.map(q=>({q,count:used[q.id]?.count||0,last:used[q.id]?.last||0,r:Math.random()}))
        .sort((a,b)=>a.count-b.count||a.last-b.last||a.r-b.r)
        .slice(0,Math.min(n,pool.length)).map(x=>x.q);
    }
    window.chooseQuestions=function(pool,n){
      const size=Math.min(n,pool.length);
      const onlySklearn=pool.length>0&&pool.every(q=>q.category==='scikit-learn');
      if(!onlySklearn)return baseChooseQuestions(pool,n);
      const incorrect=pool.filter(q=>q.ask_mode==='incorrect');
      const correct=pool.filter(q=>q.ask_mode!=='incorrect');
      const needIncorrect=Math.min(incorrect.length,Math.round(size*0.65));
      const a=usageAware(incorrect,needIncorrect);
      const selected=new Set(a.map(q=>q.id));
      const b=usageAware(correct.filter(q=>!selected.has(q.id)),size-a.length);
      [...a,...b].forEach(q=>selected.add(q.id));
      const fill=usageAware(pool.filter(q=>!selected.has(q.id)),size-a.length-b.length);
      return shuffle([...a,...b,...fill]);
    };

    window.prepareQuestion=function(q,target){
      const order=shuffle([0,1,2,3].filter(i=>i!==q.answer));
      order.splice(target,0,q.answer);
      return {...q,_choices:order.map(i=>q.choices[i]),_answer:target,_option_explanations:order.map(i=>q.option_explanations?.[i]||null)};
    };

    window.__sessionSkipped=0;
    const baseStartQuiz=window.startQuiz;
    window.startQuiz=function(){window.__sessionSkipped=0;return baseStartQuiz();};

    const baseRenderQuestion=window.renderQuestion;
    window.renderQuestion=function(){
      baseRenderQuestion();
      const sb=document.getElementById('skipBtn');if(sb){sb.style.display='inline-block';sb.disabled=false;}
      const ls=document.getElementById('liveScore');if(ls)ls.textContent=`正解 ${score} / スキップ ${window.__sessionSkipped||0}`;
    };

    function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
    function reviewHTML(q){
      if(!q._option_explanations||!q._option_explanations.some(Boolean))return '';
      return `<div class="choiceReview">${q._option_explanations.map((e,i)=>`<div class="choiceReviewItem"><b>${LETTERS[i]}.</b> ${esc(e||'')}</div>`).join('')}</div>`;
    }

    window.answer=function(i,btn){
      if(answered)return;answered=true;
      const q=session[current],buttons=[...document.querySelectorAll('.choice')];
      buttons.forEach(b=>b.disabled=true);buttons[q._answer].classList.add('correct');
      const ok=i===q._answer;if(ok)score++;else btn.classList.add('wrong');
      const fb=document.getElementById('feedback');fb.className='feedback show '+(ok?'ok':'ng');
      fb.innerHTML=`<b>${ok?'✅ 正解':'❌ 不正解'}</b><br>${ok?'':`正解は ${LETTERS[q._answer]}。<br>`}${esc(q.explanation)}${reviewHTML(q)}`;
      const h=loadHistory(),prev=h.filter(x=>x.question_id===q.id).length;
      h.push({session_id:sessionId,question_id:q.id,category:q.category,topic:q.topic,difficulty:q.difficulty,ask_mode:q.ask_mode||'correct',correct:ok,skipped:false,selected_answer:LETTERS[i],correct_answer:LETTERS[q._answer],selected_choice:q._choices[i],correct_choice:q._choices[q._answer],answered_at:nowISO(),attempt_no:prev+1});
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
      const fb=document.getElementById('feedback');fb.className='feedback show skip';
      fb.innerHTML=`<span class="skipMark">⏭ わからない / スキップ</span><br>正解は ${LETTERS[q._answer]}。<br>${esc(q.explanation)}${reviewHTML(q)}`;
      const h=loadHistory(),prev=h.filter(x=>x.question_id===q.id).length;
      h.push({session_id:sessionId,question_id:q.id,category:q.category,topic:q.topic,difficulty:q.difficulty,ask_mode:q.ask_mode||'correct',correct:null,skipped:true,selected_answer:null,correct_answer:LETTERS[q._answer],selected_choice:null,correct_choice:q._choices[q._answer],answered_at:nowISO(),attempt_no:prev+1});
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

    const baseRenderStats=window.renderStats;
    window.renderStats=function(){
      baseRenderStats();
      const all=[...loadHistory()].reverse().slice(0,12),recent=document.getElementById('recentHistory');
      if(recent&&all.length)recent.innerHTML=`<table class="tbl"><tr><th>問題</th><th>結果</th></tr>${all.map(r=>`<tr><td>${r.category} / ${r.topic}<br><span class="muted">${new Date(r.answered_at).toLocaleString()}</span></td><td>${r.skipped?'⏭':(r.correct?'✅':'❌')}</td></tr>`).join('')}</table>`;
    };

    function analysisPrompt(){
      return 'Python 3 エンジニア認定データ分析試験トレーナーの回答履歴です。以下の回答単位データを分析してください。skipped=true は「分からない」として強い知識不足シグナルとして扱い、正答率には含めないでください。ask_mode=incorrect は「誤っているものを選ぶ」問題、correct は「正しいものを選ぶ」問題です。偶然正解の可能性も考慮し、知識不足の論点と、問題文・選択肢・正解設定など問題バンク側の改善点を分けて指摘してください。複数正解、曖昧な表現、重複や不自然な問題があれば具体的に示してください。必要なら追加すべきオリジナル問題の論点と難易度も提案してください。';
    }

    function compactPayload(){
      const history=loadHistory(),byId=new Map(BANK.map(q=>[q.id,q])),usedIds=[...new Set(history.map(r=>r.question_id).filter(Boolean))];
      const questions=usedIds.map(id=>byId.get(id)).filter(Boolean).map(q=>({id:q.id,c:q.category,t:q.topic,d:q.difficulty,m:q.ask_mode||'correct',q:q.q,o:q.choices,a:q.choices[q.answer],oe:q.option_explanations||null}));
      const attempts=history.map(r=>({q:r.question_id,m:r.ask_mode||null,c:r.skipped===true?null:Boolean(r.correct),s:r.skipped===true,sa:r.selected_answer??null,sc:r.selected_choice??null,ca:r.correct_answer??null,cc:r.correct_choice??null,n:r.attempt_no??null,at:r.answered_at??null}));
      return{app:'Pythonデータ分析 模擬トレーナー v6',bank:BANK.length,exported:nowISO(),legend:{questions:'id=問題ID,c=分野,t=トピック,d=難易度,m=出題形式,q=問題文,o=選択肢,a=正解本文,oe=各選択肢解説',attempts:'q=問題ID,m=出題形式,c=正誤(true/false/null),s=スキップ,sa=選択肢記号,sc=選択本文,ca=正解記号,cc=正解本文,n=試行回数,at=回答時刻'},questions,attempts};
    }
    function shareText(){return analysisPrompt()+'\n\n---DATA(JSON)---\n'+JSON.stringify(compactPayload());}

    async function copyText(text){
      try{await navigator.clipboard.writeText(text);return true;}catch(e){}
      try{const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.focus();ta.select();const ok=document.execCommand('copy');ta.remove();return ok;}catch(e){return false;}
    }
    function validChatUrl(v){return /^https:\/\/(chatgpt\.com|chat\.openai\.com)\//i.test(v||'');}
    function getChatUrl(){const v=(localStorage.getItem(CHAT_URL_KEY)||'').trim();return validChatUrl(v)?v:DEFAULT_CHAT_URL;}

    window.sendToChatGPT=async function(){
      const text=shareText(),ok=await copyText(text);
      if(!ok){alert('クリップボードへのコピーに失敗しました。JSON保存を使ってください。');return;}
      alert(`分析プロンプト＋回答履歴をコピーしました（約${Math.ceil(new Blob([text]).size/1024)}KB）。ChatGPTを開きます。入力欄へ貼り付けて送信してください。`);
      location.href=getChatUrl();
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
