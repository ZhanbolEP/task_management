import { Injectable } from "@angular/core";
import { User } from "../layouts/auth-layout/interfaces";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {
    
    constructor(private http: HttpClient) {

    }
    
    register(){}
    
    login(user: User) {
 
    }
}

    