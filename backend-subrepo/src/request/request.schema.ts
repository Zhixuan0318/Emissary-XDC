import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RequestDocument = Request & Document;

@Schema()
export class Request {

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
        program: string,
        pid: string, 
    };

    @Prop({ type: {} })
    amount: {
        amount: string,
        token: string, 
    };

    @Prop()
    state: string;  

    @Prop()
    hash: string;  

}

export const RequestSchema = SchemaFactory.createForClass(Request);

