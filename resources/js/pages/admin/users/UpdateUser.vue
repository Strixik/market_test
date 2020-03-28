<template>
    <div class="container-fluid">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="row">
                    <div class="col-6">
                        <h6 class="m-0 font-weight-bold text-primary">Update User №:{{this.user.id}}</h6>
                    </div>
                    <div class="col-6">
                        <button v-on:click="back" class="btn btn-success btn-sm float-right"><i class="fas fa-fw fa-arrow-left"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div v-if="success" class="alert alert-success  fade show" role="alert">
                    <strong>Updated!</strong>
                </div>
                <form autocomplete="off" @submit.prevent="updateUser"  v-on:change="signalChange" ref="update_user">
                    <div class="form-group" v-bind:class="{ 'has-danger': has_error && errors.name }">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" ref="name" class="form-control"  v-model="user.name">
                        <span class="help-block" v-if="has_error && errors.name">{{ errors.name }}</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-danger': has_error && errors.email }">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email" ref="email" class="form-control" placeholder="user@example.com" v-model="user.email">
                        <span class="help-block" v-if="has_error && errors.email">{{ errors.email }}</span>
                    </div>

                    <div class="form-group" v-bind:class="{ 'has-danger': has_error && errors.role }">
                        <label for="role">Role select</label>
                        <select type="text" id="role" name="role" class="form-control" ref="role"
                                v-model="user.role">
                            <option v-for="(role, key)  in roles" v-bind:value="key" >{{ role }}</option>
                        </select>
                        <span class="help-block" v-if="has_error && errors.email">{{ errors.role }}</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
                        <label for="password">Password</label>
                        <input type="password" id="password"  class="form-control" v-model="user.password">
                        <span class="help-block" v-if="has_error && errors.password">{{ errors.password }}</span>
                    </div>
                    <button type="submit" class="btn btn-primary">Save</button>
                </form>
            </div>
        </div>
    </div>

</template>
<script>
    import userServices from '../../../services/userServices'
    export default {
        props: ['roles'],
        data() {
            return {
                user: {
                },
                has_error: false,
                error: '',
                errors: {},
                success: false
            }
        },
        methods: {
            signalChange(){
                this.success = false
            },
            updateUser() {
                userServices.updateUser(this, this.user.id)
            },
            getUser() {
                userServices.getUser(this, this.$route.params.userId)
            },
            back() {
                this.$router.push({name: 'admin.dashboard.users'})
            }
        },
        mounted() {

            this.getUser()

        },
    }
</script>
