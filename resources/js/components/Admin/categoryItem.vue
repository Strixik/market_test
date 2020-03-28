<template>
    <tr>
        <td>{{ category.id }}</td>
        <td>{{ category.name }}</td>
        <td>{{ category.description}}</td>
        <td>
            <div class="d-flex p-2 justify-content-center">
                <button v-on:click="editCategory()" class="btn btn-primary m-1"><i class="fas fa-fw fa-edit"></i></button>
                <button v-on:click="deleteCategory(category.id)" class="btn btn-danger m-1"><i class="fas fa-fw fa-trash"></i>
                </button>
            </div>
        </td>
    </tr>
</template>
<script>
    import categoryServices from '../../services/categoryServices'

    export default {
        props: ['category'],
        data() {
            return {}
        },
        components: {},
        created() {

        },
        mounted() {


        },

        methods: {

            editCategory() {
                this.$router.push({name: 'admin.dashboard.category.update', params: {categoryId: this.category.id}})
            },
            deleteCategory() {
                categoryServices.deleteCategory(this);

            },


        }
    }
</script>
