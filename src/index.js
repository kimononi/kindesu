import { oak } from './deps.js';
import routes from './routes/mod.js';

const router = new oak.Router();

// 

const app = new oak.Application({ proxy: true });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 80 });
