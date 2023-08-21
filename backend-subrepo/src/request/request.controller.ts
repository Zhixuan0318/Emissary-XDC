import { Controller, Get, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
    constructor(private readonly requestService: RequestService) { }

    @Post()
    create(@Body() data) {
        return this.requestService.create(data);
    }

    @Get()
    findAll() {
        return this.requestService.findAll();
    }

    @Get(':owner')
    findOne(@Param('owner') owner: string) {
        return this.requestService.findByOwner(owner);
    }

    @Get('/one/:id')
    findOneById(@Param('id') id: string) {
        return this.requestService.findById(id);
    }

    @Get('/emissary/:id')
    findOneByEmissary(@Param('id') id: string) {
        return this.requestService.findByEmissary(id);
    }

    @Post('/get')
    findAllByEmissayAndAddress(@Body() data: any) {
        return this.requestService.findAllByEmissayAndAddress(data);
    }

    @Post('/payout')
    Payout(@Body() data: any) {
        return this.requestService.updateById(data._id, data);
    }


    @Put()
    findData(@Body() data: any) {
        return this.requestService.updateById(data._id, data);
    }

    @Delete('/:id')
    deleteById(@Param('id') id: string) {
        return this.requestService.deleteById(id);
    }



}
