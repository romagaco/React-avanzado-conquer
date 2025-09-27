import type { ReactNode, useContext } from "react"
import { AuthContext, AuthRoutes } from "../auth/AuthContainer"
import { Navigate, Route, Routes } from "react-router-dom"
import { CharactersContainer } from "../characters/CharactersContainer"


const PrivateRoute = ({children}: {children: ReactNode}) => {
    const {state} = useContext{AuthContext}

    return state.isAuthenticated ? children : <Navigate to="/" />;
}


export const AppRouter = () => {
    <Routes>
        <Route path="/*" element={<AuthRoutes />} / >
        <Route path="/characters" element={<PrivateRoute><CharactersContainer /></PrivateRoute> } />
    </Routes>
}