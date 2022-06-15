import Login from "./Login";
import Products from "./Products";

export default [
    {
        path:'/',
        element: <Login />
    },
    {
        path: '/products',
        element: <Products />
    }
]