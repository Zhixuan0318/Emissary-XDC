import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProgramDocument = Program & Document;

@Schema()
export class Program {

    @Prop()
    owner: string;

    @Prop()
    emissary: string;

    @Prop()
    name: string;   

    @Prop()
    created: string;  

    @Prop({ type: {} })
    program: {
        program: boolean,
        contract_p: string,
        network_p: string,
    };

    @Prop({ type: {} })
    redemption: {
        redemption: boolean,
        title: string,
        desc: string,
        symbol: string,
        img: string,
        network_r: string,
    };

    @Prop({ type: {} })
    submission: {
        submission: boolean,
        contract_s: string,
        network_s: string,
        amount: string
    };

}

export const ProgramSchema = SchemaFactory.createForClass(Program);

