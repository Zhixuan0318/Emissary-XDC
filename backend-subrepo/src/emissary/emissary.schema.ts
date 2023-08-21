import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type EmissaryDocument = Emissary & Document;

@Schema()
export class Emissary {

    @Prop()
    owner: string;

    @Prop()
    name: string;

    @Prop()
    domain: string;

    @Prop()
    theme: number;

    @Prop()
    img: string;

    @Prop()
    code: string;

    @Prop()
    assets: {
        name: string,
        img: string,
        address: string
    }[];

    @Prop()
    created: string;

    @Prop()
    controllers: {
        address: string,
        role: string
    }[];

    @Prop({ type: {} })
    nft: {
        everyone: boolean,
        holder: boolean,
        contract: string,
        network: string,
    };

}

export const EmissarySchema = SchemaFactory.createForClass(Emissary);

