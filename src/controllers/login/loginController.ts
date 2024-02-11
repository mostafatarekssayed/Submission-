import api from "../../api-client/api";
import {AxiosResponse} from "axios";
import {UserCredentials} from "../../types/user-credentials";
import {AuthUser} from "../../types/auth-user.type";
const subRoute = 'auth/login'

export  function logUser(username:string,password:string):Promise<AxiosResponse<AuthUser>>{
    return  api.post<AuthUser,AxiosResponse<AuthUser>,UserCredentials>(subRoute,{"username":username,"password":password})
}