import {
    CrudFilters,
    CrudOperators,
    CrudSorting,
    DataProvider,
} from "@pankod/refine-core";
import restDataProvider from "@pankod/refine-simple-rest";
import { stringify } from "query-string";
import axios, { AxiosInstance } from "axios";

//TEMP URL
//const API_URL = "https://refine-real-world.herokuapp.com/api";

const API_URL = "https://api.realworld.io/api";

const mapOperator = (operator: CrudOperators): string => {
    switch (operator) {
        case "eq":
            return "";
        default:
            throw new Error(`Operator ${operator} is not supported`);
    }
};

const generateFilter = (filters?: CrudFilters) => {
    const queryFilters: { [key: string]: string } = {};
    if (filters) {
        filters.map((filter) => {
            if (filter.operator !== "or") {
                const { field, operator, value } = filter;

                const mappedOperator = mapOperator(operator);
                queryFilters[`${field}${mappedOperator}`] = value;
            }
        });
    }

    return queryFilters;
};

export const dataProvider = (axios: AxiosInstance): DataProvider => {
    return {
        ...restDataProvider(API_URL, axios),
        getList: async ({ resource, pagination, filters, metaData }) => {
            const url = `${API_URL}/${resource}`;

            // pagination
            const current = pagination?.current || 1;
            const pageSize = pagination?.pageSize || 10;

            const queryFilters = generateFilter(filters);

            // current 20
            // offset: 0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200
            const query: {
                _start: number;
                _end: number;
            } = {
                _start: (current - 1) * pageSize,
                _end: current * pageSize,
            };

            const { data } = await axios.get(
                `${url}?${stringify(query)}&${stringify(queryFilters)}`,
            );

            return {
                data: data[metaData?.resource ?? resource],
                total:
                    data[`${metaData?.resource ?? resource}Count`] || undefined,
            };
        },
        getOne: async ({ resource, id, metaData }) => {
            const url = metaData?.getComments
                ? `${API_URL}/${resource}/${id}/comments`
                : `${API_URL}/${resource}/${id}`;

            const { data } = await axios.get(url);

            return {
                data: data[metaData?.resource || resource],
            };
        },
        update: async ({ resource, id, variables, metaData }) => {
            const url = metaData?.resource
                ? `${API_URL}/${resource}/${id}/${metaData.resource}`
                : `${API_URL}/${resource}/${id}`;

            const { data } = metaData?.resource
                ? await axios.post(url)
                : await axios.put(url, variables);

            return {
                data,
            };
        },

        deleteOne: async ({ resource, id, variables, metaData }) => {
            const url = metaData?.resource
                ? `${API_URL}/${resource}/${id}/${metaData.resource}`
                : `${API_URL}/${resource}/${id}`;

            const { data } = await axios.delete(url, variables);

            return {
                data,
            };
        },
    };
};
