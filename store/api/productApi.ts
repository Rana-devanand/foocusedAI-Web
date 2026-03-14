import { smartExpiryApi } from './smartExpiryApi';

export const productApi = smartExpiryApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminProducts: builder.query<any, void>({
      query: () => '/products/admin',
      providesTags: ['Products'],
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useGetAdminProductsQuery } = productApi;
