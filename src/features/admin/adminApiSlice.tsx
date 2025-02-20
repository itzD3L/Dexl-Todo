import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const userAdapter = createEntityAdapter({
    sortComparer: (a: any, b: any) => {
        return (b.status === a.status) ? 0 : a.status ? -1 : 1
    }
})

const initialState = userAdapter.getInitialState();

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/user',
            transformResponse: (responseData: any[]) => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id;
                    
                    return user
                });
                return userAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result: any, _: any, __: any) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map((id: any) => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        })
    })
})

export const {
    useGetUsersQuery,
} = adminApiSlice;