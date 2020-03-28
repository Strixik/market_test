<template>

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3 col-sm-1">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Select categories to work on:</h6>
                        <button v-on:click="showAddForm(0)" type="button" class="btn btn-success btn-sm float-right"
                                data-toggle="modal">
                            <i class="fas fa-fw fa-plus"></i>
                        </button>
                    </div>
                    <div class="card-body">
                        <ul class="list-group">
                            <li v-for="category in categories" :category="category" :key="category.id"
                                class="list-group-item d-flex justify-content-between align-items-center">
                                <span class="badge-primary badge-pill"><i class="fas fa-fw fa-arrow-right"></i></span>
                                {{category.name}}
                                <label class="customcheck">
                                    <input type="radio" :checked="check == category.id" name="show"
                                           v-on:click="checkMainCategory(category.id, 'check')">
                                    <span class="checkmark"></span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-9  col-sm-1">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                    </div>
                    <div class="card-body">
                            <tree-menu  :keywords="keywords" :results="results" :categories="category_child"
                                       :category="this.category"
                                       @showAddForm="showAddForm"
                                       @deleteCategory="deleteCategory"
                                       @showEditForm="showEditForm"
                                       @addProductToCategory="addProductToCategory"
                                       @createProduct="createProduct"
                                       @deleteProductToCategory="deleteProductToCategory">

                            </tree-menu>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="addForm" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add Category or Subcategory</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="success_add" class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Created</strong>
                        </div>
                        <form autocomplete="off" @submit.prevent="addCategory" ref="add_category">
                            <div class="form-group" v-bind:class="{ 'has-danger': has_error_add && errors_add.name }">
                                <label for="name_add">Name</label>
                                <input type="text" id="name_add" name="name" ref="name" class="form-control"
                                       v-model="category_add.name">
                                <span class="help-block"
                                      v-if="has_error_add && errors_add.name">{{ errors_add.name }}</span>
                            </div>
                            <input type="hidden" id="parent_id" name="parent_id" ref="parent_id"
                                   :value="this.parent_id">
                            <div class="form-group" v-bind:class="{ 'has-error': has_error_add && errors_add.description }">
                                <label for="description_add">Description</label>
                                <textarea id="description_add" name="description" ref="description" class="form-control"
                                          v-model="category_add.description"></textarea>
                                <span class="help-block"
                                      v-if="has_error_add && errors_add.description">{{ errors_add.description }}</span>
                            </div>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
        <div class="modal" id="editForm" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Update Category №:{{this.category_update.id}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="success_update" class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Updated</strong>
                        </div>
                        <form autocomplete="off" @submit.prevent="editCategory" ref="update_category">
                            <div class="form-group"
                                 v-bind:class="{ 'has-danger': has_error_update && errors_update.name }">
                                <label for="name">Name</label>
                                <input type="text" id="name" name="name" ref="name" class="form-control"
                                       v-model="category_update.name">
                                <span class="help-block" v-if="has_error_update && errors_update.name">{{ errors_update.name }}</span>
                            </div>

                            <div class="form-group"
                                 v-bind:class="{ 'has-danger': has_error_update && errors_update.parent_id }">
                                <label for="parent_id_update">Parent</label>
                                <select type="text" id="parent_id_update" name="parent_id" class="form-control"
                                        ref="parent_id"
                                        v-model="category_update.parent_id"
                                        v-bind:class="{ 'is-invalid': errors_update.parent_id}">
                                    <option value="0">Main</option>
                                    <option v-for="option in flatted" v-bind:value="option.id">{{ option |
                                        depth(flatted) }}
                                    </option>
                                </select>
                                <span class="invalid-feedback" v-if="has_error_update && errors_update.parent_id">{{ errors_update.parent_id }}</span>
                            </div>

                            <div class="form-group"
                                 v-bind:class="{ 'has-error': has_error_update && errors_update.end_release }">
                                <label for="description">Description</label>
                                <textarea id="description" name="description" ref="note" class="form-control"
                                          v-model="category_update.description"></textarea>
                                <span class="help-block" v-if="has_error_update && errors_update.note">{{ errors_update.description }}</span>
                            </div>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    </div>


</template>
<script>
    import treeMenu from '../../../components/Admin/treeMenu'
    import categoryServices from "../../../services/categoryServices";

    export default {

        data() {
            return {
                categories_all: null,
                categories: null,
                category: false,
                category_child: null,
                category_products: null,

                success_add: false,
                has_error_add: false,
                category_add: {},
                error_add: '',
                errors_add: {},
                parent_id: null,
                success_update: false,
                has_error_update: false,
                category_update: {},
                error_update: '',
                errors_update: {},

                check: 0,
                attributes: null,
                attribute_check: [],

                keywords: '',
                results: [],

                product_types: null,
                product_id: null,
                category_product_id: null,
                product_id_replacement: null,
                product_id_replacement_text: null,
                types: null

            }
        },
        filters: {
            depth(option, items) {
                let depth = 0
                // 3. The magic happens here with a recursive function to find the depth to which each option is nested.
                const pad = ({parent_id}) => {
                    if (!!parent_id) {
                        depth += 1

                        let parent = items.find(({id}) => id === parent_id)

                        if (!parent) {
                            return depth
                        }

                        return pad(parent)
                    }

                    return depth
                }

                // 4. Call the recursive function above, create an array of hyphens and concat them together with the option's text.
                return Array(pad(option)).fill('-').concat([' ', option.name]).join('')
            }
        },
        components: {
            treeMenu
        },

        mounted() {
            this.getCategories()

        },
        updated() {

        },

        methods: {

            addProductToCategory(product, category) {
                categoryServices.addProductCategory(this, category.id, product.id)
            },
            deleteProductToCategory(product) {
                categoryServices.deleteProductToCategory(this, product)
            },
            createProduct() {
                this.$router.push({
                    name: 'admin.dashboard.product.add', params: {
                        product_types: this.product_types
                    }
                })
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
            fetch_replacement() {
                if (this.keywords_replacement != '') {
                    axios.get('/categories/search', {params: {keywords: this.keywords_replacement}})
                        .then(response => this.results_replacement = response.data)
                        .catch(error => {
                        });
                } else {
                    this.results_replacement = []
                }

            },
            flat(items) {
                let final = []
                let self = this
                $.each(items, function (item, value) {
                    final.push(value)
                    if (typeof value.child !== 'undefined') {
                        final = final.concat(self.flat(value.child));
                    }
                })

                return final;
            },
            showAddForm(parent_id) {
                this.parent_id = parent_id;
                this.has_error_add = false
                this.category_add = {}
                this.error_add = ''
                this.errors_add = {}
                this.success_add = false
                $('#addForm').modal('show');

            },
            showEditForm(id) {
                this.checkCategory(id, 'update')
                this.has_error_update = false
                this.category_update = {}
                this.error_update = ''
                this.errors_update = {}
                this.success_update = false
                $('#editForm').modal('show');

            },
            addCategory() {
                this.error = {};
                categoryServices.addCategory(this)
            },

            addReplacement() {
                this.errors_replacement_add = {};
                categoryServices.addReplacement(this)
            },

            editCategory() {
                categoryServices.updateCategory(this, this.category_update.id)
            },
            deleteCategory(id) {
                categoryServices.deleteCategory(this, id);
            },
            checkCategory(id, name) {
                categoryServices.getCategory(this, id, name)
            },
            checkMainCategory(id, name) {
                this.check = id;
                categoryServices.getCategory(this, id, name)
            },
            getCategories() {
                categoryServices.getCategories(this)
            },
            createUser() {
                this.$router.push({name: 'admin.dashboard.categories.add'})
            }
        },
        watch: {
            categories(cat) {
                if (this.check != 0) {
                    this.checkMainCategory(this.check, 'check');
                }
            },
            keywords(after, before) {
                this.fetch();
            },
            keywords_replacement(after, before) {
                this.fetch_replacement();
            }
        },
        computed: {
            flatted: function () {
                return this.flat(this.categories);
            },
            create() {

            }
        }


    }
</script>
<style scoped>
    /* The customcheck */
    .customcheck {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .customcheck input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: -7px;
        left: 10px;
        height: 25px;
        width: 25px;
        background-color: #eee;
        border-radius: 5px;
    }

    /* On mouse-over, add a grey background color */
    .customcheck:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .customcheck input:checked ~ .checkmark {
        background-color: #4e73df;
        border-radius: 5px;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .customcheck input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .customcheck .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>
