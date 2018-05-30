import { combineReducers } from 'redux';
import stateReducer from 'reducers/state-reducer';
import loadReducer from 'reducers/load-reducer';

const allReducers = {
    states: stateReducer,
    loadings: loadReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;