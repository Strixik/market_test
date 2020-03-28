<template>
    <div class="container-fluid">
        <div class="row">
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-warning">
                    <div class="inner">
                        <h3>1</h3>

                        <p>Users</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-person-add"></i>
                    </div>
                    <router-link class="small-box-footer" v-if="$auth.check(2)"
                                 :to="{name: 'admin.dashboard.users'}">
                        More info <i class="fas fa-arrow-circle-right"></i>
                    </router-link>
                </div>
            </div>
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-info">
                    <div class="inner">
                        <h3>10</h3>

                        <p>Categories</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-folder"></i>
                    </div>
                    <router-link class="small-box-footer" v-if="$auth.check(2)"
                                 :to="{name: 'admin.dashboard.categories'}">
                        More info <i class="fas fa-arrow-circle-right"></i>
                    </router-link>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-success">
                    <div class="inner">
                        <h3>53</h3>

                        <p>Products</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-calendar"></i>
                    </div>
                    <router-link class="small-box-footer" v-if="$auth.check(2)"
                                 :to="{name: 'admin.dashboard.products'}">
                        More info <i class="fas fa-arrow-circle-right"></i>
                    </router-link>
                </div>
            </div>
        </div>
        <!-- /.row -->
    </div>
        </template>
        <script>
            export default {
                data() {
                    return {
                        data: {
                            usersCount: 0,
                            categoriesCount: 0,
                            productsCount: 0,
                            role: null
                        }


                    }
                },
                components: {

                },
                methods: {
                    getUserRole() {
                       let role =  this.$auth.user().role;
                        if(role == 0){
                            this.role =  'User';
                        }

                        if(role == 1){
                            this.role =  'Manager';
                        }

                        if(role == 2){
                            this.role =  'Admin';
                        }
                    },
                },


                created: function () {
                    this.getUserRole()
                },
                mounted() {

                },

                beforeDestroy: function () {

                },
            }
        </script>
        <style scoped>

        </style>
