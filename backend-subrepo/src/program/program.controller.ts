import { Controller, Get, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common';
import { ProgramService } from './program.service';


@Controller('program')
export class ProgramController {
    constructor(private readonly programService: ProgramService) { }

    @Post()
    create(@Body() data) {
        return this.programService.create(data);
    }

    @Get()
    findAll() {
        return this.programService.findAll();
    }

    @Get(':owner')
    findOne(@Param('owner') owner: string) {
        return this.programService.findByOwner(owner);
    }

    @Get('/one/:id')
    findOneById(@Param('id') id: string) {
        return this.programService.findById(id);
    }

    @Get('/emissary/:id')
    findOneByEmissary(@Param('id') id: string) {
        return this.programService.findByEmissary(id);
    }

    @Post('/get')
    findAllByEmissayAndAddress(@Body() data: any) {
        return this.programService.findAllByEmissayAndAddress(data);
    }

    @Put()
    findData(@Body() data: any) {
        return this.programService.updateById(data._id, data);
    }

    @Delete('/:id')
    deleteById(@Param('id') id: string) {
        return this.programService.deleteById(id);
    }



}
