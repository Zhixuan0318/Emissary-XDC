import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SafeDocument = Safe & Document;

@Schema()
export class Safe {

    @Prop()
    emissary: string;

    @Prop()
    owner: string;

    @Prop()
    name: string;

    @Prop()
    desc: string;

    @Prop()
    created: string;

    @Prop()
    assets: string;

    @Prop()
    recipient: string;

    @Prop()
    controllers: {
        address: string,
        data: {
            at: string,
            approved: boolean
        }[]
    }[];

    @Prop()
    approver: string;

    @Prop()
    lump_check: boolean;

    @Prop()
    mile_check: boolean;

    @Prop({ type: {} })
    lump_amount: {
        amount: string,
        token: string,
        hash: string,
        approved: number
    };

    @Prop()
    milestones: {
        amount: string,
        token: string,
        hash: string,
        approved: number
    }[];

}

export const SafeSchema = SchemaFactory.createForClass(Safe);

