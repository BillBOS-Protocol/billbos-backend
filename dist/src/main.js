"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_service_1 = require("./configs/config.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({ origin: '*' });
    await app.listen(config_service_1.configService.getPort(), () => console.log(`server listen on ${config_service_1.configService.getPort()}`));
}
bootstrap();
//# sourceMappingURL=main.js.map