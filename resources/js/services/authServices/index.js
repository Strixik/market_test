export default {
    login(context) {
        let redirect = context.$auth.redirect()
        context.$auth.login({
            params: {
                email: context.email,
                password: context.password,
            },
            success: function () {
                const redirectTo = redirect ? redirect.from.name : context.$auth.user().role === 2 ? 'admin.dashboard' : 'dashboard'
                context.$router.push({name: redirectTo})
            },
            error: function (res) {

                context.has_error = true
            },
            rememberMe: true,
            fetchUser: true
        })
    },
    register(context) {

        context.$auth.register({
            data: {
                name: context.name,
                email: context.email,
                password: context.password,
                password_confirmation: context.password_confirmation
            },
            success: function ()  {
                context.success = true
            },
            error: function (res) {

                context.has_error = true
                context.error = res.response.data.error
                context.errors = res.response.data.errors || {}
            }
        })
    }
};
