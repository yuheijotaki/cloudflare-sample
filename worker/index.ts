// Early Hints 検証用 Worker。
// /worker だけ Worker が先に処理し、HTML の返却を意図的に遅らせる。
// それ以外のパスは Astro のビルド成果物(静的アセット)をそのまま配信する。
interface Env {
  ASSETS: Fetcher;
}

const SLOW_HTML = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="stylesheet" href="/styles.css" />
    <title>Early Hints 検証 (Worker)</title>
  </head>
  <body>
    <h1>Early Hints 検証 (Worker)</h1>
    <p>この HTML は Worker 側で 1 秒待ってから返しています。</p>
  </body>
</html>`;

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/worker") {
      await new Promise((r) => setTimeout(r, 1000));
      return new Response(SLOW_HTML, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
          link: "</styles.css>; rel=preload; as=style",
        },
      });
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
