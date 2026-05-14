import { Document } from 'mongoose';
export type TravelPlanDocument = TravelPlan & Document;
export declare class TravelPlan {
    title: string;
    startDate: Date;
    endDate: Date;
    destinationCountryCode: string;
}
export declare const TravelPlanSchema: import("mongoose").Schema<TravelPlan, import("mongoose").Model<TravelPlan, any, any, any, any, any, TravelPlan>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TravelPlan, Document<unknown, {}, TravelPlan, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TravelPlan & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, TravelPlan, Document<unknown, {}, TravelPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPlan & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    startDate?: import("mongoose").SchemaDefinitionProperty<Date, TravelPlan, Document<unknown, {}, TravelPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPlan & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    endDate?: import("mongoose").SchemaDefinitionProperty<Date, TravelPlan, Document<unknown, {}, TravelPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPlan & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    destinationCountryCode?: import("mongoose").SchemaDefinitionProperty<string, TravelPlan, Document<unknown, {}, TravelPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPlan & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, TravelPlan>;
