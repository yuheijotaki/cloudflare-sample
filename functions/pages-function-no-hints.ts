// Pages Functions 版の比較用: /pages-function と同じ 1 秒遅延だが、Link ヘッダーを付けない。
// エッジが学習する材料がないので 103 は出ず、CSS の取得は HTML 到着後に始まる。
const SLOW_HTML = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="stylesheet" href="/styles.css" />
    <title>Early Hints 検証 (Pages Function, Link なし)</title>
  </head>
  <body>
    <h1>Early Hints 検証 (Pages Function, Link なし)</h1>
    <p>この HTML は Pages Function 側で 1 秒待ってから返しています。Link ヘッダーは付けていません。</p>
  </body>
</html>`;

export const onRequest: PagesFunction = async () => {
  await new Promise((r) => setTimeout(r, 1000));
  return new Response(SLOW_HTML, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
};
