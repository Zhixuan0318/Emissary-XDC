import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { RequestSchema } from './request.schema';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'request', schema: RequestSchema }])],
    controllers: [RequestController],
    providers: [RequestService],
    exports: [RequestService]
})
export class RequestModule { }
