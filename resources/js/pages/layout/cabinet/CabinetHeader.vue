<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">Dashboard</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item">
                            <router-link  :to="{name: 'admin.dashboard'}">Dashboard</router-link>
                        </li>
                        <li v-if="route.meta.link_active != 'dashboard'" class="breadcrumb-item active">{{firstUpperCase(this.route.meta.link_active)}}</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
</template>
<script>
    export default {
        props: ['route'],
        data() {
            return {
            }
        },
        methods: {
            firstUpperCase(string) {
                    if (typeof string !== 'string') return '';

                    return string.charAt(0).toUpperCase() + string.slice(1)
                }
        },
        mounted() {

        },
        watch:{


        }
    }
</script>
