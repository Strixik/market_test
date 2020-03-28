<template>

    <div class="hold-transition login-page">
    <div class="login-box">
        <div class="login-logo">
            <b>Admin</b>LTE
        </div>
        <!-- /.login-logo -->
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">Sign in to start your session</p>
                <p v-if="has_error" class="text-danger text-center">Login or password wrong</p>
                <form class="user" autocomplete="off" @submit.prevent="login" method="post">
                    <div class="input-group mb-3">
                        <input v-model="email" required type="email" class="form-control form-control-user"  aria-describedby="emailHelp" placeholder="Enter Email Address...">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input v-model="password"
                               required type="password" class="form-control form-control-user"  placeholder="Password">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <div class="icheck-primary">
                                <input type="checkbox" id="remember">
                                <label for="remember">
                                    Remember Me
                                </label>
                            </div>
                        </div>
                        <!-- /.col -->
                        <div class="col-4">
                            <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>
            </div>
            <!-- /.login-card-body -->
        </div>
    </div>
    </div>
</template>
<script>
    import authServices from '../../services/authServices'

    export default {
        data() {
            return {
                email: null,
                password: null,
                has_error: false
            }
        },
        mounted() {
            if(this.$auth.user()){
                this.$router.push({ name: "admin.dashboard"})
            }
        },
        methods: {
            login() {
                authServices.login(this)
            }
        }
    }
</script>
<style scoped>
    .bg-login-image {
        min-height: 500px;
    }
</style>
