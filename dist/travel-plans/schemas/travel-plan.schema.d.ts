import { Document, Types } from 'mongoose';
import { Expense } from './expense.schema';
export type TravelPlanDocument = TravelPlan & Document;
export declare class TravelPlan {
    userId: Types.ObjectId;
    title: string;
    startDate: Date;
    endDate: Date;
    destinationCountryCode: string;
    expenses: Expense[];
}
export declare const TravelPlanSchema: import("mongoose").Schema<TravelPlan, import("mongoose").Model<TravelPlan, any, any, any, any, any, TravelPlan>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TravelPlan, Document<unknown, {}, TravelPlan, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TravelPlan & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, TravelPlan, Document<unknown, {}, TravelPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPlan & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, TravelPlan, Document<unknown, {}, TravelPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPlan & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    startDate?: import("mongoose").SchemaDefinitionProperty<Date, TravelPlan, Document<unknown, {}, TravelPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPlan & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    endDate?: import("mongoose").SchemaDefinitionProperty<Date, TravelPlan, Document<unknown, {}, TravelPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPlan & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    destinationCountryCode?: import("mongoose").SchemaDefinitionProperty<string, TravelPlan, Document<unknown, {}, TravelPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPlan & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    expenses?: import("mongoose").SchemaDefinitionProperty<Expense[], TravelPlan, Document<unknown, {}, TravelPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TravelPlan & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, TravelPlan>;
