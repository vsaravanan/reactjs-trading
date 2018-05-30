import { TOGGLE_LOADING } from 'reducers/actions/state-actions';

const initialState = {
    loading: null
}

export default function (state = initialState, action) {
    switch (action.type) {
      case TOGGLE_LOADING: {
        return  Object.assign({}, state, { 
            loading: action.loading
          });           
      
      }
      default:
        return state;
    }
  }
  
