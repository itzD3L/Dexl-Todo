import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const todoAdapter = createEntityAdapter({
    sortComparer: (a: any, b: any) => {
        if(a.completed !== b.completed) {
            return a.completed - b.completed // false comes first
        }
        const aTimestamp = new Date(a.createdAt).getTime();
        const bTimestamp = new Date(b.createdAt).getTime();
        return bTimestamp - aTimestamp; // Newest first
    }
});

const initialState = todoAdapter.getInitialState();

export const todoApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query({
            query: () => '/user/todos',
            transformResponse: (responseData: any[]) => {
                const loadedTodos = responseData.map(todo => {
                    todo.id = todo._id;
                    return todo;
                });
                return todoAdapter.setAll(initialState, loadedTodos);
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
        addNewTodo: builder.mutation({
            query: initialTodo => ({
                url: '/user/todos',
                method: 'POST',
                body: {
                    ...initialTodo
                }
            }),
            invalidatesTags: [{ type: 'Todo', id: 'LIST' }]
        }),
        editTodo: builder.mutation({
            query: initialTodo => ({
                url: `/user/todos`,
                method: 'PUT',
                body: {
                    ...initialTodo
                }
            }),
            invalidatesTags : (_, __, arg) => [
                { type: 'Todo', id: arg.id }
            ]
        }),
        markTodo: builder.mutation({
            query: ({ _id, userId }) => ({
                url: '/user/todos',
                method: 'PATCH',
                body: {
                    _id,
                    userId
                }
            }),
            invalidatesTags: (_, __, arg) => [
                { type: 'Todo', id: arg.id }
            ]
        }),
        deleteTodo: builder.mutation({
            query: ({ _id, userId }) => ({
                url: '/user/todos',
                method: 'DELETE',
                body: {
                    _id,
                    userId
                }
            }),
            invalidatesTags: (_, __, arg) => [
                { type: 'Todo', id: arg.id }
            ]
        })
    })
})

export const {
    useGetTodosQuery,
    useAddNewTodoMutation,
    useEditTodoMutation,
    useMarkTodoMutation,
    useDeleteTodoMutation
} = todoApiSlice;

// // returns the query result object
// export const selectTodosResult = todoApiSlice.endpoints.getTodos.select({});

// // creates memorized selector
// const selectTodosData = createSelector(
//     selectTodosResult,
//     todosResult => todosResult.data 
// )


// // getSelectors create  these selectors and we rename them with aliases using destructuring
// export const {
//     selectAll: selectAllTodos,
//     selectById: selectTodoById,
//     selectIds: selectTodoIds
//     // pass in selector that returns the state slice of state
// } = todoAdapter.getSelectors((state: any) => selectTodosData(state)) ?? initialState;
