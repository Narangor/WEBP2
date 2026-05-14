import { Document } from 'mongoose';
export type CountryDocument = Country & Document;
export declare class Country {
    alpha3Code: string;
    name: string;
    region: string;
    capital: string;
    population: number;
    flagUrl: string;
}
export declare const CountrySchema: import("mongoose").Schema<Country, import("mongoose").Model<Country, any, any, any, any, any, Country>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Country, Document<unknown, {}, Country, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Country & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    alpha3Code?: import("mongoose").SchemaDefinitionProperty<string, Country, Document<unknown, {}, Country, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Country & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, Country, Document<unknown, {}, Country, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Country & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    region?: import("mongoose").SchemaDefinitionProperty<string, Country, Document<unknown, {}, Country, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Country & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    capital?: import("mongoose").SchemaDefinitionProperty<string, Country, Document<unknown, {}, Country, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Country & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    population?: import("mongoose").SchemaDefinitionProperty<number, Country, Document<unknown, {}, Country, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Country & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    flagUrl?: import("mongoose").SchemaDefinitionProperty<string, Country, Document<unknown, {}, Country, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Country & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Country>;
