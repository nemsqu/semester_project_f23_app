export const SET_SCANNED = 'SET_SCANNED';
export const GET_SCANNED = 'GET_SCANNED';



export const setScanned = scanned => dispatch => {
    dispatch({
        type: SET_SCANNED,
        payload: scanned,
    });
};

export const getScanned  = () => {
    return dispatch => 
    dispatch({
        type: SET_SCANNED,
        payload: scanned,
    });
};