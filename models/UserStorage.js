class UserStorage {
    static async getUserInfo(id, password, client) {
        try {
            // SELECT 쿼리 실행
            const selectQuery = `SELECT userid, password FROM userinfo WHERE userid = '${id}'`;
            const selectResult = await client.query(selectQuery);
            if (selectResult.rows.length > 0) {
                const userInfo = {
                    userid: selectResult.rows[0].userid,
                    password: selectResult.rows[0].password
                };
                if (userInfo.password === password)
                    return { success: true, msg: '로그인 성공' };
                else
                    return { success: false, msg: '비밀번호가 틀렸습니다.' };
            } else {
                return { success: false, msg: '사용자 정보를 찾을 수 없습니다.' };
            }
        } catch (error) {
            console.log(error);
            return { success: false, msg: '데이터베이스 오류' };
        }
    };

    static async save(userInfo, client) {
        try {
            // SELECT 쿼리 실행
            const selectQuery = 'SELECT COUNT(*) FROM userinfo WHERE userid = $1';
            const selectResult = await client.query(selectQuery, [userInfo.id]);
    
            const cnt = selectResult.rows[0].count;
            if (cnt > 0) {
                return { success: false, msg: '이미 존재하는 아이디입니다.' };
            }
    
            // INSERT 쿼리 실행
            const insertQuery = 'INSERT INTO userinfo (id, name, userid, password) VALUES (nextval($1), $2, $3, $4)';
            const insertValues = ['seq_userinfo', userInfo.name, userInfo.id, userInfo.password];
            await client.query(insertQuery, insertValues);
    
            console.log('success');
            return { success: true, msg: '회원가입성공' };
        } catch (error) {
            console.log(error);
            return { success: false, msg: '데이터베이스 오류' };
        }
    };
};

module.exports = UserStorage;