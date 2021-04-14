import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: `../${process.env.NODE_ENV}.env` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const user = new DocumentBuilder()
    .setTitle("User API")
    .setDescription("The cats API description")
    .setVersion("1.0")
    .addTag("user")
    .build();
    const userDocument = SwaggerModule.createDocument(app, user, {
      include: [UserModule],
    });
    SwaggerModule.setup("api/user", app, userDocument);

    const authOptions = new DocumentBuilder()
    .setTitle("Auth example")
    .setDescription("The auth API description")
    .setVersion("1.0")
    .addTag("auth")
    .build();

  const authDocument = SwaggerModule.createDocument(app, authOptions, {
    include: [AuthModule],
  });
  SwaggerModule.setup("api/auth", app, authDocument);
  await app.listen(process.env.SERVER_POST);
}
bootstrap();
