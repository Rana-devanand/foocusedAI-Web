import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const smartExpiryApi = createApi({
  reducerPath: 'smartExpiryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_EXPIRELY_API_URL || 'https://expirely-backend.vercel.app/api',
    prepareHeaders: (headers) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Stats', 'Charts', 'Users', 'Products', 'Notifications', 'Testers', 'Reports'],
  keepUnusedDataFor: 300,
  endpoints: () => ({}),
});
