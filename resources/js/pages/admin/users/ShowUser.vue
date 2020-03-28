<template>
    <div class="container-fluid">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="row">
                    <div class="col-6">
                        <h6 class="m-0 font-weight-bold text-primary">User №:{{user.id}}</h6>
                    </div>
                    <div class="col-6">
                        <button v-on:click="back" class="btn btn-success btn-sm float-right"><i class="fas fa-fw fa-arrow-left"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{{ user.id }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ getUserRole() }}</td>
                            <td>{{ user.created_at}}</td>
                            <td>{{ user.updated_at}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
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
                user:{}
            }
        },
        methods: {
            getUserRole() {
                for (let role in this.roles) {
                    if ( this.roles.hasOwnProperty(role) ) {
                        if(this.user.role == role){
                            return  this.roles[role];
                        }
                    }
                }
            },
            updateUser() {

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
