import {fetchBaseQuery,createApi}from '@reduxjs/toolkit/query/react';
import {BASE_URL}from '../constants';

// const baseQuery=fetchBaseQuery({baseUrl:BASE_URL});

export const apiSlice=createApi({
    // baseQuery:baseQuery,
    tagTypes:['Product','Order','User'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState })=> {
            const token = getState().auth.userInfo?.jwt;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    endpoints:(builder)=>({
        
    })
})