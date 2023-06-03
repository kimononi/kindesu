import { oak } from './deps.js';

const router = new oak.Router();

(async () => {
  Promise.all(Array.from(Deno.readDirSync(Deno.cwd() + '/src/events')).map(file => import(`./events/${file.name}`)))
    .then(console.log);
})();

const app = new oak.Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
