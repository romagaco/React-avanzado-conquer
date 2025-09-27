export enum AuthActionType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}

export interface User {
    id: number;
    email: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

export type AuthAction = 
| { type: AuthActionType.LOGIN; payload: User }
| { type: AuthActionType.LOGOUT  }


