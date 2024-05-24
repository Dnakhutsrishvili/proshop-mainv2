import {USERS_URL} from "../constants";
import { apiSlice } from "./apiSlice";
export const usersApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/auth`,
                method:'POST',
                body:data,
                
            }),
            keepUnusedDataFor:5
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}`,
                method:'POST',
                body:data,
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST',
            }),
            keepUnusedDataFor:5
        }),

        getusers:builder.query({
            query:()=>({
                url:USERS_URL
            }),
            providesTags:['Users'],
            keepUnusedDataFor:5
        }),
        
        deleteUser:builder.mutation({
            query:(userId)=>({
                url:`${USERS_URL}/${userId}`,
                method:'DELETE',
            }),
        }),
        getUserDetails:builder.query({
            query:(userId)=>({
                url:`${USERS_URL}/${userId}`,
            }),
            keepUnusedDataFor:5,
        }),

        updateUser:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/${data.userId}`,
                method:'PUT',
                body:data,
            }),
            invalidatesTags:['User'],
        })
    }),
})



export const {
    useLoginMutation,
    useLogoutMutation ,
    useRegisterMutation,
    useGetusersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation
} = usersApiSlice;