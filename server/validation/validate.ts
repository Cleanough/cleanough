import { NextRequest } from "next/server";
import Joi from "joi";

export function validate(
    request: NextRequest,
    body: any | null,
    params: object,
    {
        bodySchema,
        paramsSchema,
        searchParamsSchema
    }: {
        bodySchema?: Joi.ObjectSchema<any>;
        paramsSchema?: Joi.ObjectSchema<any>;
        searchParamsSchema?: Joi.ObjectSchema<any>;
    }
) {
    const searchParams: Record<string, string | null> = {};
    if (bodySchema) {
        const { error } = bodySchema.validate(body);
        if (error) return { error };
    }

    if (paramsSchema) {
        const { error } = paramsSchema.validate(params);
        if (error) return { error };
    }

    if (searchParamsSchema) {
        const schemaDescription = searchParamsSchema.describe();
        const searchParamsKey: string[] = Object.keys(schemaDescription.keys);

        for (const key of searchParamsKey) {
            const value = request.nextUrl.searchParams.get(key);
            if (value) {
                searchParams[key] = value;
            }
        }

        const { error } = searchParamsSchema.validate(searchParams);
        if (error) return { error };
    }

    return {
        error: null,
        body,
        searchParams
    };
}
