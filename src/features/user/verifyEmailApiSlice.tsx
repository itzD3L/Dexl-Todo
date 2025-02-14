import { apiSlice } from "../../app/api/apiSlice";

export const verifyEmailApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getVerificationToken: builder.query({
            query: () => '/user/verify-email',
        }),
        verifyEmail: builder.mutation({
            query: token => ({
                url: `/user/verify-email`,
                method: 'POST',
                body: { token }
            })
        })
    })
})

export const {
    useGetVerificationTokenQuery,
    useVerifyEmailMutation
} = verifyEmailApiSlice;