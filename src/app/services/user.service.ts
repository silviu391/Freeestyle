import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { config } from "../config";

import { User } from "../models/user";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    public getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }
    public register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
}