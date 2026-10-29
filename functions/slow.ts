// Pages Functions 版: /slow の HTML を 1 秒遅らせて返す(Early Hints 検証用)
const SLOW_HTML = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="stylesheet" href="/styles.css" />
    <title>Early Hints 検証 (slow)</title>
  </head>
  <body>
    <h1>Early Hints 検証 (slow)</h1>
    <p>この HTML は Pages Function 側で 1 秒待ってから返しています。</p>
  </body>
</html>`;

export const onRequest: PagesFunction = async () => {
  await new Promise((r) => setTimeout(r, 1000));
  return new Response(SLOW_HTML, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      link: "</styles.css>; rel=preload; as=style",
    },
  });
};
