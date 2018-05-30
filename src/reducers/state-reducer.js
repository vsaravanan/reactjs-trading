import { UPDATE_STOCKID } from 'reducers/actions/state-actions';

const initialState = {
    stockId: null
}

export default function (state = initialState, action) {
    switch (action.type) {
      case UPDATE_STOCKID: {
        return  {
          ...state,
          stockId: action.payload.stockId          
        }
      }
      default:
        return state;
    }
  }
  