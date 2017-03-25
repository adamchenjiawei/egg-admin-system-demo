/**
 * Created by Jacksun on 2017/3/25.
 */
"use strict";
module.exports = app => {
    class UsersService extends app.Service {
        * create(params) {
            // 插入
            const result = yield this.app.mysql.insert('users', params);
            const insertSuccess = result.affectedRows === 1;
            if(insertSuccess){
                return {
                    id: result.insertId,
                    success: true,
                };
            } else {
                return {
                    errinfo: result,
                    success: false,
                }
            }
        }
        * getUserByName(username){
            // get
            const result = yield this.app.mysql.get('users', { username: username });
            return result;
        }
    }
    return UsersService;
    
};
