import { useQuery } from "react-query";
import { BusinessData } from "../types/businessInterface";
// import { store } from "../store"; // Import the store
import { useDispatch } from "react-redux";
import { ActionType } from "../types/actionTypes";
import { fetchBusinessesApi } from "../store/sagas/businessesSaga";

// const fetchBusinesses = async (
//   query: string,
//   page: number,
//   pageSize: number
// ): Promise<APIResponse> => {
//   const formattedQuery = encodeURIComponent(query); // Format the query for URL inclusion
//   const url = `https://recherche-entreprises.api.gouv.fr/search?q=${formattedQuery}&page=${page}&per_page=${pageSize}`;

//   const response = await fetch(url, {
//     headers: {
//       Accept: "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }

//   const data: APIResponse = await response.json();
//   //   console.log(data);

//   return data;
// };

// export const useBusinesses = (query: string) => {
//   return useQuery<BusinessData[], Error>(
//     ["businesses", query],
//     async () => {
//       const data = await fetchBusinesses(query);
//       console.log("Store State:", store.getState()); // Log store state when fetching data
//       return data;
//     },
//     {}
//   );
// };

export const useBusinesses = (
  query: string,
  page: number,
  pageSize: number
) => {
  const dispatch = useDispatch();

  return useQuery<BusinessData[], Error>(
    ["businesses", query, page],
    async () => {
      const response = await fetchBusinessesApi(query, page, pageSize);
      dispatch({
        type: ActionType.FETCH_BUSINESSES_SUCCESS,
        payload: {
          results: response.results,
          currentPage: page,
          totalPages: Math.ceil(response.total_results / pageSize),
        },
      });
      return response.results;
    },
    {
      keepPreviousData: true,
    }
  );
};
