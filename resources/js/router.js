import VueRouter from 'vue-router'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import AdminDashboard from './pages/admin/Dashboard'
import PageNotFound from './pages/error/PageNotFound'
import PageForbidden from './pages/error/PageForbidden'
import Users from './pages/admin/users/Users'
import AddUser from './pages/admin/users/AddUser'
import UpdateUser from "./pages/admin/users/UpdateUser";
import ShowUser from "./pages/admin/users/ShowUser";
import Product from "./pages/admin/products/Product";
import AddProduct from "./pages/admin/products/AddProduct";
import EditProduct from "./pages/admin/products/EditProduct";
import Categories from "./pages/admin/categories/Categories";
// Routes

const routes = [
    {
        path: '/src/register',
        name: 'register',
        component: Register,
        meta: {
            auth: false
        },
        beforeEnter: authRoutesGuard
    },
    {
        path: '/src/login',
        name: 'login',
        component: Login,
        meta: {
            // auth: false
        },
        beforeEnter: authRoutesGuard
    },
    // ADMIN ROUTES
    {
        path: '/src/admin/dashboard',
        name: 'admin.dashboard',
        component: AdminDashboard,
        meta: {
            auth: {roles: 2, redirect: {name: 'login'}, forbiddenRedirect: '/src/403'},
            link_active: 'dashboard'
        },
        beforeEnter: authRoutesGuard
    },
    // ADMIN ROUTES FOR USER EDIT
    {
        path: '/src/admin/dashboard/users',
        name: 'admin.dashboard.users',
        component: Users,
        meta: {
            auth: {roles: 2, redirect: {name: 'login'}, forbiddenRedirect: '/src/403'},
            link_active: 'users'
        },
        beforeEnter: authRoutesGuard
    },

    {
        path: '/src/admin/dashboard/users/add',
        name: 'admin.dashboard.users.add',
        name_nav: 'Add',
        props: true,
        component: AddUser,
        meta: {
            auth: {roles: 2, redirect: {name: 'login'}, forbiddenRedirect: '/src/403'},
            link_active: 'users'
        },
        beforeEnter: authRoutesGuard
    },

    {
        path: '/src/admin/dashboard/users/:userId',
        name: 'admin.dashboard.users.show',
        component: ShowUser,
        props: true,
        meta: {
            auth: {roles: 2, redirect: {name: 'login'}, forbiddenRedirect: '/src/403'},
            link_active: 'users'
        },
        beforeEnter: authRoutesGuard
    },
    {
        path: '/src/admin/dashboard/users/update/:userId',
        name: 'admin.dashboard.users.update',
        props: true,
        component: UpdateUser,
        meta: {
            auth: {roles: 2, redirect: {name: 'login'}, forbiddenRedirect: '/src/403'},
            link_active: 'users'
        },
        beforeEnter: authRoutesGuard
    },

    // ADMIN ROUTES FOR CATALOG EDIT
    {
        path: '/src/admin/dashboard/categories',
        name: 'admin.dashboard.categories',
        component: Categories,
        meta: {
            auth: {roles: 2, redirect: {name: 'login'}, forbiddenRedirect: '/src/403'},
            link_active: 'categories'
        },
        beforeEnter: authRoutesGuard
    },

    // ADMIN ROUTES FOR PRODUCT EDIT
    {
        path: '/src/admin/dashboard/products',
        name: 'admin.dashboard.products',
        component: Product,
        meta: {
            auth: {roles: 2, redirect: {name: 'login'}, forbiddenRedirect: '/src/403'},
            link_active: 'products'
        },
        beforeEnter: authRoutesGuard
    },

    {
        path: '/src/admin/dashboard/product/add',
        name: 'admin.dashboard.product.add',
        name_nav: 'Add',
        props: true,
        component: AddProduct,
        meta: {
            auth: {roles: 2, redirect: {name: 'login'}, forbiddenRedirect: '/src/403'},
            link_active: 'new product'
        },
        beforeEnter: authRoutesGuard
    },

    {
        path: '/src/admin/dashboard/product/update/:productId',
        name: 'admin.dashboard.product.update',
        props: true,
        component: EditProduct,
        meta: {
            auth: {roles: 2, redirect: {name: 'login'}, forbiddenRedirect: '/src/403'},
            link_active: 'edit product'
        },
        beforeEnter: authRoutesGuard
    },
    // ERROR ROUTES
    {
        path: '/src/404',
        name: '404',
        name_nav: '404',
        component: PageNotFound,
    },
    {
        path: '/src/403',
        name: '403',
        name_nav: '403',
        component: PageForbidden,
    },

    {path: "*", component: PageNotFound}

]

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
});

export default router

function authRoutesGuard(to, from, next) {

    if (to.path.indexOf('/admin') === 0) {

    }
    next();

};
