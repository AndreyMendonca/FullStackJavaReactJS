import { AccessToken, UserLogin } from "./users.resources";

class AuthService {
    baseURL: string = 'http://localhost:8080/v1/users'; 
    static AUTH_PARAM: string = "_auth";

    async authentication(authentication: UserLogin) : Promise<AccessToken>{
        const response = await fetch(this.baseURL+ '/auth',{
            method: 'POST',
            body: JSON.stringify(authentication),
            headers:{
                "Content-Type": "application/json"
            }
        })
        if(response.status == 401){
            throw new Error("User or password are incorret");
        }
        return await response.json();
    }
}

export const useAuth = () => new AuthService();