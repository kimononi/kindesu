import { oak } from './deps.js';
import * as routes from './routes/mod.js';

const router = new oak.Router();

for await (const route of Object.values(routes)) {
  router.add(route.method, route.path, route.execute);
}

const app = new oak.Application({ proxy: true });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
