import { Controller, Get, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common';
import { SafeService } from './safe.service';

@Controller('safe')
export class SafeController {
    constructor(private readonly safeService: SafeService) { }

    @Post()
    create(@Body() data) {
        return this.safeService.create(data);
    }

    @Get()
    findAll() {
        return this.safeService.findAll();
    }

    @Get(':owner')
    findOne(@Param('owner') owner: string) {
        return this.safeService.findByOwner(owner);
    }

    @Get('/one/:id')
    findOneById(@Param('id') id: string) {
        return this.safeService.findById(id);
    }

    @Post('/get')
    findAllByEmissayAndAddress(@Body() data: any) {
        return this.safeService.findAllByEmissayAndAddress(data);
    }

    @Put()
    findData(@Body() data: any) {
        return this.safeService.updateById(data._id, data);
    }

    @Delete('/:id')
    deleteById(@Param('id') id: string) {
        return this.safeService.deleteById(id);
    }

    @Post('/getbyrecip')
    findAllByEmissaryAndRecip(@Body() data: any) {
        return this.safeService.findAllByEmissaryAndRecip(data);
    }



}
