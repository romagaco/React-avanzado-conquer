import { Children, createContext, useContext, useEffect, useReducer  } from "react";
import { AuthActionType, type AuthAction, type AuthState } from "./state/AuthState";
import { TokenStorage } from "../shared/services";
import type { ReactNode } from 'react';
import { Navigate, Routes, Route } from "react-router-dom"
import { LoginForm, RegisterForm } from "./components"




const initialState: AuthState = {
    isAuthenticated: false, 
    user: null
}

export const AuthContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>
}>({
    state: initialState,
    dispatch: ()  => null
})

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionType.LOGIN:
            return { isAuthenticated: true, user: action.payload }
        case AuthActionType.LOGOUT:
            return initialState
        default: return state
    }
}

export const AuthProvider = ({ children  }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer (authReducer, initialState)

    useEffect(() => {
        const token = TokenStorage.getToken();
        if (token) {
            try {
                const user: User = TokenStorage.decodeToken(token);
                dispatch({ type: AuthActionType.LOGIN, payload: user })
            } catch (error) {
                console.error("Token invalido", error)
                TokenStorage.removeToken()
            }
        }
    }, [])

    return ( 
        <AuthContext.Provider value={{ state, dispatch}}>{children}</AuthContext.Provider>
    ) }


export const AuthRoutes = () => {
    const {state} = useContext(AuthContext)

    if (state.isAuthenticated){
        return <Navigate to="/characters" />
    }
    return {
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
        </Routes>
    }
}

