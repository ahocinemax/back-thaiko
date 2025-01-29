import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StripeModule } from './stripe/stripe.module';
import { ProductsModule } from './product/products.module';

@Module({
  imports: [StripeModule, UserModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
