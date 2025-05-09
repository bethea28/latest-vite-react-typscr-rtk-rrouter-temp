// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const initialStateService = createApi({
  reducerPath: "initialStateService",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (build) => ({
    // getPokemonByName: builder.query<Pokemon, string>({
    //   query: (name) => `pokemon/${name}`,
    // }),
    getProducts: build.query({
      query: (data) => {
        return {
          url: `products`,
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
      },
    }),
    addProducts: build.mutation({
      query: (data) => {
        return {
          url: `products/add`,
          method: "POST",
          headers: {
            // "Content-Type": "application/x-www-form-urlencoded",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: data.title,
          }),
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useAddProductsMutation } =
  initialStateService;
