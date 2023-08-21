import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';  
import { ENVS } from './constant';  
import { EmissaryModule } from './emissary/emissary.module';
import { ProgramModule } from './program/program.module';
import { SafeModule } from './safe/safe.module';
import { RequestModule } from './request/request.module';
 
@Module({
  imports: [ 
    ConfigModule.forRoot(),
    MongooseModule.forRoot(ENVS.MONGO_ROOT),   
    EmissaryModule, 
    ProgramModule,
    SafeModule,
    RequestModule
  ],
  controllers: [AppController],
  providers: [
    AppService,  
  ],
})
export class AppModule  {  }
