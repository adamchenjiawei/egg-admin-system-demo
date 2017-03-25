/**
 * Created by Jacksun on 2017/3/25.
 */
"use strict";

module.exports = app => {
    class UsersControler extends app.Controller {
        * login() {
            const {ctx, service} = this;
            let user = ctx.request.body;
            
            const result = yield service.users.getUserByName(user.username);
    
            if(result){
                if(result.password === user.password){
                    delete result.password;
                    ctx.body = {
                        errcode: 0,
                        status: 200,
                        data: result,
                        msg: '登录成功',
                    };
                } else {
                    ctx.body = {
                        errcode: 2,
                        status: 200,
                        msg: '密码错误',
                    };
                }
            } else {
                ctx.body = {
                    errcode: 1,
                    status: 200,
                    msg: '用户名不存在',
                };
            }
            
        }
        
        * register() {
            const {ctx, service} = this;
    
            /**
             * user check rule
             */
            const createRule = {
                username: {
                    type: 'email',
                },
                password: {
                    type: 'password',
                    compare: 'checkPass',
                },
            };
            
            try{
                let user = ctx.request.body;
                ctx.validate(createRule, user);
                delete user.checkPass;
                
                // register user
                const result = yield service.users.create(user);
                
                if( result.success ){
                    user.id = result.id;
                    delete user.password;
                    ctx.body = {
                        errcode: 0,
                        status: 201,
                        data: user,
                        msg: '注册成功',
                    };
                } else {
                    ctx.body = {
                        errcode: 1,
                        status: 200,
                        data: result.errinfo,
                        msg: '注册失败',
                    };
                }
                
                
            }catch(e){
                ctx.body = {
                    errcode: 2,
                    status: 200,
                    data: e.errors,
                    msg: '注册失败',
                };
            }
            
            
            
        }
        
    }
    return UsersControler;
};
