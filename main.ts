import fastify from "fastify";
import devcert from "devcert";

const host = "localhost";
const port = 8080;

async function main() {
  let ssl = await devcert.certificateFor(host);

  const server = fastify({ http2: true, https: ssl });

  server.get("/ping", async (request, reply) => {
    return "pong\n";
  });

  server.listen({ port }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ` + `https://${host}:${port}`);
  });
}

main();
