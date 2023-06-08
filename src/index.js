import {
  Application,
  Router
} from 'oak/mod.ts';
import * as routes from './routes/mod.js';

const router = new Router();

for (const route of Object.values(routes)) {
  router.add(route.method, route.path, route.execute);
};

const app = new Application({ proxy: true });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
// listening to 8080
