<template>

    <div class="container-fluid">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="row">
                    <div class="col-6">
                        <h6 class="m-0 font-weight-bold text-primary">Users</h6>
                    </div>
                    <div class="col-6">
                        <button v-on:click="createUser" class="btn btn-success btn-sm float-right"><i class="fas fa-fw fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <userItem v-for="user in users" :user="user" :roles="roles" :key="user.id"/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
    import userItem from '../../../components/Admin/userItem'
    import addUser from './AddUser.vue'
    import userServices from "../../../services/userServices";

    export default {
        name: 'Users',
        data() {
            return {
                has_error: false,
                users: null,
                roles:null
            }
        },
        components: {
            userItem,
            addUser
        },

        mounted() {
            this.getUsers()

        },
        updated() {
            window.$('#dataTable').DataTable();
        },

        methods: {
            getUsers() {
                userServices.getUsers(this)
            },
            createUser() {
                this.$router.push({name: 'admin.dashboard.users.add', params: {
                        roles: this.roles
                    }})
            }
        },
        watch:{
            users(new_val){
                window.$('#dataTable').DataTable().destroy();
                if(new_val != null){
                    this.$nextTick(() => {
                        window.$('#dataTable').DataTable();
                    });

                }

            }
        }


    }
</script>
<style scoped>

</style>
