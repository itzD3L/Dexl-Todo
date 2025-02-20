import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createUser: builder.mutation({
            query: initialState => ({
                url: '/user',
                method: 'POST',
                body: {
                    ...initialState
                }
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }]
        }),
        // future endpoints here
        // editTodo: builder.mutation({
        // deleteTodo: builder.mutation({
    })
})

export const {
    useCreateUserMutation,
} = userApiSlice;