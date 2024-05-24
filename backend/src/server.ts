import { env } from "./utils/env";
import { App } from "./infra/http/app";

const app = new App();

app.listen(env.PORT);
