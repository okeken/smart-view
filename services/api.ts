import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const smartViewApi = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getAbi: builder.query({
      query: ( {address="",chainId}) => `abi/${address}?chain=${chainId}`, 
      }),
  
  }),
});

export const { useGetAbiQuery } =  smartViewApi;