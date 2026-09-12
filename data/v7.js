window.QUESTION_BANK=window.QUESTION_BANK||[];

(function(){
  const VERSION='7.0';
  const SOURCE='公式書籍 第3版 4.4 scikit-learn';

  // v7では、従来のscikit-learn問題を履歴保持のため削除せず出題停止にし、
  // 公式書籍のスクリーンショットで確認できた範囲だけの問題へ置き換える。
  for(const q of window.QUESTION_BANK){
    if(q && q.category==='scikit-learn'){
      q.retired=true;
      q.retired_reason='v7公式書籍準拠バンクへ移行';
    }
  }

  const Q=(id,section,topic,difficulty,askMode,text,choices,answer,explanations)=>({
    id,category:'scikit-learn',topic,difficulty,type:'statement',q:text,choices,answer,
    explanation:'公式書籍で扱う範囲に沿って、各選択肢の理由を確認してください。',
    option_explanations:explanations,ask_mode:askMode,format_version:7,question_version:1,
    source_scope:SOURCE,source_section:section,book_aligned:true
  });

  window.QUESTION_BANK.push(
    // 4.4.1 前処理
    Q('Q453','4.4.1 前処理','欠損値','easy','incorrect',
      '欠損値への対応に関する説明として、誤っているものを1つ選んでください。',
      ['欠損している行や列を削除する方法がある','欠損値を平均値などで補完する方法がある','欠損値への対応は、削除か補完が代表的である','欠損値が1つでもあれば、機械学習では必ずそのDataFrame全体を破棄する'],3,
      ['正しい。削除は代表的な対応です。','正しい。補完も代表的な対応です。','正しい。書籍では削除と補完を代表例として扱っています。','誤り。行・列の削除や値の補完など、複数の対応方法があります。']),

    Q('Q454','4.4.1 前処理','SimpleImputer','medium','incorrect',
      'SimpleImputerに関する説明として、誤っているものを1つ選んでください。',
      ['strategy="mean"で平均値による補完を指定できる','fit()で補完に必要な値を学習し、transform()で変換できる','strategyにはmedianやmost_frequentなども指定できる','SimpleImputerは欠損値を見つけると、必ずその行を削除する'],3,
      ['正しい。平均値による補完です。','正しい。fitとtransformの流れで使えます。','正しい。中央値や最頻値なども選べます。','誤り。SimpleImputerは欠損値を補完するためのクラスです。']),

    Q('Q455','4.4.1 前処理','カテゴリ変数','easy','correct',
      'LabelEncoderの説明として、正しいものを1つ選んでください。',
      ['カテゴリを0,1,2のような数値ラベルへ変換できる','連続値を平均0・標準偏差1へ変換する','欠損値を平均値で補完する','複数列を必ず0〜1のダミー変数へ展開する'],0,
      ['正しい。カテゴリ値を数値ラベルへエンコードします。','誤り。それは標準化の説明です。','誤り。それは欠損値補完の説明です。','誤り。それはOne-hotエンコーディングに近い説明です。']),

    Q('Q456','4.4.1 前処理','One-hotエンコーディング','medium','incorrect',
      'One-hotエンコーディングに関する説明として、誤っているものを1つ選んでください。',
      ['カテゴリごとに0/1の列へ展開する方法である','OneHotEncoderを利用できる','カテゴリA,B,Cを、それぞれに対応する複数列で表現できる','カテゴリ値を必ず1本の列の0,1,2へ変換する方法だけを指す'],3,
      ['正しい。カテゴリごとのダミー列を作ります。','正しい。scikit-learnのOneHotEncoderを使えます。','正しい。各カテゴリに対応する列へ展開します。','誤り。それはLabelEncoderのようなラベルエンコーディングに近い説明です。']),

    Q('Q457','4.4.1 前処理','ColumnTransformer','medium','incorrect',
      'ColumnTransformerを使ったOne-hotエンコーディングに関する説明として、誤っているものを1つ選んでください。',
      ['特定の列だけにOneHotEncoderを適用できる','remainder="passthrough"で対象外の列を残す指定ができる','fit_transform()で学習と変換を続けて行える','ColumnTransformerは目的変数yだけを分割するためのクラスである'],3,
      ['正しい。列を指定して変換できます。','正しい。対象外列をそのまま通せます。','正しい。学習と変換をまとめて実行できます。','誤り。複数列に異なる前処理を適用するために使えます。']),

    Q('Q458','4.4.1 前処理','標準化','easy','correct',
      'StandardScalerによる標準化の説明として、正しいものを1つ選んでください。',
      ['特徴量を平均0、標準偏差1を基準とする尺度へ変換する','特徴量を必ず0〜1の範囲へ変換する','カテゴリを文字列から整数へ変換する','欠損行を削除する'],0,
      ['正しい。平均と標準偏差を使う標準化です。','誤り。0〜1への変換はMinMaxScalerの代表的な説明です。','誤り。カテゴリのエンコーディングではありません。','誤り。欠損値削除の処理ではありません。']),

    Q('Q459','4.4.1 前処理','Min-Max正規化','medium','incorrect',
      'MinMaxScalerに関する説明として、誤っているものを1つ選んでください。',
      ['特徴量の最小値と最大値を使って尺度を変換する','既定では0〜1の範囲へ変換する','fit()で最小値・最大値を求め、transform()で変換できる','変換後は必ず平均0・標準偏差1になる'],3,
      ['正しい。最小値と最大値を基準にします。','正しい。既定の範囲は0〜1です。','正しい。fitとtransformの流れで利用できます。','誤り。平均0・標準偏差1はStandardScalerの代表的な変換です。']),

    // 4.4.2 分類
    Q('Q460','4.4.2 分類','学習・テスト分割','easy','correct',
      '分類モデルを学習・評価するときの基本的な流れとして、正しいものを1つ選んでください。',
      ['学習データでfitし、テストデータに対してpredictして評価する','テストデータだけでfitして学習データを予測する','目的変数yを使わずに教師あり分類を学習する','評価前に正解ラベルを予測値で上書きする'],0,
      ['正しい。学習用とテスト用を分けて学習・評価します。','誤り。学習は学習データで行います。','誤り。教師あり分類では目的変数を利用します。','誤り。正解ラベルは評価の基準として残します。']),

    Q('Q461','4.4.2 分類','サポートベクターマシン','medium','incorrect',
      'サポートベクターマシン（SVM）に関する説明として、誤っているものを1つ選んでください。',
      ['分類に利用できる','決定境界の近くにあるデータ点がサポートベクトルとなる','マージンを大きくする考え方が重要である','サポートベクトルは、決定境界から最も遠い点だけを指す'],3,
      ['正しい。書籍では分類アルゴリズムとして扱われています。','正しい。境界を支える重要なデータ点です。','正しい。クラス間のマージンを広く取る考え方です。','誤り。境界に近い重要な点がサポートベクトルです。']),

    Q('Q462','4.4.2 分類','SVM・カーネル','medium','incorrect',
      'SVMのカーネルに関する説明として、誤っているものを1つ選んでください。',
      ['直線で分けにくいデータに対してカーネルを利用できる','RBFカーネルを指定してSVCを利用できる','カーネルを利用することで非線形な境界を扱える','kernel="rbf"を指定すると、必ず直線の決定境界だけになる'],3,
      ['正しい。線形で分けにくい場合にも利用できます。','正しい。書籍の例でもRBFカーネルを利用しています。','正しい。非線形な分類境界を扱うために使えます。','誤り。RBFカーネルは非線形な境界を扱えます。']),

    Q('Q463','4.4.2 分類','SVM・C','medium','incorrect',
      'SVCのパラメータCに関する説明として、誤っているものを1つ選んでください。',
      ['Cの値によって決定境界やマージンの様子が変わることがある','大きいCと小さいCでサポートベクトルの数が変わることがある','書籍ではCを変えた例を比較している','Cは分類するクラス数を直接指定する引数である'],3,
      ['正しい。Cを変えると境界の様子が変わります。','正しい。書籍の比較例でもサポートベクトル数の違いが示されています。','正しい。異なるCの例を比較しています。','誤り。クラス数を指定する引数ではありません。']),

    Q('Q464','4.4.2 分類','決定木','easy','correct',
      '決定木に関する説明として、正しいものを1つ選んでください。',
      ['条件分岐を繰り返してデータを分類する','必ず1本の直線だけで分類する','教師なしクラスタリング専用である','欠損値補完だけを行う'],0,
      ['正しい。特徴量の条件で分岐しながら分類します。','誤り。木構造の分岐で分類します。','誤り。書籍では教師あり分類として扱われています。','誤り。分類モデルです。']),

    Q('Q465','4.4.2 分類','決定木・不純度','medium','incorrect',
      '決定木の不純度に関する説明として、誤っているものを1つ選んでください。',
      ['ノード内のクラスの混ざり具合を表すために使われる','ジニ不純度などが利用される','あるノードが1つのクラスだけで構成されていれば、不純度は小さくなる','不純度が大きいほど、そのノードは必ず1つのクラスだけで構成されている'],3,
      ['正しい。クラスの混ざり具合を表します。','正しい。書籍ではジニ不純度を例に説明しています。','正しい。単一クラスに近いほど純粋です。','誤り。複数クラスが混ざるほど不純度は大きくなります。']),

    Q('Q466','4.4.2 分類','ランダムフォレスト','medium','incorrect',
      'ランダムフォレストに関する説明として、誤っているものを1つ選んでください。',
      ['複数の決定木を利用するアンサンブル学習である','ブートストラップデータを使って複数の木を学習する','分類では複数の木の予測結果から多数決で最終予測を決める','n_estimatorsは決定木の最大深さを指定する引数である'],3,
      ['正しい。複数の木を組み合わせます。','正しい。書籍ではブートストラップデータを使う流れを説明しています。','正しい。分類では多数決を利用します。','誤り。n_estimatorsは構築する決定木の本数です。']),

    // 4.4.3 回帰
    Q('Q467','4.4.3 回帰','回帰の目的','easy','correct',
      '回帰タスクの説明として、正しいものを1つ選んでください。',
      ['住宅価格のような連続値の予測に利用できる','犬か猫かの2クラスだけを予測することを回帰という','クラスタ番号を教師なしで付ける処理だけを回帰という','欠損値を削除する処理を回帰という'],0,
      ['正しい。連続値を目的変数として予測する代表的なタスクです。','誤り。それは分類の代表例です。','誤り。それはクラスタリングです。','誤り。それは前処理です。']),

    Q('Q468','4.4.3 回帰','線形回帰','medium','incorrect',
      '線形回帰に関する説明として、誤っているものを1つ選んでください。',
      ['説明変数と目的変数の線形な関係をモデル化する','LinearRegressionを利用できる','複数の説明変数を扱うことができる','LinearRegressionはカテゴリをOne-hot化するためだけの前処理器である'],3,
      ['正しい。線形な関係をモデル化します。','正しい。scikit-learnのLinearRegressionを利用できます。','正しい。複数の説明変数を扱えます。','誤り。LinearRegressionは回帰モデルです。']),

    Q('Q469','4.4.3 回帰','線形回帰・係数','medium','incorrect',
      '線形回帰式に関する説明として、誤っているものを1つ選んでください。',
      ['説明変数に掛かる値を係数として扱う','定数項を切片として扱う','目的変数を説明変数の線形結合で表す','線形回帰では係数や切片という考え方は使わない'],3,
      ['正しい。各説明変数に係数が掛かります。','正しい。定数項は切片です。','正しい。線形結合として表します。','誤り。係数と切片は線形回帰の基本要素です。']),

    Q('Q470','4.4.3 回帰','学習と予測','medium','incorrect',
      'LinearRegressionの学習と予測に関する説明として、誤っているものを1つ選んでください。',
      ['fit(X_train, y_train)で学習できる','predict(X_test)でテストデータの予測値を得られる','学習用とテスト用にデータを分けて評価できる','predict()を呼ぶだけで、学習していないモデルも自動的にfitされる'],3,
      ['正しい。fitで学習します。','正しい。predictで予測します。','正しい。書籍の例でもtrain_test_splitを利用しています。','誤り。予測前にモデルをfitする必要があります。']),

    Q('Q471','4.4.3 回帰','回帰の可視化','easy','correct',
      '予測値と実測値を散布図にしたとき、予測が実測値に近い場合の見え方として正しいものを1つ選んでください。',
      ['点がy=xの直線付近に集まりやすい','点が必ずx=0の直線だけに並ぶ','点が必ずy=0の直線だけに並ぶ','点の位置は予測精度と一切関係しない'],0,
      ['正しい。予測値と実測値が等しければy=x上に位置します。','誤り。x=0ではありません。','誤り。y=0ではありません。','誤り。散布図から予測と実測のずれを確認できます。']),

    Q('Q472','4.4.3 回帰','分類と回帰','easy','correct',
      '分類と回帰の違いとして、正しいものを1つ選んでください。',
      ['分類はクラス、回帰は連続値を予測するのが代表的である','分類も回帰も必ずクラスタ番号だけを返す','回帰は教師なし学習だけを指す','分類では目的変数を利用できない'],0,
      ['正しい。代表的な違いです。','誤り。分類・回帰の説明ではありません。','誤り。回帰は教師あり学習で利用されます。','誤り。教師あり分類では目的変数を利用します。']),

    Q('Q473','4.4.3 回帰','データ分割','medium','incorrect',
      '回帰モデルの評価に関する説明として、誤っているものを1つ選んでください。',
      ['学習用データでモデルをfitできる','テスト用データに対する予測を確認できる','予測値と実測値を比較できる','モデル評価では、学習データとテストデータを分けてはいけない'],3,
      ['正しい。学習データで学習します。','正しい。テストデータで予測を確認できます。','正しい。予測と実測の比較は評価に使えます。','誤り。書籍の例でも学習用とテスト用へ分割しています。']),

    // 4.4.4 次元削減
    Q('Q474','4.4.4 次元削減','次元削減の目的','easy','correct',
      '次元削減の利用目的として、正しいものを1つ選んでください。',
      ['高次元データを少ない次元へ変換し、可視化や扱いやすさにつなげる','目的変数のクラス数を必ず増やす','欠損値をすべて削除する','決定木の本数を増やす'],0,
      ['正しい。情報をなるべく保ちながら次元を減らす考え方です。','誤り。クラス数を増やす処理ではありません。','誤り。欠損値処理ではありません。','誤り。ランダムフォレストの設定ではありません。']),

    Q('Q475','4.4.4 次元削減','PCA','medium','incorrect',
      '主成分分析（PCA）に関する説明として、誤っているものを1つ選んでください。',
      ['次元削減に利用できる','PCAクラスを利用できる','n_componentsで変換後の主成分数を指定できる','PCAは分類ラベルを予測するためだけの分類器である'],3,
      ['正しい。PCAは代表的な次元削減手法です。','正しい。sklearn.decompositionのPCAを利用できます。','正しい。残す主成分数を指定できます。','誤り。PCAは次元削減に利用します。']),

    Q('Q476','4.4.4 次元削減','PCA・fit_transform','medium','incorrect',
      'PCA(n_components=2).fit_transform(X)の説明として、誤っているものを1つ選んでください。',
      ['Xを2つの主成分へ変換できる','fitとtransformを続けて行う処理である','変換後のデータを2次元の散布図で確認できる','入力Xのサンプル数を必ず2件に減らす処理である'],3,
      ['正しい。2つの主成分へ変換します。','正しい。学習と変換をまとめて行います。','正しい。PC1とPC2を用いて可視化できます。','誤り。n_components=2は特徴量側の次元数を2へ減らす指定です。']),

    Q('Q477','4.4.4 次元削減','主成分','easy','correct',
      'PCAで得た2つの主成分を散布図で表示するときの説明として、正しいものを1つ選んでください。',
      ['横軸PC1、縦軸PC2のように新しい座標として表示できる','PC1とPC2は必ず元の同じ1列をそのまま複製したものになる','PCA後は散布図を描けない','主成分は必ず教師ラベルを意味する'],0,
      ['正しい。書籍ではPC1とPC2を軸に可視化しています。','誤り。主成分は変換後の新しい軸です。','誤り。2次元へ変換すれば散布図で可視化できます。','誤り。教師ラベルではありません。']),

    Q('Q478','4.4.4 次元削減','次元削減','medium','incorrect',
      '次元削減に関する説明として、誤っているものを1つ選んでください。',
      ['元の特徴量数を減らして表現できる','可視化しやすくなる場合がある','情報をなるべく保ちながら少ない次元へ変換する考え方がある','次元削減は、元データのすべての情報を必ず100%完全保存することを保証する'],3,
      ['正しい。特徴量の次元を減らします。','正しい。2次元などにすると可視化しやすくなります。','正しい。情報をなるべく保つことを意識します。','誤り。次元を減らすため、情報が失われる可能性があります。']),

    Q('Q479','4.4.4 次元削減','PCA','medium','correct',
      'PCAの使い方として、正しいものを1つ選んでください。',
      ['PCA(n_components=2)を作り、fit_transform()で2次元へ変換する','PCAを使うには必ず目的変数yをpredict()へ渡す','PCAはRandomForestClassifierの決定木数を指定する','PCAは欠損値を平均で補完するクラスである'],0,
      ['正しい。書籍の例と同じ基本的な流れです。','誤り。PCAは次元削減です。','誤り。ランダムフォレストとは別の処理です。','誤り。欠損値補完にはSimpleImputerなどを使います。']),

    Q('Q480','4.4.4 次元削減','PCA','medium','incorrect',
      'PCAで2次元へ変換した結果に関する説明として、誤っているものを1つ選んでください。',
      ['各サンプルはPC1とPC2の値を持つ','変換後の2列を散布図のx,yに使える','n_components=2なら2つの主成分を得る','変換後の値は必ず元データの列名と同じ意味を持つ'],3,
      ['正しい。2主成分の座標になります。','正しい。2次元散布図に利用できます。','正しい。2つの主成分へ変換します。','誤り。主成分は元特徴量から得られた新しい軸です。']),

    // 4.4.5 モデルの評価
    Q('Q481','4.4.5 モデルの評価','適合率・再現率','medium','incorrect',
      '分類の評価指標に関する説明として、誤っているものを1つ選んでください。',
      ['適合率は、陽性と予測したもののうち実際に陽性だった割合を見る','再現率は、実際に陽性のものをどれだけ陽性と予測できたかを見る','F1スコアは適合率と再現率をまとめて見る指標である','適合率は、実際の陽性をどれだけ見逃さなかったかだけを表す'],3,
      ['正しい。陽性予測の正しさを見ます。','正しい。実際の陽性を拾えた割合です。','正しい。適合率と再現率を組み合わせた指標です。','誤り。その説明は再現率です。']),

    Q('Q482','4.4.5 モデルの評価','混同行列','easy','correct',
      '混同行列のTP（True Positive）の説明として、正しいものを1つ選んでください。',
      ['実際に陽性で、予測も陽性だった','実際に陰性で、予測は陽性だった','実際に陽性で、予測は陰性だった','実際に陰性で、予測も陰性だった'],0,
      ['正しい。真陽性です。','誤り。これはFPです。','誤り。これはFNです。','誤り。これはTNです。']),

    Q('Q483','4.4.5 モデルの評価','評価指標','medium','incorrect',
      '分類の評価指標に関する説明として、誤っているものを1つ選んでください。',
      ['正解率（accuracy）は予測全体のうち正しく予測できた割合を見る','F1スコアは適合率と再現率に関係する','classification_reportではprecision、recall、f1-scoreなどを確認できる','accuracyは回帰の予測誤差を二乗して平均した値である'],3,
      ['正しい。全体に対する正解の割合です。','正しい。適合率と再現率をまとめて評価します。','正しい。代表的な分類指標を一覧で確認できます。','誤り。それは分類の正解率の説明ではありません。']),

    Q('Q484','4.4.5 モデルの評価','交差検証','easy','correct',
      '10分割交差検証の説明として、正しいものを1つ選んでください。',
      ['データを10分割し、評価に使う部分を入れ替えながら複数回評価する','特徴量を必ず10列へ減らす','クラス数を10種類へ増やす','10個のテストデータを同時に学習データへ混ぜる'],0,
      ['正しい。評価用の分割を入れ替えながら繰り返します。','誤り。特徴量数を変える処理ではありません。','誤り。クラス数とは関係ありません。','誤り。交差検証は分割して学習・評価を繰り返します。']),

    Q('Q485','4.4.5 モデルの評価','cross_val_score','medium','incorrect',
      'cross_val_scoreに関する説明として、誤っているものを1つ選んでください。',
      ['交差検証による複数回の評価値を得るために使える','cv=10で10分割交差検証を指定できる','scoringでprecisionなどの評価指標を指定できる','cross_val_scoreは欠損値を平均値で補完するための関数である'],3,
      ['正しい。各foldの評価値を得られます。','正しい。分割数を指定できます。','正しい。評価指標を指定できます。','誤り。モデルの交差検証評価に使う関数です。']),

    Q('Q486','4.4.5 モデルの評価','ROC・AUC','medium','incorrect',
      'ROC曲線とAUCに関する説明として、誤っているものを1つ選んでください。',
      ['ROC曲線は横軸に偽陽性率、縦軸に真陽性率を取る','AUCはROC曲線の下の面積を表す','AUCが1に近いほど識別性能が高いと解釈できる','ROC曲線の横軸は適合率である'],3,
      ['正しい。FPRとTPRを用います。','正しい。Area Under the Curveです。','正しい。一般に1に近いほど良い識別性能です。','誤り。横軸は偽陽性率です。']),

    Q('Q487','4.4.5 モデルの評価','ROC・AUC','medium','incorrect',
      'AUCに関する説明として、誤っているものを1つ選んでください。',
      ['roc_auc_scoreでAUCを計算できる','ROC曲線は予測確率のしきい値を変えたときの性能を確認する考え方である','AUCが0.5付近ならランダムな判定に近いと考えられる','AUCは大きいほど必ず回帰の平均絶対誤差が大きいことを表す'],3,
      ['正しい。AUC計算に利用できます。','正しい。しきい値を変えたときのFPRとTPRを見ます。','正しい。0.5付近はランダムに近い識別です。','誤り。AUCは分類の識別性能に関する指標です。']),

    // 4.4.6 ハイパーパラメータの最適化
    Q('Q488','4.4.6 ハイパーパラメータの最適化','GridSearchCV','easy','correct',
      'GridSearchCVの主な用途として、正しいものを1つ選んでください。',
      ['複数のハイパーパラメータ候補を交差検証しながら比較する','欠損値を削除する','PCAで主成分を計算する','散布図を描画する'],0,
      ['正しい。候補を比較して良い設定を探します。','誤り。欠損値処理ではありません。','誤り。PCAとは別の処理です。','誤り。可視化関数ではありません。']),

    Q('Q489','4.4.6 ハイパーパラメータの最適化','best_params_','medium','incorrect',
      'GridSearchCVのbest_params_に関する説明として、誤っているものを1つ選んでください。',
      ['探索で選ばれた最良のハイパーパラメータを確認できる','決定木のmax_depthなどの結果を確認できる','属性として参照できる','テストデータの全予測値そのものを格納する属性である'],3,
      ['正しい。最良パラメータを確認できます。','正しい。書籍の例ではmax_depthが確認されています。','正しい。best_params_属性を参照します。','誤り。予測値ではなく、選ばれたパラメータです。']),

    Q('Q490','4.4.6 ハイパーパラメータの最適化','best_estimator_','medium','incorrect',
      'GridSearchCVのbest_estimator_に関する説明として、誤っているものを1つ選んでください。',
      ['探索後の最適なモデルを確認できる','書籍の例ではDecisionTreeClassifierの最適モデルを確認している','best_estimator_を参照すると最適な推定器を確認できる','best_estimator_はROC曲線の横軸を返す属性である'],3,
      ['正しい。最適な推定器を確認できます。','正しい。決定木の例で扱われています。','正しい。属性として確認できます。','誤り。ROCの横軸を返すものではありません。']),

    Q('Q491','4.4.6 ハイパーパラメータの最適化','GridSearchCV','medium','incorrect',
      'GridSearchCVで探索後に予測する流れとして、誤っているものを1つ選んでください。',
      ['fit()で探索と学習を行う','best_params_で選ばれた設定を確認できる','best_estimator_で最適モデルを確認できる','predict()は探索前にしか使えず、探索後には利用できない'],3,
      ['正しい。fitで探索を実行します。','正しい。選ばれた設定を確認できます。','正しい。最適な推定器を確認できます。','誤り。探索後のGridSearchCVからpredictできます。']),

    Q('Q492','4.4.6 ハイパーパラメータの最適化','交差検証','easy','correct',
      'ハイパーパラメータの最適化と交差検証の関係として、正しいものを1つ選んでください。',
      ['候補を比較する際に交差検証を利用できる','交差検証はハイパーパラメータ比較には利用できない','交差検証は欠損値補完専用である','交差検証を使うと候補が1つしかなくても必ず無限に増える'],0,
      ['正しい。書籍では交差検証と組み合わせて最適化しています。','誤り。候補比較に利用できます。','誤り。モデル評価の方法です。','誤り。そのような動作ではありません。']),

    Q('Q493','4.4.6 ハイパーパラメータの最適化','GridSearchCV','medium','incorrect',
      'グリッドサーチに関する説明として、誤っているものを1つ選んでください。',
      ['あらかじめ用意した候補を比較して良い設定を探す','モデルのハイパーパラメータを対象にできる','交差検証と組み合わせて評価できる','指定していない無限個の値まで自動的にすべて探索する'],3,
      ['正しい。候補を並べて比較する方法です。','正しい。max_depthなどを対象にできます。','正しい。GridSearchCVは交差検証と組み合わせます。','誤り。用意した候補を基に探索します。']),

    Q('Q494','4.4.6 ハイパーパラメータの最適化','決定木','easy','correct',
      '書籍のGridSearchCVの例で最適化対象として扱われる決定木の設定として、正しいものを1つ選んでください。',
      ['木の深さmax_depth','PCAの主成分数だけ','ROC曲線のAUC値そのもの','LabelEncoderのclasses_'],0,
      ['正しい。決定木の深さを候補から探索する例です。','誤り。書籍の該当例では決定木の深さを扱っています。','誤り。AUC値そのものをハイパーパラメータにはしません。','誤り。カテゴリラベル一覧です。']),

    // 4.4.7 クラスタリング
    Q('Q495','4.4.7 クラスタリング','クラスタリング','easy','correct',
      'クラスタリングの説明として、正しいものを1つ選んでください。',
      ['正解ラベルを使わず、似たデータをグループ分けする教師なし学習である','連続値を予測する回帰だけを指す','正解ラベルを必ず与える教師あり分類だけを指す','欠損値を平均で埋める処理を指す'],0,
      ['正しい。データの類似性を基にグループ化します。','誤り。それは回帰です。','誤り。クラスタリングは教師なし学習です。','誤り。欠損値補完ではありません。']),

    Q('Q496','4.4.7 クラスタリング','k-means','medium','incorrect',
      'k-means法に関する説明として、誤っているものを1つ選んでください。',
      ['あらかじめクラスタ数を指定する','各データを近いクラスタ中心へ割り当てる','クラスタ中心を更新しながら繰り返す','目的変数yの正解ラベルを使って分類境界を学習する'],3,
      ['正しい。kをあらかじめ指定します。','正しい。中心との距離を基に割り当てます。','正しい。割り当てと中心更新を繰り返します。','誤り。k-meansは教師なし学習です。']),

    Q('Q497','4.4.7 クラスタリング','KMeans','medium','incorrect',
      'KMeansの引数に関する説明として、誤っているものを1つ選んでください。',
      ['n_clustersでクラスタ数を指定できる','initで初期クラスタ中心の決め方を指定できる','n_initでk-meansを実行する回数を指定できる','n_clustersは入力データの特徴量数を指定する引数である'],3,
      ['正しい。作成するクラスタ数です。','正しい。初期化方法を指定します。','正しい。複数回実行する回数を指定します。','誤り。特徴量数ではなくクラスタ数です。']),

    Q('Q498','4.4.7 クラスタリング','KMeans','medium','incorrect',
      'KMeansの使い方に関する説明として、誤っているものを1つ選んでください。',
      ['fit_predict(X)で学習と各データのクラスタ割り当てを行える','random_stateを指定して乱数を使う処理を再現しやすくできる','init="k-means++"を初期化方法として指定できる','fit_predict(X)には必ず正解ラベルyも渡さなければならない'],3,
      ['正しい。クラスタリング結果のラベルを得られます。','正しい。再現性を持たせるために利用できます。','正しい。書籍の例でもk-means++を指定しています。','誤り。k-meansは教師なし学習なので、正解ラベルは必須ではありません。']),

    Q('Q499','4.4.7 クラスタリング','階層型クラスタリング','easy','correct',
      '階層型クラスタリングの説明として、正しいものを1つ選んでください。',
      ['近いデータやクラスタを段階的にまとめて階層構造を作る方法がある','必ず目的変数yを使う教師あり分類である','線形回帰の係数を求める手法である','PCAの主成分だけを計算する手法である'],0,
      ['正しい。書籍では階層的にまとめるクラスタリングとして説明しています。','誤り。教師なし学習です。','誤り。回帰ではありません。','誤り。PCAとは別の手法です。']),

    Q('Q500','4.4.7 クラスタリング','AgglomerativeClustering','medium','incorrect',
      'AgglomerativeClusteringに関する説明として、誤っているものを1つ選んでください。',
      ['階層型クラスタリングに利用できる','n_clustersでクラスタ数を指定できる','metricやlinkageを指定できる','DecisionTreeClassifierの木の深さを最適化するためだけのクラスである'],3,
      ['正しい。凝集型の階層クラスタリングです。','正しい。作成するクラスタ数を指定できます。','正しい。書籍の例では距離とlinkageを指定しています。','誤り。クラスタリングのクラスです。']),

    Q('Q501','4.4.7 クラスタリング','クラスタリング','medium','incorrect',
      'k-means法と階層型クラスタリングに関する説明として、誤っているものを1つ選んでください。',
      ['どちらも教師なし学習のクラスタリングに利用できる','k-means法ではクラスタ中心を更新しながら分類する','階層型クラスタリングではデータ間・クラスタ間の距離を利用する考え方がある','どちらも正解クラスyがないと学習を開始できない'],3,
      ['正しい。どちらもクラスタリング手法です。','正しい。中心への割り当てと更新を繰り返します。','正しい。距離に基づいてクラスタをまとめます。','誤り。教師なし学習なので正解ラベルは必須ではありません。'])
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
  window.__BOOK_ALIGNED_SCIKIT=true;
})();

window.addEventListener('load',()=>{
  const VERSION='7.0';
  const SOURCE='公式書籍 第3版 4.4 scikit-learn';
  document.title=`Pythonデータ分析 模擬トレーナー v${VERSION}`;
  const h1=document.querySelector('.top h1');
  if(h1)h1.textContent=`Pythonデータ分析 模擬トレーナー v${VERSION}`;

  const activeBank=window.QUESTION_BANK.filter(q=>!q.retired);
  const retired=window.QUESTION_BANK.filter(q=>q.retired).length;
  const scikitCount=activeBank.filter(q=>q.category==='scikit-learn').length;
  const summary=document.getElementById('bankSummary');
  if(summary)summary.textContent=`${activeBank.length}問・scikit-learnは公式書籍準拠${scikitCount}問・未出題優先・選択肢分散`;
  const counts={};for(const q of activeBank)counts[q.category]=(counts[q.category]||0)+1;
  const sel=document.getElementById('categoryFilter');
  if(sel){
    for(const o of [...sel.options]){
      if(o.value!=='ALL'&&counts[o.value]!=null){
        o.textContent=o.value==='scikit-learn'?`scikit-learn (${counts[o.value]}問・書籍準拠)`:`${o.value} (${counts[o.value]}問)`;
      }
    }
  }

  function stampLatest(before,q){
    const h=loadHistory();
    if(h.length<=before)return;
    const r=h[h.length-1];
    if(!r||r.session_id!==sessionId||r.question_id!==q.id)return;
    r.bank_version=VERSION;
    r.question_version=q.question_version||1;
    r.source_scope=q.source_scope||null;
    saveHistory(h);
  }
  const baseAnswer=window.answer;
  window.answer=function(i,btn){const before=loadHistory().length,q=session[current];const out=baseAnswer(i,btn);stampLatest(before,q);return out;};
  const baseSkip=window.skipQuestion;
  window.skipQuestion=function(){const before=loadHistory().length,q=session[current];const out=baseSkip();stampLatest(before,q);return out;};
  const skipBtn=document.getElementById('skipBtn');if(skipBtn)skipBtn.onclick=window.skipQuestion;

  function analysisPrompt(){
    return 'Python 3 エンジニア認定データ分析試験トレーナーの回答履歴です。v7.0ではscikit-learn問題を公式書籍第3版4.4の確認済み範囲に再構成しています。skipped=trueは「分からない」として強い知識不足シグナルとして扱い、正答率には含めないでください。ask_mode=incorrectは「誤っているものを選ぶ」問題、correctは「正しいものを選ぶ」問題です。source_scopeがある問題は、その資料範囲を超えた知識を前提に問題品質を批判しないでください。question_versionとbank_versionがある場合は改訂前後を混同しないでください。偶然正解の可能性も考慮し、知識不足と問題バンク側の改善点を分けて指摘してください。';
  }
  function payload(){
    const history=loadHistory(),byId=new Map(window.QUESTION_BANK.map(q=>[q.id,q])),used=[...new Set(history.map(r=>r.question_id).filter(Boolean))];
    const questions=used.map(id=>byId.get(id)).filter(Boolean).map(q=>({id:q.id,v:q.question_version||1,c:q.category,t:q.topic,d:q.difficulty,m:q.ask_mode||'correct',q:q.q,o:q.choices,a:q.choices[q.answer],oe:q.option_explanations||null,src:q.source_scope||null,sec:q.source_section||null,retired:Boolean(q.retired)}));
    const attempts=history.map(r=>({q:r.question_id,bv:r.bank_version??null,qv:r.question_version??null,src:r.source_scope??null,m:r.ask_mode??null,c:r.skipped===true?null:Boolean(r.correct),s:r.skipped===true,sa:r.selected_answer??null,sc:r.selected_choice??null,ca:r.correct_answer??null,cc:r.correct_choice??null,n:r.attempt_no??null,at:r.answered_at??null}));
    return{app:`Pythonデータ分析 模擬トレーナー v${VERSION}`,bank_active:activeBank.length,bank_stored:window.QUESTION_BANK.length,retired,scikit_source:SOURCE,exported:new Date().toISOString(),questions,attempts};
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
