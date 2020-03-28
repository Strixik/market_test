<template>
    <div>

        <div v-if="!this.$route.meta.auth">
            <router-view/>
            <Preloader v-if="loading" />
        </div>

        <div v-if="$route.meta.auth">
            <CabinetMenuTop></CabinetMenuTop>
            <cabinet-menu-left></cabinet-menu-left>
            <div class="content-wrapper">
                <cabinet-header :route="this.$route"></cabinet-header>
                <section class="content">
                    <router-view/>
                </section>
                <Preloader v-if="loading" />
            </div>
            <CabinetFooter></CabinetFooter>
            <cabinet-menu-right></cabinet-menu-right>
            <div id="sidebar-overlay"></div>
        </div>
    </div>
</template>
<script>
    import CabinetMenuTop from "./pages/layout/cabinet/CabinetMenuTop";
    import CabinetHeader from "./pages/layout/cabinet/CabinetHeader";
    import CabinetMenuLeft from "./pages/layout/cabinet/CabinetMenuLeft";
    import CabinetMenuRight from "./pages/layout/cabinet/CabinetMenuRight";
    import Preloader from "./components/Preloader";
    import CabinetFooter from "./pages/layout/cabinet/CabinetFooter";

    export default {
        data() {
            return {
                loading:false
            }
        },
        components: {
            CabinetMenuTop,
            CabinetHeader,
            CabinetMenuLeft,
            CabinetMenuRight,
            CabinetFooter,
            Preloader
        },
        created() {

        },
        methods: {},
        mounted() {



        }
    }
</script>
