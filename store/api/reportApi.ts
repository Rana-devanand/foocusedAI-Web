import { smartExpiryApi } from './smartExpiryApi';

export const reportApi = smartExpiryApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminReports: builder.query<any, void>({
      query: () => '/reports',
      providesTags: ['Reports'],
      transformResponse: (response: any) => response.data,
    }),
    exportReport: builder.query<Blob, { type: string; format: string }>({
      query: ({ type, format }) => ({
        url: `/reports/export/${type}/${format}`,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const { useGetAdminReportsQuery, useLazyExportReportQuery } = reportApi;
