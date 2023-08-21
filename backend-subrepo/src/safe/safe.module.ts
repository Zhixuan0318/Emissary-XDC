import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SafeController } from './safe.controller';
import { SafeSchema } from './safe.schema';
import { SafeService } from './safe.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'safe', schema: SafeSchema }])],
    controllers: [SafeController],
    providers: [SafeService],
    exports: [SafeService]
})
export class SafeModule { }
