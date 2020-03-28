<template>
    <tr>
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.description }}</td>
        <td>
            <div class="d-flex p-2 justify-content-center">
<!--                <button v-on:click="getProduct()" class="btn btn-primary m-1"><i class="fas fa-fw fa-eye"></i></button>-->
                <button v-on:click="editProduct()" class="btn btn-primary btn-sm m-1"><i class="fas fa-fw fa-edit"></i></button>
                <button v-on:click="deleteCatalog()" class="btn btn-danger btn-sm m-1"><i class="fas fa-fw fa-trash"></i>
                </button>
            </div>
        </td>
    </tr>
</template>
<script>
    import productServices from '../../services/productServices'

    export default {
        props: ['product'],
        data() {
            return {}
        },
        components: {},
        created() {

        },
        mounted() {

        },

        methods: {
            getProduct() {
                this.$router.push({name: 'admin.dashboard.product.show', params: {productId: this.product.id}})
            },
            editProduct() {
                this.$router.push({name: 'admin.dashboard.product.update', params: {productId: this.product.id}})
            },
            deleteCatalog() {
                productServices.deleteProduct(this);

            },


        }
    }
</script>
