import $api, {API_URL} from "../http";
import axios from "axios";

export default class AuthService {
    static async registration(email: string, password: string) {
        return $api.post('/auth/registration', {email, password});
    }
    static async login(email: string, password: string) {
        return $api.post('/auth/login', {email, password});
    }
    static async logout() {
        return $api.post('/auth/logout');
    }
    static async refresh() {
        return axios.get(`${API_URL}/auth/refresh`, {withCredentials: true});
    }
    static async forgot(email: string) {
        return axios.post(`${API_URL}/auth/forgot`, {email}, {withCredentials: true});
    }
    static async checkLink(link: string | undefined) {
        return axios.post(`${API_URL}/auth/check-reset-link`, {link}, {withCredentials: true});
    }
    static async reset(password: string) {
        return axios.post(`${API_URL}/auth/reset-password`, {password}, {withCredentials: true});
    }
}