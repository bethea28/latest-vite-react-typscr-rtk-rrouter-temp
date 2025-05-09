// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const initialStateService = createApi({
  reducerPath: "initialStateService",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (build) => ({
    getPokemonByName: build.query<any, any>({
      queryFn: async (data) => {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${data.name}`
          );

          // if (!response.ok) {
          //   return {
          //     error: { status: response.status, message: response.statusText },
          //   };
          // }

          const result = await response.json();
          return { data: result };
        } catch (err) {
          return { error: { status: "FETCH_ERROR", message: err.message } };
        }
      },
    }),
    getProducts: build.query<any, { skip: number }>({
      query: (data) => {
        console.log("data get all", data);
        return {
          url: `products?limit=10&&skip=${data.skip}`,
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
export const {
  useGetProductsQuery,
  useAddProductsMutation,
  useGetPokemonByNameQuery,
} = initialStateService;
