import API_CONFIG from '../../API_CONFIG.js'
export default {
    addUser(context) {
        let data = new FormData(context.$refs.add_user);
        context.axios.post(API_CONFIG.USER.ADD, data)
            .then(response => {
                context.success = true
                context.has_error = false
                context.$router.push({name: 'admin.dashboard.users'})
            }).catch(error => {
            context.has_error = true
            context.error = error.response.data.error
            context.errors = error.response.data.errors || {}
        });
    },
    deleteUser(context) {
        context.$swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this User!',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                context.axios.delete(API_CONFIG.USER.DELETE + context.user.id)
                    .then(response => {
                        context.$swal(
                            'Deleted',
                            'User has been deleted.',
                            'success'
                        )
                        context.$parent.getUsers();
                    }).catch(error => {
                    if (error.response.status == 404) {
                        context.$router.push({name: '404'});
                    }
                    context.has_error = true
                });

            } else {
                context.$swal(
                    'Cancelled',
                    'User is safe :)',
                    'error'
                )
            }
        })

    },
    getUsers(context) {
        context.axios.get(API_CONFIG.USER.GET_ALL)
            .then(response => {
                context.users = response.data.users
                context.roles = response.data.roles

            }).catch(error => {
            if (error.response.status == 404) {
                context.$router.push({name: '404'});
            }
            context.has_error = true
        });
    },
    getUser(context, id) {

        context.axios.get(API_CONFIG.USER.GET + id)
            .then(response => {
                context.user = response.data.user
            }).catch(error => {
            if (error.response.status == 404) {
                context.$router.push({name: '404'});
            }
            context.has_error = true,
                context.error = error.response.data.error
            context.errors = error.response.data.errors || {}
        });
    },

    updateUser(context, id) {

        let data = new FormData(context.$refs.update_user);
        if(context.user.password != undefined && context.user.password.length > 0){
            data.append("password", context.user.password);
        }
        data.append("_method", "PUT");
        context.axios.post(API_CONFIG.USER.PUT + id, data)
            .then(response => {
                context.success = true
                context.has_error = false
            }).catch(error => {
            context.has_error = true,
                context.error = error.response.data.error
            context.errors = error.response.data.errors || {}
        });
    },


};
