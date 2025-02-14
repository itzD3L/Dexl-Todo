import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, setSessionExpired } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://dexl-todo-api.onrender.com',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as { auth: { token: string } }).auth.token;
        
        if(token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
})


const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    //console.log(args) // req url, method, body
    //console.log(api) //  signal, dispatch, getState()
    //console.log(extraOptions) // custom like { shout: true}

    let result = await baseQuery(args, api, extraOptions);

    // If you want, handle other status codes, too
    if(result?.error?.status === 403) {
        const currentTabId = sessionStorage.getItem('currentTabId');
        const refreshResult = await baseQuery(`/auth/refresh?currentTabId=${currentTabId}`, api, extraOptions);

        if(refreshResult.data) {
            
            // store the new token
            api.dispatch(setCredentials({ ...refreshResult.data }));
            
            //retry original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            if(refreshResult.error?.status === 401) {
                
                api.dispatch(setSessionExpired(true))
            }

            if(refreshResult.error?.status === 403) {
                api.dispatch(setSessionExpired(true));
                (refreshResult.error.data as { message: string }).message = 'login expired';
            }
            return refreshResult; 
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery : baseQueryWithReauth,
    tagTypes: ['User', 'Todo'],
    endpoints: () => ({})
})
