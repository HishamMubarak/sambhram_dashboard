import { LOGIN, LOGOUT } from '../types'

const initialState = { _id: '', name:'', department:'', roleId:'' }

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return { ...state, ...action.payload }
        case LOGOUT:
        return { ...initialState }
        default:
            return state
    }
}