export const UPDATE_STOCKID = 'UPDATE_STOCKID';

export function updateStockId(stockId) {
    return {
        type: UPDATE_STOCKID,
        payload: {
            stockId
        }
    }
}

export const TOGGLE_LOADING = 'TOGGLE_LOADING';

export function toggleLoading(loading) {
    return {
        type: TOGGLE_LOADING,
        loading: loading
    }
}