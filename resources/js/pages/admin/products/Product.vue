<template>

    <div class="container-fluid">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <div class="row">
                    <div class="col-6">
                        <h6 class="m-0 font-weight-bold text-primary">Product</h6>
                    </div>
                    <div class="col-6">
                        <button v-on:click="createProduct" class="btn btn-success btn-sm float-right"><i class="fas fa-fw fa-plus"></i>
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
                            <th>Price</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <product-item v-for="product in products" :product="product"  :key="product.id"/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
    import productServices from "../../../services/productServices";
    import productItem from "../../../components/Admin/productItem";

    export default {
        name: 'Product',
        data() {
            return {
                has_error: false,
                products: null,
                product_types: null
            }
        },
        components: {
            productServices,
            productItem
        },

        mounted() {
            this.getProducts()

        },
        updated() {
            window.$('#dataTable').DataTable();
        },

        methods: {
            getProducts() {
                productServices.getProducts(this)
            },
            createProduct() {
                this.$router.push({name: 'admin.dashboard.product.add'})
            }
        },
        watch:{
            product(new_val){
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
