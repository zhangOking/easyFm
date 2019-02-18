<template>
    <div class="easyFm-login">
        <div class="easyFm-login-content">
            <div class="easyFm-login-el-from">
                <el-form ref="login_form" :model="login_form" label-width="120px">
                    <el-form-item label="请输入账号">
                        <el-input v-model="login_form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="请输入密码">
                        <el-input v-model="login_form.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">登陆</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
            
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data() {
            return {
                login_form: {
                    name: '',
                    password: ''
                }
            }
        },
        computed: {
            ...mapState([
                'token'
            ])
        },
        methods: {
            ...mapActions([
                'updateUserInfo'
            ]),
            onSubmit() {
                this.$ajax.post('/login', this.login_form).then(res => {
                    this.updateUserInfo(res.data)
                    this.$router.push('/')
                })
            }
        }
    }
</script>

<style scoped lang="less">
.easyFm-login {
    width: 100%;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    padding-top: 10%;
    .easyFm-login-content {
        position: relative;
        box-sizing: border-box;
        padding-top: 150px;
        width: 600px;
        height: 600px;
        display: inline-block;
        background: url('../assets/logo.png') no-repeat;
        background-size: 100%;
        background-position: 0 0;
        .easyFm-login-el-from {
            width: 100%;
            left: -30px;
            position: absolute;
        }
    }
}
</style>