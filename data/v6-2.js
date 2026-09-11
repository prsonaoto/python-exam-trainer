window.QUESTION_BANK=window.QUESTION_BANK||[];

(function(){
  const BANK_VERSION='6.2';
  const retiredIds=new Set(['Q205','Q216','Q218','Q224','Q263','Q265','Q236','Q267','Q269','Q253']);
  for(const q of window.QUESTION_BANK){
    if(!q.question_version)q.question_version=1;
    if(retiredIds.has(q.id))q.retired=true;
  }

  const Q=(id,topic,difficulty,askMode,text,choices,answer,explanations)=>({
    id,category:'scikit-learn',topic,difficulty,type:'statement',q:text,choices,answer,
    explanation:'各選択肢の正誤と理由を確認してください。',
    option_explanations:explanations,ask_mode:askMode,format_version:6,question_version:2
  });

  window.QUESTION_BANK.push(
    Q('Q381','データ分割・交差検証','hard','incorrect',
      'モデル選択と最終評価に関する説明として、誤っているものを1つ選んでください。',
      ['交差検証は、学習データ内でモデルやハイパーパラメータを比較するために利用できる','最終テストデータは、モデル選択が終わった後の最終評価に残しておくのが基本である','最終テストデータを何度も確認しながらハイパーパラメータを調整すると、評価が楽観的になることがある','最終テストデータも交差検証の各foldへ混ぜるほど、未知データ性能を公平に評価できる'],3,
      ['正しい。学習データ内の複数分割で候補を比較できます。','正しい。最終テストは最後まで独立に保つのが基本です。','正しい。テスト結果へ合わせ込むとテストデータへ間接的に適合します。','誤り。最終テストをモデル選択へ混ぜると、公平な最終評価ではなくなります。']),

    Q('Q382','データ分割・交差検証','medium','correct',
      '分類問題で層化k分割交差検証を使う理由として、正しいものを1つ選んでください。',
      ['各foldで元データに近いクラス比率を保ちやすくする','各foldの特徴量数を完全に同じ値へ変換する','各クラスの件数を必ず同数へ増減する','目的変数を使わない教師なし評価へ変換する'],0,
      ['正しい。特に不均衡データでクラス比率の偏りを抑えやすくなります。','誤り。特徴量数を変える仕組みではありません。','誤り。クラス数を均等化するのではなく、元の比率を保つことが目的です。','誤り。分類ラベルを用いて層化します。']),

    Q('Q383','データ分割・交差検証','hard','incorrect',
      'k分割交差検証に関する説明として、誤っているものを1つ選んでください。',
      ['通常はデータをk個のfoldに分け、検証用foldを入れ替えて評価する','各foldの評価値を見ることで、単一分割だけより性能のばらつきを把握しやすい','標準的なk分割交差検証では、同じ1つの学習済みモデルへfoldごとの学習結果を継ぎ足し続ける','kを大きくすると一般に学習回数も増えるため、計算量が増えやすい'],2,
      ['正しい。検証用部分を順番に入れ替えます。','正しい。複数の評価値から平均やばらつきを確認できます。','誤り。foldごとに学習用データからモデルを学習し直して評価するのが基本です。','正しい。k回の学習・評価が必要になります。']),

    Q('Q384','データ分割・交差検証','hard','incorrect',
      '標準化と交差検証に関する説明として、誤っているものを1つ選んでください。',
      ['交差検証の前に全データへStandardScalerをfitすると、検証foldの情報が前処理へ混ざる可能性がある','PipelineにStandardScalerとモデルを入れると、各foldの学習部分だけで前処理をfitしやすい','前処理も交差検証の内側で学習することは、データ漏洩を避けるうえで重要である','検証foldを含む全データで標準化の平均・標準偏差を求めても、評価への影響は原理上まったくない'],3,
      ['正しい。検証データの統計量を先に使うと漏洩になります。','正しい。Pipelineは前処理とモデルを一体として交差検証できます。','正しい。前処理のfitも学習工程の一部として扱います。','誤り。検証データの情報が前処理へ漏れ、評価が楽観的になる場合があります。']),

    Q('Q385','データ分割・交差検証','hard','correct',
      'GridSearchCVを使ったモデル選択の流れとして、最も適切なものを1つ選んでください。',
      ['学習データ内で交差検証しながら候補を比較し、選択後に独立したテストデータで最終評価する','最終テストデータの正解率が最大になるまでparam_gridを書き換え続ける','学習データとテストデータを結合してからGridSearchCVへ渡す','cvを指定した場合はテストデータが不要なので最終評価もしない'],0,
      ['正しい。モデル選択と最終評価を分離する流れです。','誤り。最終テストへの合わせ込みになります。','誤り。独立した最終評価データを失います。','誤り。交差検証と独立した最終テストは役割が異なります。']),

    Q('Q386','データ分割・交差検証','medium','incorrect',
      'random_stateに関する説明として、誤っているものを1つ選んでください。',
      ['乱数を使うデータ分割の再現性を高めるために利用できる','同じ条件で実験結果を比較しやすくする目的がある','random_stateを固定すれば未知データに対する精度が必ず最大になる','train_test_splitなど乱数を使う処理で指定できる'],2,
      ['正しい。乱数系列を再現しやすくします。','正しい。比較実験で条件をそろえやすくなります。','誤り。再現性のための指定であり、精度最大化を保証しません。','正しい。代表的な用途です。']),

    Q('Q387','PCA・次元削減','hard','incorrect',
      '主成分分析（PCA）の主成分に関する説明として、誤っているものを1つ選んでください。',
      ['第1主成分は、データの分散が大きくなる方向として求められる','第2主成分以降は、それ以前の主成分と直交する方向から求められる','主成分は元の特徴量の線形結合として表される','第1主成分は、データの分散が最も小さくなる方向から優先して選ばれる'],3,
      ['正しい。PCAは分散を大きく説明する方向を優先します。','正しい。主成分は互いに直交する方向として求められます。','正しい。元特徴量を重みづけした新しい軸です。','誤り。最小ではなく、分散を最大化する方向が第1主成分です。']),

    Q('Q388','PCA・次元削減','hard','incorrect',
      'PCAと標準化に関する説明として、誤っているものを1つ選んでください。',
      ['特徴量ごとの単位やスケールが大きく異なると、分散の大きい特徴量がPCAへ強く影響することがある','StandardScalerで標準化してからPCAを行うことは代表的な前処理である','標準化の必要性はデータの単位や分析目的によって判断する','標準化を行えば、各主成分の寄与率は必ず完全に同じ値になる'],3,
      ['正しい。PCAは分散に基づくためスケール差の影響を受けます。','正しい。単位差を抑えてPCAする代表的な方法です。','正しい。標準化は常に必須というわけではありません。','誤り。標準化してもデータの相関構造に応じて主成分ごとの寄与率は異なります。']),

    Q('Q389','PCA・次元削減','medium','correct',
      'Xが100行5列のデータで、PCA(n_components=2).fit_transform(X)を行ったときの出力shapeとして正しいものを1つ選んでください。',
      ['(100, 2)','(2, 100)','(100, 5)','(5, 2)'],0,
      ['正しい。100サンプルを2主成分へ変換します。','誤り。サンプル数と主成分数の順序が逆です。','誤り。5特徴量のままではなく2次元へ削減します。','誤り。出力行数は元のサンプル数100です。']),

    Q('Q390','PCA・次元削減','hard','incorrect',
      'explained_variance_ratio_に関する説明として、誤っているものを1つ選んでください。',
      ['各主成分が元データの分散をどの程度説明するかの割合を表す','複数主成分の値を合計すると、保持できている分散の割合を確認できる','n_componentsを減らした場合、保持する主成分の寄与率合計が1未満になることがある','各値は元特徴量それぞれの回帰係数を表す'],3,
      ['正しい。主成分ごとの寄与率です。','正しい。累積寄与率として情報保持量を見られます。','正しい。捨てた主成分の分散分だけ合計は1より小さくなり得ます。','誤り。元特徴量の回帰係数ではありません。']),

    Q('Q391','PCA・次元削減','medium','correct',
      'PCAで次元削減したデータについて、正しいものを1つ選んでください。',
      ['主成分得点は、元特徴量を組み合わせた新しい座標上の値である','主成分分析を行うと必ず教師ラベルが新しく生成される','第1主成分は元データのどれか1列と必ず完全に一致する','PCAは分類器なのでpredict()でクラスを直接予測する'],0,
      ['正しい。各サンプルを主成分軸へ射影した値です。','誤り。教師なしの次元削減で、ラベルを生成する処理ではありません。','誤り。通常は複数特徴量の線形結合です。','誤り。PCA自体は分類器ではありません。']),

    Q('Q392','PCA・次元削減','hard','incorrect',
      'PCAのinverse_transform()に関する説明として、誤っているものを1つ選んでください。',
      ['主成分空間のデータを元の特徴量空間へ戻すために使える','次元削減で情報を捨てている場合、元データを完全には復元できないことがある','保持する主成分数が少ないほど、一般に復元誤差が生じ得る','n_componentsを1に減らしても、inverse_transform()を使えば元データを必ず完全復元できる'],3,
      ['正しい。主成分空間から元空間へ戻す操作です。','正しい。捨てた主成分の情報は失われています。','正しい。保持情報が少ないほど完全復元は難しくなります。','誤り。次元削減で失われた情報までは復元できません。']),

    Q('Q393','回帰・評価指標','hard','incorrect',
      '平均絶対誤差（MAE）と平均二乗誤差（MSE）に関する説明として、誤っているものを1つ選んでください。',
      ['MAEは予測誤差の絶対値を平均する','MSEは予測誤差を二乗して平均する','MSEは大きな誤差をMAEより強く評価へ反映しやすい','MAEは誤差を二乗するため、MSEより外れ値の影響を強く受ける'],3,
      ['正しい。MAEの定義です。','正しい。MSEの定義です。','正しい。二乗によって大きな誤差の寄与が増えます。','誤り。二乗するのはMSEで、一般にMSEの方が大きな誤差の影響を受けやすいです。']),

    Q('Q394','回帰・評価指標','medium','correct',
      '二乗平均平方根誤差（RMSE）について、正しいものを1つ選んでください。',
      ['MSEの平方根を取った値で、目的変数と同じ単位で解釈できる','MAEを二乗した値である','分類の適合率と再現率の調和平均である','値は必ず0から1の範囲に収まる'],0,
      ['正しい。平方根を取るため元の目的変数と同じ単位になります。','誤り。RMSEはMSEの平方根です。','誤り。それはF1スコアです。','誤り。回帰誤差の大きさに応じて1を超えることもあります。']),

    Q('Q395','回帰・評価指標','hard','incorrect',
      '決定係数（R²）に関する説明として、誤っているものを1つ選んでください。',
      ['1に近いほど一般に回帰モデルの当てはまりが良い','評価データでは0未満になることがある','平均値だけを予測する基準より悪いモデルでは負になる場合がある','R²はどのような回帰モデルでも必ず0以上1以下になる'],3,
      ['正しい。1が理想的な当てはまりです。','正しい。未知データ評価などでは負になることがあります。','正しい。基準より悪い予測では負値になり得ます。','誤り。R²は負になる場合があります。']),

    Q('Q396','分類・評価指標','hard','incorrect',
      '不均衡な分類データの評価に関する説明として、誤っているものを1つ選んでください。',
      ['多数派クラスばかり予測しても正解率が高く見える場合がある','適合率や再現率など、目的に応じた指標も確認することが重要である','混同行列を見ると誤分類の内訳を確認できる','正解率が95%なら、クラス不均衡の程度に関係なくモデル性能は必ず十分である'],3,
      ['正しい。不均衡データでは正解率だけが高くなる場合があります。','正しい。見逃しや誤検知のコストに応じて指標を選びます。','正しい。TP/FP/FN/TNなどを確認できます。','誤り。正解率だけでは少数派クラスを全く捉えていない可能性があります。']),

    Q('Q397','分類・評価指標','medium','correct',
      '病気のスクリーニングで「実際に病気の人をできるだけ見逃したくない」とき、特に重視する指標として正しいものを1つ選んでください。',
      ['再現率（recall）','適合率（precision）だけ','決定係数（R²）','平均絶対誤差（MAE）'],0,
      ['正しい。実際の陽性のうち正しく陽性とした割合です。','誤り。適合率は陽性と予測したものの正しさを重視します。','誤り。主に回帰の指標です。','誤り。回帰誤差の指標です。']),

    Q('Q398','分類・評価指標','medium','incorrect',
      'F1スコアに関する説明として、誤っているものを1つ選んでください。',
      ['適合率と再現率のバランスを見る代表的な指標である','適合率と再現率の調和平均である','片方だけが極端に低い場合、F1スコアも高くなりにくい','適合率と再現率を単純に足して2で割った算術平均である'],3,
      ['正しい。両者をまとめて評価する指標です。','正しい。調和平均を使います。','正しい。低い側の影響を受けやすい指標です。','誤り。単純平均ではなく調和平均です。']),

    Q('Q399','SVM・マージン','medium','incorrect',
      'サポートベクターマシン（SVM）のサポートベクトルに関する説明として、誤っているものを1つ選んでください。',
      ['分類境界に近い重要な学習点がサポートベクトルになる','サポートベクトルは分類境界の位置を決めるうえで強い影響を持つ','境界から十分遠い点を少し動かしても、最適境界が変わらない場合がある','各クラスで分類境界から最も遠い点だけがサポートベクトルになる'],3,
      ['正しい。境界・マージン近傍の点が重要です。','正しい。SVMの解を支える学習点です。','正しい。境界から遠い点は解へ直接影響しないことがあります。','誤り。重要なのは境界に近い点であり、最も遠い点ではありません。']),

    Q('Q400','SVM・マージン','hard','incorrect',
      'SVMのマージンの幾何的な意味として、誤っているものを1つ選んでください。',
      ['線形SVMでは、分類境界と最も近いサポートベクトルとの距離に関係する','最大マージンという考え方では、クラス間にできるだけ余裕のある境界を選ぶ','2次元では分類境界を直線としてイメージできる','マージンとは分類境界から最も遠い学習点までの距離である'],3,
      ['正しい。境界近傍の点との距離がマージンを決めます。','正しい。境界の余裕を大きくする考え方です。','正しい。線形SVMなら2次元では直線になります。','誤り。最も遠い点ではなく、境界に最も近いサポートベクトルが重要です。']),

    Q('Q401','SVM・マージン','hard','correct',
      'ソフトマージンSVMでCを大きくしたときの一般的な傾向として、正しいものを1つ選んでください。',
      ['誤分類やマージン違反へのペナルティを強くし、学習データへの適合を重視しやすくなる','誤分類をより許容し、必ず非常に広いマージンになる','CはRBFカーネルの影響範囲だけを決める','Cを大きくすると自動的に特徴量が標準化される'],0,
      ['正しい。大きなCは違反を強く罰し、狭いマージンでも訓練誤差を減らす方向へ働きやすいです。','誤り。誤分類を許容しやすくするのは小さいC側です。','誤り。RBFの影響範囲には主にgammaが関係します。','誤り。標準化は別途前処理として行います。']),

    Q('Q402','SVM・マージン','hard','incorrect',
      'ソフトマージンSVMのCに関する説明として、誤っているものを1つ選んでください。',
      ['Cが小さいほど、ある程度の誤分類やマージン違反を許容しやすい','Cはマージンの広さと学習誤差のトレードオフに関係する','Cが大きすぎると学習データへ適合しすぎる場合がある','Cを小さくするほど、誤分類へのペナルティは必ず強くなる'],3,
      ['正しい。違反を許容して広いマージンを取りやすくなります。','正しい。代表的な正則化パラメータです。','正しい。データによっては過学習方向へ働くことがあります。','誤り。小さいCでは違反へのペナルティは相対的に弱くなります。']),

    Q('Q403','SVM・前処理','medium','correct',
      'SVMで特徴量の標準化が重要になりやすい理由として、正しいものを1つ選んでください。',
      ['特徴量空間の距離や内積にスケール差が影響しやすいため','SVMは整数値しか入力できないため','標準化しないとSVCは必ず例外を出すため','標準化すると必ず線形分離可能になるため'],0,
      ['正しい。桁の大きい特徴量が境界へ過大な影響を与えるのを抑えやすくなります。','誤り。連続値を扱えます。','誤り。未標準化でも実行自体は可能です。','誤り。標準化だけで線形分離可能になる保証はありません。']),

    Q('Q404','SVM・境界','hard','incorrect',
      '線形SVMの分類境界に関する説明として、誤っているものを1つ選んでください。',
      ['分類境界は特徴量空間上の超平面として表される','2次元なら分類境界は直線として表せる','サポートベクトルの位置が変わると分類境界も変わる可能性がある','学習済み分類境界は、サポートベクトルの位置とは無関係にクラス平均だけで決まる'],3,
      ['正しい。線形SVMの基本形です。','正しい。2次元では超平面は直線です。','正しい。サポートベクトルは境界を支える重要な点です。','誤り。SVMの境界はクラス平均だけで決まるものではありません。']),

    Q('Q405','SVM・カーネル','hard','incorrect',
      'RBFカーネルのgammaに関する説明として、誤っているものを1つ選んでください。',
      ['gammaが大きいほど、各学習点の影響範囲は狭くなる傾向がある','gammaが大きすぎると、複雑な境界になり過学習しやすい場合がある','gammaが小さいほど、より広い範囲の点が影響し滑らかな境界になりやすい','gammaを大きくするほど、各学習点の影響範囲は必ず広くなる'],3,
      ['正しい。局所的な影響が強くなります。','正しい。細かい境界を作りやすくなります。','正しい。影響範囲が広がる方向です。','誤り。大きいgammaでは影響範囲は狭くなる傾向があります。']),

    Q('Q406','SVM・境界','medium','correct',
      'SVCのdecision_function()について、正しいものを1つ選んでください。',
      ['分類境界に基づく決定スコアを返し、0〜1の確率とは限らない','必ず0〜1に正規化された予測確率だけを返す','StandardScalerで変換した特徴量を返す','サポートベクトルの座標そのものだけを返す'],0,
      ['正しい。境界からの判定側や距離感に対応するスコアです。','誤り。確率そのものではありません。','誤り。前処理後の特徴量を返すメソッドではありません。','誤り。サポートベクトル自体はsupport_vectors_などで確認します。']),

    Q('Q407','ランダムフォレスト','medium','incorrect',
      'RandomForestClassifierのmax_featuresに関する説明として、誤っているものを1つ選んでください。',
      ['各分岐で検討する特徴量数を制御するために使われる','木ごと・分岐ごとの多様性を作ることに関係する','すべての木が常に完全に同じ特徴量だけを見るよう強制するための引数である','ランダムフォレストの木同士の相関を下げる考え方に関係する'],2,
      ['正しい。分岐候補として見る特徴量数を制御します。','正しい。特徴量のランダム性が木の多様性につながります。','誤り。むしろ特徴量選択にランダム性を入れ、多様な木を作るために使われます。','正しい。木同士が似すぎるのを抑える狙いがあります。']),

    Q('Q408','ランダムフォレスト','hard','incorrect',
      'ランダムフォレストのbootstrapに関する説明として、誤っているものを1つ選んでください。',
      ['bootstrap=Trueでは、復元抽出した標本を各決定木の学習へ使う','同じサンプルが1本の木の学習データに複数回入ることがある','ある木の学習に使われないサンプルが生じることがある','bootstrap=Trueでは、全ての木が必ず全く同じ学習サンプル集合を1回ずつ使う'],3,
      ['正しい。ブートストラップ標本を作ります。','正しい。復元抽出なので重複が起こります。','正しい。選ばれなかったデータはOOBサンプルになります。','誤り。木ごとに異なる復元抽出標本を使うのが基本です。']),

    Q('Q409','ランダムフォレスト','medium','correct',
      'ランダムフォレストが単一の深い決定木より過学習を抑えやすい理由として、正しいものを1つ選んでください。',
      ['複数の異なる決定木の予測を組み合わせ、個々の木のばらつきを平均化しやすいため','各決定木を必ず深さ1に固定するため','全特徴量を削除して学習するため','学習データを使わずテストデータだけで木を作るため'],0,
      ['正しい。多数の木を組み合わせることで分散を下げやすくなります。','誤り。木の深さはハイパーパラメータで制御できますが、必ず1ではありません。','誤り。特徴量を使って分岐します。','誤り。テストデータは学習に使いません。']),

    Q('Q410','ランダムフォレスト','medium','incorrect',
      'ランダムフォレストと特徴量スケーリングに関する説明として、誤っているものを1つ選んでください。',
      ['決定木は特徴量の大小関係に基づく分岐を行うため、SVMほど標準化へ敏感でないことが多い','RandomForestClassifierを使う前にStandardScalerが必須というわけではない','SVMとランダムフォレストでは、特徴量スケールへの感度が異なる','RandomForestClassifierは標準化しない限り原理上まったく学習できない'],3,
      ['正しい。木ベース手法は距離計算を中心としないためです。','正しい。標準化なしでも通常学習できます。','正しい。SVMはスケール差の影響を受けやすい一方、木ベースは比較的受けにくいです。','誤り。標準化は必須条件ではありません。'])
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

  window.__BANK_VERSION=BANK_VERSION;
  window.__RETIRED_IDS=retiredIds;
})();

window.addEventListener('load',()=>{
  const VERSION='6.2';
  document.title=`Pythonデータ分析 模擬トレーナー v${VERSION}`;
  const h1=document.querySelector('.top h1');
  if(h1)h1.textContent=`Pythonデータ分析 模擬トレーナー v${VERSION}`;

  const retired=window.__RETIRED_IDS||new Set();
  const activeBank=window.QUESTION_BANK.filter(q=>!q.retired);
  const summary=document.getElementById('bankSummary');
  if(summary)summary.textContent=`${activeBank.length}問・重複${retired.size}問を出題対象外・未出題優先・選択肢分散`;
  const counts={};for(const q of activeBank)counts[q.category]=(counts[q.category]||0)+1;
  const sel=document.getElementById('categoryFilter');
  if(sel){for(const o of [...sel.options]){if(o.value!=='ALL'&&counts[o.value]!=null)o.textContent=`${o.value} (${counts[o.value]}問)`;}}

  const baseChoose=window.chooseQuestions;
  window.chooseQuestions=function(pool,n){return baseChoose(pool.filter(q=>!q.retired),n);};

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
  window.answer=function(i,btn){
    const before=loadHistory().length,q=session[current];
    const out=baseAnswer(i,btn);stampLatest(before,q);return out;
  };
  const baseSkip=window.skipQuestion;
  window.skipQuestion=function(){
    const before=loadHistory().length,q=session[current];
    const out=baseSkip();stampLatest(before,q);return out;
  };
  const skipBtn=document.getElementById('skipBtn');if(skipBtn)skipBtn.onclick=window.skipQuestion;

  function analysisPrompt(){
    return 'Python 3 エンジニア認定データ分析試験トレーナーの回答履歴です。以下の回答単位データを分析してください。skipped=true は「分からない」として強い知識不足シグナルとして扱い、正答率には含めないでください。ask_mode=incorrect は「誤っているものを選ぶ」問題、correct は「正しいものを選ぶ」問題です。question_version と bank_version がある場合は、問題改訂前後を混同しないでください。偶然正解の可能性も考慮し、知識不足の論点と、問題文・選択肢・正解設定など問題バンク側の改善点を分けて指摘してください。複数正解、曖昧な表現、重複や不自然な問題があれば具体的に示してください。必要なら追加すべきオリジナル問題の論点と難易度も提案してください。';
  }
  function payload(){
    const history=loadHistory(),byId=new Map(window.QUESTION_BANK.map(q=>[q.id,q])),used=[...new Set(history.map(r=>r.question_id).filter(Boolean))];
    const questions=used.map(id=>byId.get(id)).filter(Boolean).map(q=>({id:q.id,v:q.question_version||1,c:q.category,t:q.topic,d:q.difficulty,m:q.ask_mode||'correct',q:q.q,o:q.choices,a:q.choices[q.answer],oe:q.option_explanations||null,retired:Boolean(q.retired)}));
    const attempts=history.map(r=>({q:r.question_id,bv:r.bank_version??null,qv:r.question_version??null,m:r.ask_mode??null,c:r.skipped===true?null:Boolean(r.correct),s:r.skipped===true,sa:r.selected_answer??null,sc:r.selected_choice??null,ca:r.correct_answer??null,cc:r.correct_choice??null,n:r.attempt_no??null,at:r.answered_at??null}));
    return{app:`Pythonデータ分析 模擬トレーナー v${VERSION}`,bank_active:activeBank.length,bank_stored:window.QUESTION_BANK.length,retired:retired.size,exported:new Date().toISOString(),legend:{questions:'id=問題ID,v=問題版,c=分野,t=トピック,d=難易度,m=出題形式,q=問題文,o=選択肢,a=正解本文,oe=各選択肢解説,retired=出題停止',attempts:'q=問題ID,bv=回答時バンク版,qv=回答時問題版,m=出題形式,c=正誤(true/false/null),s=スキップ,sa=選択肢記号,sc=選択本文,ca=正解記号,cc=正解本文,n=試行回数,at=回答時刻'},questions,attempts};
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
});
