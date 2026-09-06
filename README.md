# Pythonデータ分析 模擬トレーナー

スマホ向けの個人用模擬試験アプリです。

- 200問バンク
- 回答直後の正誤・解説
- ブラウザ内に回答履歴を保存
- 分野別正答率・苦手トピック
- 履歴JSONの書き出し / 読み込み
- GitHub Pages / PWA 対応

## Files

- `index.html` — アプリ本体
- `questions.json` — 問題バンクのバックアップ / 編集用
- `manifest.webmanifest` — PWA設定
- `sw.js` — オフラインキャッシュ

回答履歴はGitHubには保存せず、利用端末のブラウザ内 `localStorage` に保存します。
