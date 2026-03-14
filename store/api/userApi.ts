import { smartExpiryApi } from './smartExpiryApi';

export const userApi = smartExpiryApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<any[], void>({
      query: () => '/users',
      providesTags: ['Users'],
      transformResponse: (response: any) => response.data,
    }),
    updateUserStatus: builder.mutation<any, { userId: string; status: 'active' | 'blocked' }>({
      query: ({ userId, status }) => ({
        url: `/users/${userId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Users', 'Stats'],
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUserStatusMutation } = userApi;
