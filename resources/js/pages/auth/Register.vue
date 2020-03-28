<template>
    <div class="container">

        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <!-- Nested Row within Card Body -->
                <div class="row">
                    <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                    <div class="col-lg-7">
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                            </div>
                            <form class="user" autocomplete="off" @submit.prevent="register" method="post">
                                <div class="form-group">
                                    <input v-model="name" required type="text" class="form-control form-control-user"
                                           id="exampleFirstName" placeholder="Name">
                                    <div class="text-danger text-center" v-if="has_error && errors.name"><span
                                            class="danger">{{ errors.name[0] }}</span></div>
                                </div>
                                <div class="form-group">
                                    <input v-model="email" required type="email" class="form-control form-control-user"
                                           id="exampleInputEmail" placeholder="Email Address">
                                    <div class="text-danger text-center" v-if="has_error && errors.email"><span
                                            class="danger">{{ errors.email[0] }}</span></div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input v-model="password" required type="password"
                                               class="form-control form-control-user" id="exampleInputPassword"
                                               placeholder="Password">

                                    </div>
                                    <div class="col-sm-6">
                                        <input v-model="password_confirmation" type="password"
                                               class="form-control form-control-user" id="exampleRepeatPassword"
                                               placeholder="Repeat Password">
                                    </div>
                                </div>
                                <div class="text-danger text-center" v-if="has_error && errors.password"><span
                                        class="danger">{{ errors.password[0] }}</span></div>
                                <div class="text-danger text-center"
                                     v-if="has_error && errors.password_confirmation"><span class="danger">{{ errors.password_confirmation[0] }}</span>
                                </div>
                                <input type="submit" value="Register Account"
                                       class="btn btn-primary btn-user btn-block">
                            </form>
                            <hr>
                            <div class="text-center">
                                <router-link class="small" :to="{name: 'login'}">Already have an account? Login!
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import authServices from '../../services/authServices'

    export default {
        data() {
            return {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                has_error: false,
                error: '',
                errors: {},
                success: false
            }
        },
        methods: {
            register() {
                authServices.register(this)
            }
        }
    }
</script>
<style scoped>
    .bg-register-image {
        min-height: 500px;
    }
</style>
