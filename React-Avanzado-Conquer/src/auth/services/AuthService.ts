/* este archivo no es terminacion tsx porque no llva un render html*/

import { TokenStorage } from "../../shared/services";
import type { User } from "../state/AuthState";
import { AuthAdapter } from "../adapters/AuthAdapter";

export class AuthService {
    private AuthAdapter = new AuthAdapter();

    async login(email: string, password: string): Promise<User> {
        const token = await this.AuthAdapter.login(email, password)
        TokenStorage.setToken(token)

        const user: User = TokenStorage.decodeToken(token)
        return user;
    }

    async register(email: string, password: string): Promise<void> {
        await this.AuthAdapter.register(email, password)
    }

    logout() : void {
        TokenStorage.removeToken();
    }

    getUser (): User | null {
        const token = TokenStorage.getToken();

        if (token) {
            try {
                return TokenStorage.decodeToken(token)
            } catch (error) {
                console.error("Token es valido", error)
                TokenStorage.removeToken()
                return null;
            }
        }

        return null;
    }
}