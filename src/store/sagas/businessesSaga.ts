import { call, put, takeLatest } from "redux-saga/effects";
import { ActionType } from "../../types/actionTypes";
import { APIResponse } from "../../types/businessInterface";

export const fetchBusinessesApi = async (
  query: string,
  page: number,
  pageSize: number
): Promise<APIResponse> => {
  const formattedQuery = encodeURIComponent(query);
  const url = `https://recherche-entreprises.api.gouv.fr/search?q=${formattedQuery}&page=${page}&per_page=${pageSize}`;
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export function* fetchBusinesses(action: any): Generator<any, void, any> {
  try {
    const { query, page, pageSize } = action.payload;
    const data: APIResponse = yield call(
      fetchBusinessesApi,
      query,
      page,
      pageSize
    );
    yield put({
      type: ActionType.FETCH_BUSINESSES_SUCCESS,
      payload: {
        results: data.results,
        currentPage: page,
        totalPages: Math.ceil(data.total_results / pageSize),
      },
    });
  } catch (e: any) {
    yield put({
      type: ActionType.FETCH_BUSINESSES_FAILURE,
      message: e.message,
    });
  }
}

export function* updateModifiedBusiness(
  action: any
): Generator<any, void, any> {
  yield put({
    type: ActionType.UPDATE_MODIFIED_BUSINESS,
    payload: action.payload,
  });
}

export function* businessesSaga(): Generator {
  yield takeLatest(ActionType.FETCH_BUSINESSES_REQUEST, fetchBusinesses);
  yield takeLatest(ActionType.UPDATE_MODIFIED_BUSINESS, updateModifiedBusiness);
}

export default businessesSaga;
