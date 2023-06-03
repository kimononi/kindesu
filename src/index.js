import { oak } from './deps.js';

const router = new oak.Router();

for await (const file of Deno.readDir(Deno.cwd() + '/src/routes')) {
  const { default: route } = await import(`./routes/${file.name}`);
  router.add(route.method, route.path, route.execute);
}

const app = new oak.Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
