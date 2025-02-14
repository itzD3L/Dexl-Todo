import { apiSlice } from '../../app/api/apiSlice';
import { logOut, setCredentials } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints : builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: currentTabId => ({
                url: '/auth/logout',
                method: 'POST',
                body: {
                    ...currentTabId
                }
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    //const { data } = await queryFulfilled;
                    await queryFulfilled;
                    //console.log(data);
                    dispatch(logOut());
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000);
                } catch (err) {
                    console.error('Logout failed:', err);
                }
            }
        }),
        refresh: builder.mutation({
            query: currentTabId => ({
                url: `/auth/refresh?currentTabId=${currentTabId}`,
                method: 'GET'
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    const { data} = await queryFulfilled;
                    const { fastKey } = data;
                    dispatch(setCredentials({ fastKey }));
                } catch (err) {
                    console.error('Refresh failed:', err);
                }
            }
        })
    })
});

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation
} = authApiSlice;