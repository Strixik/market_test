<template>
    <tr>
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ getUserRole() }}</td>
        <td>{{ user.created_at}}</td>
        <td>
            <div class="d-flex p-2 justify-content-center">
                <button v-on:click="getUser()" class="btn btn-primary btn-sm m-1"><i class="fas fa-fw fa-eye"></i></button>
                <button v-on:click="editUser()" class="btn btn-primary btn-sm m-1"><i class="fas fa-fw fa-edit"></i></button>
                <button v-on:click="deleteUser(user.id)" class="btn btn-danger btn-sm m-1"><i class="fas fa-fw fa-trash"></i>
                </button>
            </div>
        </td>
    </tr>
</template>
<script>
    import userServices from '../../services/userServices'

    export default {
        props: ['user', 'roles'],
        data() {
            return {}
        },
        components: {},
        created() {

        },
        mounted() {


        },

        methods: {
            getUser() {
                this.$router.push({name: 'admin.dashboard.users.show', params: {userId: this.user.id, roles:this.roles}})
            },
            getUserRole() {
                for (let role in this.roles) {
                    if ( this.roles.hasOwnProperty(role) ) {
                        if(this.user.role == role){
                           return  this.roles[role];
                        }
                    }
                }
            },
            editUser() {
                this.$router.push({name: 'admin.dashboard.users.update', params: {userId: this.user.id, roles:this.roles}})
            },
            deleteUser() {
                userServices.deleteUser(this);

            },


        }
    }
</script>
