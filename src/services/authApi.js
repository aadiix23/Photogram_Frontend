
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const authApi = createApi({
    reducerPath: 'authApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://photogram-backend-xp7b.onrender.com',
        prepareHeaders: async (headers) => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),

    endpoints: (builder) => ({
        sendOtp: builder.mutation({
            query: (data) => ({
                url: '/auth/send-otp',
                method: 'POST',
                body: data,
            }),
        }),

        verifyOtp: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: data,
            }),
        }),

        getFiles: builder.query({
            query: () => '/files',
            transformResponse: (response) => {
                const baseUrl = 'https://photogram-backend-xp7b.onrender.com';

                const extractFilesArray = (data, depth = 0) => {
                    if (depth > 5 || data == null) return [];
                    if (Array.isArray(data)) return data;
                    if (typeof data !== 'object') return [];

                    if (Array.isArray(data.files)) return data.files;

                    for (const key of Object.keys(data)) {
                        const found = extractFilesArray(data[key], depth + 1);
                        if (Array.isArray(found) && found.length >= 0) {
                            if (Array.isArray(data[key]?.files)) return data[key].files;
                        }
                        if (Array.isArray(found) && found.length > 0) return found;
                    }

                    return [];
                };

                const rawData = response;
                const parsedData = typeof rawData === 'string' ? (() => {
                    try {
                        return JSON.parse(rawData);
                    } catch {
                        return null;
                    }
                })() : rawData;

                const apiFiles = Array.isArray(parsedData?.files) ? parsedData.files : [];

                return apiFiles
                    .filter((f) => {
                        const mime = (f?.mimeType || '').toLowerCase();
                        const isImage = !mime || mime.startsWith('image/');
                        return Boolean(f?.viewUrl) && isImage;
                    })
                    .map((f) => ({
                        id: f.id,
                        uri: `${baseUrl}${f.viewUrl}`,
                        fileName: f.fileName,
                        uploadedAt: f.uploadedAt,
                    }));
            },
        }),
        uploadFile: builder.mutation({
            query: (formData) => ({
                url: '/files/upload',
                method: 'POST',
                body: formData,
            }),
        }),
        getProfile: builder.query({
            query: () => '/user/profile',
            transformResponse: (response) => response.user,
        }),
    }),
});

export const {
    useSendOtpMutation,
    useVerifyOtpMutation,
    useGetFilesQuery,
    useUploadFileMutation,
    useGetProfileQuery,
} = authApi;

