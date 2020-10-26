import { GET_RECORDS, TOGGLE_LOADING } from './actionTypes'

export const initialState = {
    records: [],
    loading: false
};

export default function reducer(state=initialState, action){
    switch(action.type){
        case GET_RECORDS:
            return {
                records: action.records
            }
        case TOGGLE_LOADING:
            return Object.assign({}, state, {
                loading: action.status
            });
        default:
            return state;
    }
}
