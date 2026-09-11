window.QUESTION_BANK=window.QUESTION_BANK||[];

(function(){
  const VERSION='6.3';
  const Q=(id,category,topic,difficulty,askMode,text,choices,answer,explanations)=>({
    id,category,topic,difficulty,type:'statement',q:text,choices,answer,
    explanation:'各選択肢の正誤と理由を確認してください。',
    option_explanations:explanations,ask_mode:askMode,format_version:6,question_version:1
  });

  window.QUESTION_BANK.push(
    Q('Q411','NumPy','配列生成','medium','incorrect',
      'NumPyの配列生成関数に関する説明として、誤っているものを1つ選んでください。',
      ['np.zeros((2,3)) は要素が0の2行3列配列を作る','np.ones((2,3)) は要素が1の2行3列配列を作る','np.eye(3) は3×3の単位行列を作る','np.full((2,3), 7) は0〜7の乱数で埋めた配列を作る'],3,
      ['正しい。shapeを指定して0で埋めた配列を生成します。','正しい。shapeを指定して1で埋めた配列を生成します。','正しい。主対角成分が1、それ以外が0の配列です。','誤り。np.fullは指定値7で全要素を埋めます。']),

    Q('Q412','NumPy','配列生成','medium','correct',
      'np.linspace(0, 1, 5) の説明として正しいものを1つ選んでください。',
      ['0から1までを両端を含めて等間隔に5点生成する','0以上1未満の乱数を5個生成する','0から1まで0.5刻みで必ず生成する','整数0と1だけを5回繰り返す'],0,
      ['正しい。開始値と終了値を含む等間隔の5点を返します。','誤り。乱数生成ではありません。','誤り。第3引数は刻み幅ではなく点の個数です。','誤り。等間隔の浮動小数点値を生成します。']),

    Q('Q413','NumPy','差分','medium','incorrect',
      'np.diff() に関する説明として、誤っているものを1つ選んでください。',
      ['隣り合う要素同士の差を求めるために使える','1次元配列 [1,4,9] に対する np.diff() は [3,5] になる','元の要素数がnなら1回のdiff後は通常n-1要素になる','np.diff() は配列の平均値だけを返す関数である'],3,
      ['正しい。隣接要素の差分を計算します。','正しい。4-1=3、9-4=5です。','正しい。隣り合う組の数は1つ減ります。','誤り。平均ではなく差分を求めます。']),

    Q('Q414','NumPy','結合','hard','incorrect',
      'np.concatenate() に関する説明として、誤っているものを1つ選んでください。',
      ['複数の配列を既存の軸に沿って結合できる','axis=0 は2次元配列では行方向への結合として使われることが多い','axis=1 は2次元配列では列方向への結合として使われることが多い','np.concatenate() は必ず新しい次元を1つ追加してから結合する'],3,
      ['正しい。既存軸に沿って結合します。','正しい。縦方向へ積むイメージです。','正しい。横方向へつなぐイメージです。','誤り。新しい軸を追加するのはstack系の考え方で、concatenateは既存軸で結合します。']),

    Q('Q415','NumPy','結合','medium','incorrect',
      'np.hstack() と np.vstack() に関する説明として、誤っているものを1つ選んでください。',
      ['hstack は配列を水平方向に結合するために使える','vstack は配列を垂直方向に結合するために使える','2次元配列では hstack は列方向、vstack は行方向へ増えるイメージになる','hstack と vstack は常にまったく同じshapeの結果を返す'],3,
      ['正しい。horizontal stackです。','正しい。vertical stackです。','正しい。2次元ではこのイメージで整理できます。','誤り。結合方向が違うため、結果shapeも通常異なります。']),

    Q('Q416','NumPy','分割','hard','incorrect',
      'np.hsplit() と np.vsplit() に関する説明として、誤っているものを1つ選んでください。',
      ['hsplit は水平方向に区切る、つまり列方向に分割する用途で使える','vsplit は垂直方向に区切る、つまり行方向に分割する用途で使える','分割数と配列shapeの組み合わせによっては均等分割できずエラーになることがある','hsplit は必ず行数を減らし、vsplit は必ず列数を減らす'],3,
      ['正しい。2次元では列を分けるイメージです。','正しい。2次元では行を分けるイメージです。','正しい。均等分割できる条件が必要です。','誤り。hsplitは主に列数側、vsplitは主に行数側を分けます。']),

    Q('Q417','NumPy','shape・変形','medium','correct',
      '2次元配列 a に対する a.T の説明として正しいものを1つ選んでください。',
      ['行と列を入れ替えた転置を得る','全要素をTrueへ変換する','配列を必ず1次元化する','配列の型だけを変更する'],0,
      ['正しい。2次元では行列の転置として理解できます。','誤り。真偽値変換ではありません。','誤り。1次元化はravelなどです。','誤り。dtype変更ではありません。']),

    Q('Q418','NumPy','shape・変形','hard','incorrect',
      'np.newaxis に関する説明として、誤っているものを1つ選んでください。',
      ['インデックス指定の中で新しい軸を追加するために使える','1次元配列 a に a[:, np.newaxis] とすると列ベクトル状の2次元配列にできる','np.newaxis は None と同等に扱える','np.newaxis() のように必ず関数として呼び出す必要がある'],3,
      ['正しい。shapeへ長さ1の軸を追加できます。','正しい。(n,) から (n,1) の形にできます。','正しい。np.newaxisはNoneの別名です。','誤り。関数ではないので丸括弧で呼び出しません。']),

    Q('Q419','NumPy','meshgrid','hard','correct',
      'np.meshgrid(x, y) の代表的な用途として正しいものを1つ選んでください。',
      ['1次元の座標列から2次元格子状の座標配列を作る','2つの配列の内積だけを計算する','配列中の重複値だけを削除する','乱数生成器を作る'],0,
      ['正しい。等高線や関数値計算などで使う格子座標を作れます。','誤り。内積はdotや@などです。','誤り。uniqueの用途です。','誤り。乱数生成はdefault_rngなどです。']),

    Q('Q420','NumPy','集約','hard','incorrect',
      '2次元配列に対する np.mean(a, axis=...) の説明として、誤っているものを1つ選んでください。',
      ['axis=0 では各列について行方向に集約した平均を得る','axis=1 では各行について列方向に集約した平均を得る','axisを指定しなければ通常は全要素の平均を得る','axis=0 は必ず各行の平均を返す'],3,
      ['正しい。行方向をつぶすので列ごとの平均が残ります。','正しい。列方向をつぶすので行ごとの平均が残ります。','正しい。配列全体を対象にします。','誤り。各行の平均は2次元配列では通常axis=1です。']),

    Q('Q421','NumPy','演算・ufunc','hard','incorrect',
      'np.dot() に関する説明として、誤っているものを1つ選んでください。',
      ['1次元配列同士では内積を求める用途で使える','2次元配列同士では行列積として働く','同じshapeの配列の要素ごとの積だけが必要なら * を使える','np.dot(a,b) は配列のshapeに関係なく常に要素ごとの積だけを返す'],3,
      ['正しい。1次元同士なら内積です。','正しい。2次元同士では行列積です。','正しい。要素積は*が明確です。','誤り。dotは次元により内積や行列積として働きます。']),

    Q('Q422','NumPy','条件・真偽','medium','correct',
      'np.count_nonzero(a) の説明として正しいものを1つ選んでください。',
      ['0ではない要素の個数を数える','0だけの個数を数える','配列の次元数を返す','欠損値だけを数える'],0,
      ['正しい。非ゼロ要素数を返します。','誤り。0そのものの個数ではありません。','誤り。次元数はndimなどで確認します。','誤り。欠損値専用の関数ではありません。']),

    Q('Q423','NumPy','条件・真偽','medium','incorrect',
      'np.any() と np.all() に関する説明として、誤っているものを1つ選んでください。',
      ['np.any() は少なくとも1つTrueならTrueになる','np.all() はすべてTrueならTrueになる','条件配列に対して使うことで条件成立の全体判定ができる','np.any() と np.all() はどの入力でも必ず同じ結果になる'],3,
      ['正しい。論理和的な判定です。','正しい。論理積的な判定です。','正しい。配列全体の真偽を集約できます。','誤り。1つでもTrueでよいanyと、すべてTrueが必要なallでは結果が異なります。']),

    Q('Q424','NumPy','条件・真偽','hard','correct',
      'np.allclose(a, b) の用途として正しいものを1つ選んでください。',
      ['浮動小数点の誤差を考慮しながら配列要素が十分近いか判定する','文字列配列を辞書順に並べ替える','すべての要素を0へ近づける','配列のshapeだけを比較する'],0,
      ['正しい。絶対誤差・相対誤差の許容範囲を考慮して比較します。','誤り。並べ替え関数ではありません。','誤り。値を変更する関数ではありません。','誤り。要素値の近さを判定します。']),

    Q('Q425','NumPy','条件・真偽','hard','incorrect',
      'NumPy配列 a, b と値 c に対する条件式に関する説明として、誤っているものを1つ選んでください。',
      ['(a == c) | (b == c) は要素ごとのOR条件として使える','複数条件を | で結ぶときは各比較式を丸括弧で囲む書き方が安全である','NumPy配列の要素ごとのORには | を使える','(a == c) or (b == c) はNumPy配列でも常に要素ごとのORとして問題なく使える'],3,
      ['正しい。同じ位置ごとにどちらかの条件を満たすか判定します。','正しい。演算子の優先順位も含め明確になります。','正しい。配列同士の要素ごとの論理演算に使えます。','誤り。Pythonのorは配列全体の真偽評価を要求し、曖昧としてエラーになることがあります。']),

    Q('Q426','NumPy','乱数・default_rng','medium','incorrect',
      'np.random.default_rng() で作った乱数生成器 rng に関する説明として、誤っているものを1つ選んでください。',
      ['rng.random() は0以上1未満の乱数を生成できる','rng.random((2,3)) のようにshapeをタプルで指定できる','default_rng() は現在推奨されるGeneratorベースの乱数生成で使われる','rng.random(2,3) のようにshapeを複数の位置引数へ分けるのが必須である'],3,
      ['正しい。既定では[0,1)の一様乱数です。','正しい。sizeとしてタプルを渡せます。','正しい。Generatorを返す代表的な入口です。','誤り。randomのsizeは整数またはタプルなどで指定します。']),

    Q('Q427','NumPy','乱数・default_rng','medium','correct',
      'rng = np.random.default_rng(0) としたとき、rng.integers(1, 10) の説明として正しいものを1つ選んでください。',
      ['1以上10未満の整数乱数を生成する','1より大きく10以下の整数だけを生成する','0以上1未満の小数だけを生成する','必ず10を返す'],0,
      ['正しい。既定ではlow以上high未満です。','誤り。下限1は含み、上限10は含みません。','誤り。整数乱数です。','誤り。乱数なので固定値10ではありません。']),

    Q('Q428','NumPy','乱数・default_rng','medium','incorrect',
      'rng.uniform(low, high, size) に関する説明として、誤っているものを1つ選んでください。',
      ['指定範囲の一様分布から乱数を生成できる','lowとhighで範囲を指定できる','sizeで生成する個数やshapeを指定できる','平均0・標準偏差1の標準正規分布だけを生成する'],3,
      ['正しい。一様分布の乱数生成です。','正しい。範囲を指定します。','正しい。出力shapeを指定できます。','誤り。標準正規分布はnormalなどで生成します。']),

    Q('Q429','NumPy','乱数・default_rng','hard','incorrect',
      'rng.normal(loc=10, scale=2, size=100) に関する説明として、誤っているものを1つ選んでください。',
      ['平均10の正規分布から乱数を生成する','標準偏差2の正規分布を指定している','100個の乱数を生成する','分散2の正規分布を指定している'],3,
      ['正しい。locは平均です。','正しい。scaleは標準偏差です。','正しい。size=100です。','誤り。scale=2は標準偏差2なので、分散は4です。']),

    Q('Q430','NumPy','乱数・default_rng','medium','correct',
      'np.random.default_rng(123) のようにseedを指定する主な目的として正しいものを1つ選んでください。',
      ['同じ乱数系列を再現しやすくする','乱数を必ず昇順にする','生成値を必ず整数にする','平均を必ず123にする'],0,
      ['正しい。再現性のある実験に役立ちます。','誤り。並び順を昇順にする指定ではありません。','誤り。乱数の型は利用するメソッドで決まります。','誤り。seedは分布の平均値ではありません。']),

    Q('Q431','pandas','基本確認','medium','incorrect',
      'DataFrameの head(), tail(), shape に関する説明として、誤っているものを1つ選んでください。',
      ['df.head() は先頭の行を確認するために使える','df.tail() は末尾の行を確認するために使える','df.shape は行数と列数を表すタプルを返す','df.shape() のように必ずメソッドとして呼び出す'],3,
      ['正しい。既定では先頭5行です。','正しい。既定では末尾5行です。','正しい。(行数, 列数)です。','誤り。shapeは属性なので丸括弧は不要です。']),

    Q('Q432','pandas','基本確認','medium','correct',
      'df.index と df.columns の説明として正しいものを1つ選んでください。',
      ['df.index は行ラベル、df.columns は列ラベルを確認できる','df.index は列ラベルだけ、df.columns は行ラベルだけを返す','どちらも必ず整数だけを返す','df.column が正式な列名一覧の属性で、df.columns は存在しない'],0,
      ['正しい。indexは行、columnsは列です。','誤り。逆です。','誤り。文字列などのラベルも扱えます。','誤り。列名一覧はdf.columnsです。']),

    Q('Q433','pandas','DataFrame生成','hard','incorrect',
      'pd.DataFrame と np.arange().reshape() を組み合わせたDataFrame生成に関する説明として、誤っているものを1つ選んでください。',
      ['np.arange(20).reshape(4,5) は4行5列の配列になる','columnsに5個の列名を渡せば4行5列のDataFrameを作れる','indexに4個の行ラベルを渡せる','reshape(4,5) の配列へcolumnsを4個だけ指定しても列数不一致にはならない'],3,
      ['正しい。要素数20を4×5へ変形できます。','正しい。配列の5列と列名5個が対応します。','正しい。4行なのでindexも4個指定できます。','誤り。配列の列数5とcolumns数4が一致せずエラーになります。']),

    Q('Q434','pandas','参照','hard','incorrect',
      'df.loc と df.iloc に関する説明として、誤っているものを1つ選んでください。',
      ['locは主にラベルを基準に参照する','ilocは整数位置を基準に参照する','loc[:, ["a","b"]] のように列ラベルを指定できる','ilocでは列名"a"をそのまま位置指定として必ず使う'],3,
      ['正しい。ラベルベースです。','正しい。位置ベースです。','正しい。全行と指定列をラベルで選択できます。','誤り。ilocは整数位置で指定します。']),

    Q('Q435','pandas','入出力','medium','correct',
      'CSVの読み込みと書き出しの組み合わせとして正しいものを1つ選んでください。',
      ['pd.read_csv() で読み込み、df.to_csv() で書き出せる','pd.to_csv() で読み込み、df.read_csv() で書き出す','pd.read_csv() はExcel専用である','df.to_csv() はDataFrameを必ず画像として保存する'],0,
      ['正しい。read_系で読み込み、to_系で書き出す基本形です。','誤り。方向が逆です。','誤り。CSVを読み込みます。','誤り。CSV形式のテキストデータとして保存します。']),

    Q('Q436','pandas','入出力','hard','incorrect',
      'pandasの入出力関数に関する説明として、誤っているものを1つ選んでください。',
      ['pd.read_excel() はExcelファイルの読み込みに使える','pd.read_html() はHTML内の表を読み取る用途で使える','pd.read_pickle() はpickle形式の読み込みに使える','pd.read_csv() はpickle形式だけを読み込む専用関数である'],3,
      ['正しい。Excel読み込み用です。','正しい。HTML中のtableをDataFrameとして読み取る用途があります。','正しい。pickle形式のオブジェクトを読み込めます。','誤り。read_csvはCSVなど区切りテキストの読み込みに使います。']),

    Q('Q437','pandas','抽出・query','medium','correct',
      'df.query("score >= 80") の説明として正しいものを1つ選んでください。',
      ['score列が80以上という条件で行を抽出する用途に使える','score列を必ず削除する','DataFrameを80行に変形する','indexを80へ変更する'],0,
      ['正しい。文字列で条件式を記述して行抽出できます。','誤り。列削除ではありません。','誤り。行数指定ではありません。','誤り。index変更ではありません。']),

    Q('Q438','pandas','日時','hard','incorrect',
      'pandasで文字列の日付列を日時型へ変換する処理に関する説明として、誤っているものを1つ選んでください。',
      ['pd.to_datetime() は文字列などを日時型へ変換するために使える','df["date"] = pd.to_datetime(df["date"]) のように列全体を変換できる','Series.apply(pd.to_datetime) のように適用する書き方も可能である','pd.to_datetime() はDataFrameの列名を変更するための関数である'],3,
      ['正しい。日時変換の代表的関数です。','正しい。列をまとめて変換できます。','正しい。apply経由でも利用できます。','誤り。列名変更ではなく日時への変換です。']),

    Q('Q439','pandas','index','medium','incorrect',
      'df.set_index("date") に関する説明として、誤っているものを1つ選んでください。',
      ['date列をインデックスに設定するために使える','既定では新しいDataFrameを返すため、必要なら代入して使う','inplace=Trueを指定する方法もある','date列の値をすべて昇順に並べ替えることだけを目的とするメソッドである'],3,
      ['正しい。指定列を行ラベルとして使えます。','正しい。既定では元DataFrameを直接変更しません。','正しい。inplace指定も可能です。','誤り。インデックス設定のメソッドであり、単なる並べ替えではありません。']),

    Q('Q440','pandas','並べ替え','medium','correct',
      'df.sort_values(by="score", ascending=False) の説明として正しいものを1つ選んでください。',
      ['score列を基準に降順へ並べ替える','score列を基準に昇順へ並べ替える','score列を削除する','score列をindexにする'],0,
      ['正しい。ascending=Falseは降順です。','誤り。昇順はascending=Trueです。','誤り。dropではありません。','誤り。set_indexではありません。']),

    Q('Q441','pandas','削除','medium','incorrect',
      'DataFrameの drop() に関する説明として、誤っているものを1つ選んでください。',
      ['df.drop(columns=["a"]) のように列を削除できる','行ラベルを指定して行を削除する用途にも使える','削除対象の軸をcolumnsやindexで明示できる','drop() は欠損値NaNを埋めるためだけのメソッドである'],3,
      ['正しい。columnsで列削除できます。','正しい。index側を指定して行削除もできます。','正しい。対象軸を明示できます。','誤り。欠損値を埋める代表的メソッドはfillnaです。']),

    Q('Q442','pandas','日時','hard','incorrect',
      'pd.date_range() に関する説明として、誤っているものを1つ選んでください。',
      ['連続した日時のインデックスを生成するために使える','startやend、periods、freqなどを指定できる','freq="D" は日単位の頻度として使える','DataFrameの数値列を標準化するための関数である'],3,
      ['正しい。DatetimeIndexを生成できます。','正しい。期間や頻度を柔軟に指定できます。','正しい。Dは日次です。','誤り。日時範囲を生成する関数です。']),

    Q('Q443','pandas','groupby・時系列','hard','correct',
      '日時indexを持つDataFrameに対して df.groupby(pd.Grouper(freq="M")) を使う説明として正しいものを1つ選んでください。',
      ['月単位など指定頻度でグループ化・集計する用途に使える','列を必ずアルファベット順へ並べる','すべての欠損値を削除する','NumPy配列へ必ず変換する'],0,
      ['正しい。Grouperで時間頻度を指定したグループ化ができます。','誤り。列順の並べ替えではありません。','誤り。dropnaの用途です。','誤り。NumPy変換のための機能ではありません。']),

    Q('Q444','pandas','欠損値','medium','incorrect',
      'dropna() と fillna() に関する説明として、誤っているものを1つ選んでください。',
      ['dropna() は欠損値を含む行や列を削除するために使える','fillna() は欠損値を指定値などで補完するために使える','欠損値処理では削除と補完を目的に応じて使い分ける','fillna() は欠損値を含む行を必ずすべて削除する'],3,
      ['正しい。axisやhowなども指定できます。','正しい。値や方法を指定して補完できます。','正しい。データや目的に応じて選びます。','誤り。fillnaは削除ではなく補完です。']),

    Q('Q445','pandas','整形・結合','hard','incorrect',
      'pd.concat() に関する説明として、誤っているものを1つ選んでください。',
      ['複数のDataFrameやSeriesを軸に沿って結合できる','axis=0 は行方向へ積み重ねる用途で使われることが多い','axis=1 は列方向へ並べる用途で使われることが多い','pd.concat() は共通キーを指定したSQL形式の結合しかできない'],3,
      ['正しい。複数オブジェクトを連結できます。','正しい。既定もaxis=0です。','正しい。横方向の連結に使えます。','誤り。キー結合専用ではありません。キーに基づく結合はmergeなどが代表的です。']),

    Q('Q446','pandas','参照','hard','incorrect',
      'locのラベルスライスに関する説明として、誤っているものを1つ選んでください。',
      ['ラベルが並んだindexでは df.loc["a":"c"] のように範囲指定できる','locのラベルスライスでは終端ラベルも含まれるのが基本である','ilocの位置スライスではPython通常のスライスと同様に終端位置は含まれない','locとilocのスライスはどちらも必ず終端を含まない'],3,
      ['正しい。ラベル範囲で選択できます。','正しい。locの特徴的な挙動です。','正しい。ilocは通常の位置スライスと同様です。','誤り。locは終端ラベルを含む点がilocと異なります。'])
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
  const VERSION='6.3';
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
