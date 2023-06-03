import { oak } from './deps.js';
import routes from './routes/mod.ts';

const router = new oak.Router();

for await (const { default: route } of Object.values(routes)) {
  router.add(route.method, route.path, route.execute)
};

const app = new oak.Application({ proxy: true });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });