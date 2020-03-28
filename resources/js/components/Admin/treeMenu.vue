<template>
    <ul class="tree-menu">
        <li v-if="category" :key="category.id"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <span v-if="category.child && Object.keys(this.category.child).length > 0" class="cursor-pointer">
                                <span @click="toggle">
                                    <i v-if="!isOpen" class="fas fa-fw fa-plus"></i>
                                    <i v-else class="fas fa-fw fa-minus"></i>
                                </span>
                                    </span>
            {{category.name}}
            <div>
                <div class="input-group input-group-sm"><input type="search" placeholder="Search Product" v-model="keywords" aria-label="Search" class="form-control"></div>

                <ul v-if="results.length > 0">
                    <li v-on:click="addProductToCategory(result, category)" class="list-group-item list-group-item-action p-0 align-middle" v-for="result in results" :key="result.id">
                        <p class="p-0 m-0 pl-1" style="cursor:pointer">{{result.id}} {{result.name}}
                        </p>

                    </li>
                </ul>
                <ul v-else-if="results.length == 0 &&  keywords">
                    <li class="list-group-item list-group-item-action p-0 pl-1" v-on:click="createProduct">
                        <p class="p-0 m-0" style="cursor:pointer"> not found click for create
                        </p>
                    </li>
                </ul>

            </div>
            <span class="d-flex justify-content-between align-items-right m-1">
                                 <button @click="showAddForm(category.id)" type="button" class="btn btn-success btn-sm float-right m-1" data-toggle="modal">
                            <i class="fas fa-fw fa-plus"></i>
                        </button>
                                  <button @click="showEditForm(category.id)" type="button" class="btn btn-primary btn-sm m-1"><i
                                      class="fas fa-fw fa-edit" data-toggle="modal"></i>
                                </button>
                                <button @click="deleteCategory(category.id)" class="btn btn-danger btn-sm m-1"><i
                                    class="fas fa-fw fa-trash"></i>
                                </button>
                                    </span>
        </li>
        <div v-if="category && category.products.length > 0" class="card-body p-0">
            <ul class="tree-menu">
                <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center m-1" v-for="product in category.products"  :key="product.id">
                    Наименование : {{ product.name}}
                    <span class="d-flex justify-content-between align-items-right m-1">
                    <a href="#"><i v-on:click="deleteProductToCategory(product)"  class="fas fa-fw fa-minus" style="color:red"></i></a>
                    <router-link :to="{name: 'admin.dashboard.product.update', params: {productId: product.id}}"> <i class="fas fa-fw fa-edit"></i></router-link>
                    </span>
                </li>
            </ul>
        </div>

        <tree-menu v-show="isOpen"
            v-for="category in categories"
            :categories="category.child" v-bind:key="category.id"
            :category="category"
            :keywords="keywords"
            :results="results"
            @showAddForm="showAddForm"
            @deleteCategory="deleteCategory"
            @showEditForm="showEditForm"
            @addProductToCategory="addProductToCategory"
            @createProduct="createProduct"
            @deleteProductToCategory="deleteProductToCategory">

        >

        </tree-menu>

    </ul>
</template>
<script>

    export default {
        name: 'tree-menu',

        props: ['categories', 'category'],
        data() {
            return {
                isOpen: false,
                keywords: '',
                results: []
            }
        },
        components: {
        },
        methods: {
            toggle() {

                this.isOpen = !this.isOpen;
            },
            showAddForm(parent_id) {
                this.$emit('showAddForm', parent_id);
            },
            showEditForm(id) {
                this.$emit('showEditForm', id);
            },
            deleteCategory(id) {
                this.$emit('deleteCategory', id);
            },
            createProduct(id) {
                this.$emit('createProduct', id);
            },
            addProductToCategory(result, category_id){
                this.$emit('addProductToCategory', result, category_id);
            },
            deleteProductToCategory(product){
                this.$emit('deleteProductToCategory',  product);
            },
            fetch() {
                if (this.keywords != '') {
                    axios.get('/product/search', {params: {keywords: this.keywords}})
                        .then(response => this.results = response.data)
                        .catch(error => {
                        });
                } else {
                    this.results = []
                }

            },
            createGlass() {
                this.$router.push({
                    name: 'admin.dashboard.glass.add', params: {
                        glass_types: this.glass_types
                    }
                })
            },
        },
        created() {

        },
        mounted() {
        },
        watch: {
            keywords(after, before) {
                this.fetch();
            }
        },
    }

</script>

<style scoped>
    .cursor-pointer{
        cursor:pointer;
        color:gray;
    }
    .list-group-item{
        padding: 0.01rem 1.25rem;
    }
</style>
