import { SET_SCANNED, GET_SCANNED} from './actions';

const initialState = {
    scanned: false
}


function scanReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SCANNED:
            return {...state, scanned: action.payload};
        case GET_SCANNED:
            return {...state, scanned: action.payload};
    
        default:
            return state;
    }
}

export default scanReducer;