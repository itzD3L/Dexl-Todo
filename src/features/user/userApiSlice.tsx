import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const userAdapter = createEntityAdapter({
    sortComparer: (a: any, b: any) => {
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1; // false comes first
        }

        // Secondary sorting: createdAt (latest first)
        return b.createdAt.localeCompare(a.createdAt);
    }
});

const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/user',
            keepUnusedDataFor: 5,
            transformResponse: (responseData: any[]) => {
                const loadedTodos = responseData.map(todo => {
                    todo.id = todo._id;
                    return todo;
                });
                return userAdapter.setAll(initialState, loadedTodos);
            },
            providesTags: (result: any, _: any, __: any) => {
                if(result?.ids) {
                    return [
                        { type: 'Todo', id: 'LIST' },
                        ...result.ids.map((id: any) => ({ type: 'Todo', id }))
                    ]
                } else return [{ type: 'Todo', id: 'LIST' }]
            },
        }),
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
    useGetUsersQuery,
    useCreateUserMutation,
} = userApiSlice;

// returns the query result object
export const selectUsersResult = userApiSlice.endpoints.getUsers.select({});

// creates memorized selector
const selectUsersData = createSelector(
    selectUsersResult,
    users => users.data
)

// getSelector create these slectors and we renamee them with aliases uusing destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = userAdapter.getSelectors((state: any) => selectUsersData(state)) ?? initialState;