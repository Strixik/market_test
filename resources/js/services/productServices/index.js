import API_CONFIG from '../../API_CONFIG.js'
export default {
    addProduct(context) {
        let data = new FormData(context.$refs.add_product);
        context.axios.post(API_CONFIG.PRODUCT.ADD, data)
            .then(response => {
                context.success = true
                context.has_error = false
                context.$router.push({name: 'admin.dashboard.products'})
            }).catch(error => {
            context.has_error = true
            context.error = error.response.data.error
            context.errors = error.response.data.errors || {}
        });
    },
    deleteProduct(context) {
        context.$swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Product!',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                context.axios.delete(API_CONFIG.PRODUCT.DELETE + context.product.id)
                    .then(response => {
                        context.$swal(
                            'Deleted',
                            'Product has been deleted.',
                            'success'
                        )
                        context.$parent.getProducts();
                    }).catch(error => {
                    if (error.response.status == 404) {
                        context.$router.push({name: '404'});
                    }
                    context.has_error = true
                });

            } else {
                context.$swal(
                    'Cancelled',
                    'Product is safe :)',
                    'error'
                )
            }
        })

    },
    getProducts(context) {
        context.axios.get(API_CONFIG.PRODUCT.GET_ALL)
            .then(response => {
                context.products = response.data.products
            }).catch(error => {
            if (error.response.status == 404) {
                context.$router.push({name: '404'});
            }
            context.has_error = true
        });
    },
    getProduct(context, id) {

        context.axios.get(API_CONFIG.PRODUCT.GET + id)
            .then(response => {
                context.product = response.data.product
            }).catch(error => {
            if (error.response.status == 404) {
                context.$router.push({name: '404'});
            }
            context.has_error = true,
            context.error = error.response.data.error
            context.errors = error.response.data.errors || {}
        });
    },

    updateProduct(context, id) {

        let data = new FormData(context.$refs.update_product);
        data.append("_method", "PUT");
        context.axios.post(API_CONFIG.PRODUCT.PUT + id, data)
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
