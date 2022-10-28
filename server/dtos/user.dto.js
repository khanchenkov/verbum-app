module.exports = class UserDto{
    email;
    id;
    isActivated;

    constructor(userData) {
        this.id = userData.id;
        this.email = userData.email;
        this.isActivated = userData.is_activated;
    }
}