import { combineReducers } from "redux";
import { ActionType } from "../../types/actionTypes";
import { BusinessData } from "../../types/businessInterface";

interface BusinessesState {
  data: Record<string, BusinessData>;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

interface ModifiedBusinessesState {
  data: Record<string, BusinessData>;
}

const initialState: BusinessesState = {
  data: {},
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
};

const initialModifiedState: ModifiedBusinessesState = {
  data: {},
};

function businessesReducer(state = initialState, action: any): BusinessesState {
  switch (action.type) {
    case ActionType.FETCH_BUSINESSES_SUCCESS:
      const { results, currentPage, totalPages } = action.payload;
      const newData = results.reduce(
        (acc: Record<string, BusinessData>, business: BusinessData) => {
          acc[business.siren] = business;
          return acc;
        },
        {}
      );
      return {
        ...state,
        data: { ...newData }, // for new values only
        // data: { ...state.data, ...newData }, // for adding old and new values
        currentPage,
        totalPages,
        loading: false,
        error: null,
      };
    case ActionType.UPDATE_BUSINESS:
      const businessToUpdate = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [businessToUpdate.siren]: {
            ...state.data[businessToUpdate.siren],
            ...businessToUpdate,
            Modified: true,
          },
        },
      };
    default:
      return state;
  }
}

function modifiedBusinessesReducer(
  state = initialModifiedState,
  action: any
): ModifiedBusinessesState {
  switch (action.type) {
    case ActionType.UPDATE_MODIFIED_BUSINESS:
      const updatedModifiedBusiness = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [updatedModifiedBusiness.siren]: updatedModifiedBusiness,
        },
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  businesses: businessesReducer,
  modifiedBusinesses: modifiedBusinessesReducer,
});

export default rootReducer;
