import app from ".";

Bun.serve({
  port: Bun.env.PORT,
  fetch: app.fetch,
});
