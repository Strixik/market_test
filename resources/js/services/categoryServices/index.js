import API_CONFIG from '../../API_CONFIG.js'
export default {
    addCategory(context) {
        let data = new FormData(context.$refs.add_category);
        if(data.get('parent_id') == null){
            data.append('parent_id', 0);
        }
        context.axios.post(API_CONFIG.CATEGORY.ADD, data)
            .then(response => {
                context.has_error_add = false
                context.category_add = {}
                context.error_add = ''
                context.errors_add = {}
                context.success_add = true
                context.getCategories();
            }).catch(error => {
            context.has_error_add = true
            context.error_add = error.response.data.error
            context.errors_add = error.response.data.errors || {}
        });
    },
    deleteCategory(context, id) {
        context.$swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Category!',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                context.axios.delete(API_CONFIG.CATEGORY.DELETE + id)
                    .then(response => {
                        context.$swal(
                            'Deleted',
                            'Category has been deleted.',
                            'success'
                        )
                        if(id === context.check){
                            context.check = false
                        }
                        context.getCategories();

                        context.category = false
                        context.category_add = {}
                    }).catch(error => {
                    if (error.response.status == 404) {
                        context.$router.push({name: '404'});
                    }
                    context.has_error = true
                });

            } else {
                context.$swal(
                    'Cancelled',
                    'Category is safe :)',
                    'error'
                )
            }
        })

    },
    getCategories(context) {
        context.axios.get(API_CONFIG.CATEGORY.GET_ALL)
            .then(response => {
                context.categories = response.data.categories
                context.categories_all = response.data.categories_all
                context.glass_types = response.data.glass_types
                context.types = response.data.types
                context.load = true
            }).catch(error => {
            if (error.response.status == 404) {
                context.$router.push({name: '404'});
            }
            context.has_error = true
        });
    },
    getCategory(context, id, name) {

        context.axios.get(API_CONFIG.CATEGORY.GET + id)
            .then(response => {
                if(name == 'check'){
                    context.category = response.data.category
                    context.category_child = response.data.category_child
                }

                if(name == 'update'){
                    context.category_update = response.data.category
                    context.attribute_check = response.data.options_check
                }

            }).catch(error => {
            if (error.response.status == 404) {
                context.$router.push({name: '404'});
            }
            if(name == 'check'){
                context.has_error = true,
                context.error = error.response.data.error
                context.errors = error.response.data.errors || {}
            }
            if(name == 'update'){
                context.has_error_update = true,
                context.error_update = error.response.data.error
                context.errors_update = error.response.data.errors || {}
            }

        });
    },

    updateCategory(context, id) {

        let data = new FormData(context.$refs.update_category);
        data.append("_method", "PUT");
        context.axios.post(API_CONFIG.CATEGORY.PUT + id, data)
            .then(response => {
                context.success_update = true
                context.has_error_update = false
                context.attribute_check = response.data.options_check
                context.getCategories();
            }).catch(error => {
            context.has_error_update = true,
            context.error_update = error.response.data.error
            context.errors_update = error.response.data.errors || {}
        });
    },

    addProductCategory(context, category_id, product_id) {
        context.axios.post(API_CONFIG.CATEGORY.ADD_PRODUCT, {'category_id': category_id, 'product_id': product_id} )
            .then(response => {
                context.getCategories();
            }).catch(error => {

        });
    },
    addReplacement(context) {
        let data = new FormData(context.$refs.add_replacement);
        context.axios.post(API_CONFIG.CATEGORY.ADD_REPLACEMENT, data )
            .then(response => {
                context.success_add_replacement = true
                context.has_error_add_replacement = false
                context.replacement_add = {}
                context.error_add_replacement = ''
                context.glass_id_replacement_text = ''
                context.errors_add_replacement = {}
                context.getCategories();
            }).catch(error => {
            context.has_error_replacement_add = true,
            context.error_replacement_add = error.response.data.error
            context.errors_replacement_add = error.response.data.errors || {}
        });
    },

    deleteProductToCategory(context, product) {
        context.axios.post(API_CONFIG.CATEGORY.DELETE_PRODUCT, { 'category_id': product.pivot.category_id, 'product_id': product.pivot.product_id })
            .then(response => {
                context.getCategories();

            }).catch(error => {


        });
    },


};
