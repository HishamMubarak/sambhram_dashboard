import { LOGIN, LOGOUT } from '../types'

export const Login = (userData) => {
    return {
        type:LOGIN,
        payload:userData
    }
}

export const logout = () => {
    return {
        type:LOGOUT
    }
}