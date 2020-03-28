export default {
    getGeneralInfo(context) {
        context.$http({
            url: `dashboard/info`,
            method: 'GET'
        })
            .then((res) => {
                 context.data = res.data.data
            }, () => {
                context.has_error = true
            })
    }


};
