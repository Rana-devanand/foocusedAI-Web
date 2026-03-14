import { smartExpiryApi } from './smartExpiryApi';

export const dashboardApi = smartExpiryApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<any, void>({
      query: () => '/dashboard/stats',
      providesTags: ['Stats'],
      transformResponse: (response: any) => response.data,
    }),
    getCharts: builder.query<any, void>({
      query: () => '/dashboard/charts',
      providesTags: ['Charts'],
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useGetStatsQuery, useGetChartsQuery } = dashboardApi;
