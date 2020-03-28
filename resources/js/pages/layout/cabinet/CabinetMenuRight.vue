<template>
    <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
        <div class="p-3">
            <h5>Settings</h5>
            <a class="sidebar" href="#" @click.prevent="$auth.logout()"> <i
                    class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout</a>
        </div>
    </aside>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            activeMenu(name, child = null) {
                if (child) {
                    return (this.$route.meta.link_active == name) && (this.$route.meta.link_child_active == child) ? 'active' : ''
                }
                return this.$route.meta.link_active == name ? 'active' : ''
            },
            menu: function () {
                window.$(".sidebar").toggleClass("toggled");
                if (window.$(".sidebar").hasClass("toggled")) {
                    window.$('.sidebar .collapse').collapse('hide');
                }
                ;
            },
        },
        mounted() {

        }
    }
</script>
