import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmissaryDocument } from './emissary.schema';

@Injectable()
export class EmissaryService {
    constructor(@InjectModel('emissary') private readonly model: Model<EmissaryDocument>) { }

    async create(data: any) {
        return await new this.model({ ...data }).save();
    }

    async findAll() {
        return await this.model.find().exec();
    }

    async findOne() {
        return await this.model.find().sort({ _id: -1 }).limit(1).exec();
    }

    async update(owner, data) {
        return await this.model.findOneAndUpdate(owner, data, { new: true }).exec();
    }

    async updateById(_id, data) {
        return await this.model.findByIdAndUpdate(_id, data, { new: true }).exec();
    }

    async findByOwner(owner) {
        // return await this.model.findByOne(owner).exec();
        return await this.model.findOne({ owner }).exec();
    }

    async findByName(domain) {
        // return await this.model.findByOne(owner).exec();
        return await this.model.findOne({ domain }).exec();
    }

    async findByCode(code) {
        // return await this.model.findByOne(owner).exec();
        return await this.model.findOne({ code }).exec();
    }

    async findById(_id) {
        return await this.model.findById({ _id }).exec();
    }

}
