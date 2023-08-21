import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SafeDocument } from './safe.schema';

@Injectable()
export class SafeService {
    constructor(@InjectModel('safe') private readonly model: Model<SafeDocument>) { }

    async create(data: any) {
        return await new this.model({ ...data }).save();
    }

    async findAll() {
        return await this.model.find().exec();
    }

    async update(owner, data) {
        return await this.model.findOneAndUpdate(owner, data, { new: true }).exec();
    }

    async updateById(_id, data) {
        return await this.model.findByIdAndUpdate(_id, data, { new: true }).exec();
    }

    async findByOwner(owner) {
        return await this.model.find({ owner }).exec();
    }
    async findById(_id) {
        return await this.model.findById({ _id }).exec();
    }

    async findAllByEmissayAndAddress(data) {
        return await this.model.find(data).exec();
    }

    async deleteById(_id) {
        return await this.model.findByIdAndDelete({ _id }).exec();
    }

    async findAllByEmissaryAndRecip(data) {
        return await this.model.find(data).exec();
    }

}
