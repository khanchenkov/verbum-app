import $api, {API_URL} from "../http";
import axios from "axios";
import {AuthCheck, AuthRequest, AuthRequestMessage} from "../types/IRequest";

export default class AuthService {
    static async registration(email: string, password: string) {
        return $api.post<AuthRequest>('/auth/registration', {email, password});
    }
    static async login(email: string, password: string) {
        return $api.post<AuthRequest>('/auth/login', {email, password});
    }
    static async logout() {
        return $api.post<AuthRequestMessage>('/auth/logout');
    }
    static async refresh() {
        return axios.get<AuthRequest>(`${API_URL}/auth/refresh`, {withCredentials: true});
    }
    static async forgot(email: string) {
        return axios.post<AuthRequestMessage>(`${API_URL}/auth/forgot`, {email}, {withCredentials: true});
    }
    static async checkLink(link: string | undefined) {
        return axios.post<AuthCheck>(`${API_URL}/auth/check-reset-link`, {link}, {withCredentials: true});
    }
    static async reset(password: string) {
        return axios.post<AuthRequestMessage>(`${API_URL}/auth/reset-password`, {password}, {withCredentials: true});
    }
}
