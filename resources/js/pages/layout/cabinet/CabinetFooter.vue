<template>
    <footer class="main-footer">
        <strong> <span>Copyright &copy; Your Website {{getFullYear()}}</span></strong>
        All rights reserved.
        <div class="float-right d-none d-sm-inline-block">
            <b>Version</b> 3.0.2
        </div>
    </footer>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            checkUserRole: function (path) {
                if(path.search('user') > 0){
                    return true;
                }
                return false;
            },
            getFullYear(){
                return (new Date).getFullYear();
            }
        },
        mounted() {

        }
    }
</script>
