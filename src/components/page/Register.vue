<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" auto-complete="off"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" placeholder="repassword" v-model="ruleForm.checkPass" auto-complete="off"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                </div>
                <a href="#/login">
                    <el-button type="text">去登录</el-button>
                </a>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data: function () {
            const checkUsername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    password: '',
                    checkPass: '',
                    username: ''
                },
                rules: {
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    username: [
                        {validator: checkUsername, trigger: 'blur'}
                    ]
                }
            };

        },
        methods: {
            submitForm(formName) {
                const self = this;

                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        // ajax register api
                        self.$http.post('http://127.0.0.1:7001/register', self.ruleForm)
                            .then((res) => {
                                return res.json();
                            })
                            .then((res) => {
                                self.resultHandler(res);
                            });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resultHandler(res){
                let self = this;
                if (res.errcode === 0) {
                    sessionStorage.setItem('username', self.ruleForm.username);
                    self.$message({
                        message: res.msg,
                        type: 'success',
                        onClose(){
                            self.$router.push('/index');
                        },
                    });

                } else {
                    if (res.errcode === 2) {
                        let errmsg = '';
                        res.data.map((item) => {
                            errmsg += `${item.field}:${item.message} \n`;
                        });

                        this.$message({
                            message: errmsg,
                            type: 'error'
                        });
                    }
                    if (res.errcode === 1) {
                        self.$message({
                            message: '注册失败，数据库插入失败',
                            type: 'error'
                        });
                    }

                }
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;

    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 200px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }
</style>
