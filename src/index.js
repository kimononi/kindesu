import { oak } from './deps.js';

const router = new oak.Router();

const dir = Array.from(Deno.readDirSync(Deno.cwd() + '/src/events'))
  .filter(file => file.name.endsWith('.js'));
Promise.all(dir.map(file => import(`./events/${file.name}`)))
  .then(console.log);

const app = new oak.Application({ proxy: true });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
