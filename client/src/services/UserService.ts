import $api from "../http";

export default class UserService {
    static async getUserInfo() {
        return $api.get("/user/user-profile");
    }
    static async updateUserData(name: string | undefined, status: string | undefined, goal: number | undefined) {
        return $api.put("/user/update-userdata", {name, status, goal});
    }
    static async updateImage(file: object) {
        return $api.put("/user/update-user-image", file);
    }
    static async updateReadingDate(currentDate: string) {
        return $api.put("/user/update-reading-date", {currentDate})
    }
}