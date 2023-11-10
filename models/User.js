const UserStorage = require("./UserStorage");

class User {
    constructor(body, client) {
        this.body = body;
        this.client = client;
    };

    async login() { // await를 사용하기 위해 비동기로 선언
        const body = this.body;
        const client = this.client;
        try {
            const response = await UserStorage.getUserInfo(body.id, body.password, client);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    };

    async signup() {
        const body = this.body;
        const client = this.client;
        if (!body.id) return { success: false, msg: "아이디를 입력해주세요."};
        if (!body.name) return { success: false, msg: "이름을 입력해주세요."};
        if (!body.password) return { success: false, msg: "비밀번호를 입력해주세요."};
        if (body.password != body.confirmPassword) return { success: false, msg: "비밀번호가 일치하지 않습니다."};
        
        try {
            const response = await UserStorage.save(body, client);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    };
};


module.exports = User;