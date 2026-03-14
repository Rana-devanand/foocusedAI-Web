import { smartExpiryApi } from './smartExpiryApi';

export const testerApi = smartExpiryApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTesters: builder.query<any, void>({
      query: () => '/tester',
      providesTags: ['Testers'],
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useGetAllTestersQuery } = testerApi;
