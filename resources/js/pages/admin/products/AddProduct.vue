<template>
    <div class="container-fluid">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="row">
                    <div class="col-6">
                        <h6 class="m-0 font-weight-bold text-primary">Add Product</h6>
                    </div>
                    <div class="col-6">
                        <button v-on:click="back" class="btn btn-success btn-sm float-right"><i class="fas fa-fw fa-arrow-left"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <form autocomplete="off" @submit.prevent="addProduct"  ref="add_product">
                    <div class="form-group" v-bind:class="{ 'has-danger': has_error && errors.name }">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" ref="name" class="form-control"  v-model="product.name">
                        <span class="help-block" v-if="has_error && errors.name">{{ errors.name }}</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-danger': has_error && errors.price }">
                        <label for="price">Price</label>
                        <input type="text" id="price" name="price" ref="price" class="form-control"  v-model="product.price">
                        <span class="help-block" v-if="has_error && errors.price">{{ errors.price }}</span>
                    </div>

                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.description }">
                        <label for="description">Description</label>
                        <textarea  id="description" name="description" ref="description" class="form-control" v-model="product.description"></textarea>
                        <span class="help-block" v-if="has_error && errors.description">{{ errors.description }}</span>
                    </div>
                    <button type="submit" class="btn btn-primary">Save</button>
                </form>
            </div>
        </div>
    </div>

</template>
<script>
    import productServices from '../../../services/productServices'
    export default {
        props: ['product_types'],
        data() {
            return {
                product: {},
                has_error: false,
                error: '',
                errors: {},
                success: false,
            }
        },
        methods: {
            addProduct() {
                productServices.addProduct(this)
            },
            back() {
                this.$router.push({name: 'admin.dashboard.products'})
            }
        },
        mounted() {

        }
    }
</script>
