import { smartExpiryApi } from './smartExpiryApi';

export const notificationApi = smartExpiryApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminNotifications: builder.query<any, void>({
      query: () => '/notifications/admin',
      providesTags: ['Notifications'],
      transformResponse: (response: any) => response.data,
    }),
    adminSendNotification: builder.mutation<any, { target: string; message: string; type?: string }>({
      query: (body) => ({
        url: '/notifications/admin/send',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
});

export const { useGetAdminNotificationsQuery, useAdminSendNotificationMutation } = notificationApi;
