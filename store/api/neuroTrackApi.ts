import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const neuroTrackApi = createApi({
  reducerPath: 'neuroTrackApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_NEUROTRACK_API_URL || 'https://focused-ai-be.vercel.app/api',
    prepareHeaders: (headers) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Emails', 'Subscriptions', 'Testers', 'Verification'],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getNTEmails: builder.query<any, { page?: number; limit?: number; search?: string }>({
      query: (params) => ({
        url: '/admin/emails',
        params,
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ['Emails'],
    }),
    getNTSubscriptions: builder.query<any, { page?: number; limit?: number; search?: string }>({
      query: (params) => ({
        url: '/admin/subscriptions',
        params,
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ['Subscriptions'],
    }),
    getNTTesters: builder.query<any, void>({
      query: () => '/testers',
      transformResponse: (response: any) => response.data,
      providesTags: ['Testers'],
    }),
    getNTVerification: builder.query<any, { skip?: number; limit?: number; status?: string }>({
      query: (params) => ({
        url: '/verification/installers',
        params,
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ['Verification'],
    }),
    updateNTTesterStatus: builder.mutation<any, { id: string; active: boolean }>({
      query: ({ id, ...body }) => ({
        url: `/testers/${id}/status`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Testers'],
    }),
  }),
});

export const {
  useGetNTEmailsQuery,
  useGetNTSubscriptionsQuery,
  useGetNTTestersQuery,
  useGetNTVerificationQuery,
  useUpdateNTTesterStatusMutation,
} = neuroTrackApi;
