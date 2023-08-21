import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmissaryService } from './emissary.service';
import { EmissarySchema } from './emissary.schema';
import { EmissaryController } from './emissary.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'emissary', schema: EmissarySchema }])],
    controllers: [EmissaryController],
    providers: [EmissaryService],
    exports: [EmissaryService]
})
export class EmissaryModule { }
