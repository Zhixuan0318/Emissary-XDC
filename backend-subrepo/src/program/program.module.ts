import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { ProgramSchema } from './program.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'program', schema: ProgramSchema }])],
    controllers: [ProgramController],
    providers: [ProgramService],
    exports: [ProgramService]
})
export class ProgramModule { }
