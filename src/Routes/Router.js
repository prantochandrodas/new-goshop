
import Main from "../Layout/Main/Main";
import MyOrders from "../MyOrders/MyOrders";
import About from "../pages/About/About";
import AddProduct from "../pages/AddProduct/AddProduct";
import AllProducts from "../pages/AllProducts/AllProducts";
import BuyProduct from "../pages/BuyProduct/BuyProduct";
import DashBoard from "../pages/DashBoard/DashBoard/DashBoard";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import ManageSeller from "../pages/ManageSeller/ManageSeller";
import ManageUser from "../pages/ManageUser/ManageUser";
import MyProducts from "../pages/MyProducts/MyProducts";

import Products from "../pages/Products/Products";
import SignUp from "../pages/Signup/SignUp";
import WatchLater from "../pages/WatchLater/WatchLater";
import PrivetRoute from "./PrivetRoute";



const { createBrowserRouter } = require("react-router-dom");

export const router=createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<PrivetRoute>
                    <Home></Home>
                </PrivetRoute>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'/login',
                element:<Login></Login>
            }
            ,{
                path:'/about',
                element:<PrivetRoute>
                    <About></About>
                </PrivetRoute>
            },
            {
                path:'/product/:id',
                loader:({params})=>fetch(` https://goshop-server-teal.vercel.app/products/${params.id}`),               
                element:<Products></Products>
            },
            {
                path:'/buyProduct/:id',
                loader:({params})=>fetch(` https://goshop-server-teal.vercel.app/buyProduct/${params.id}`),               
                element:<BuyProduct></BuyProduct>
            },
            {
                path:'/MyOrders',
                element:<MyOrders></MyOrders>
            }, 
            {
                path:'/WatchLater',
                element:<WatchLater></WatchLater>
            },
            {
                path:'/AllProduct',
                element:<AllProducts></AllProducts>
            }

        ]
    },
    {
        path:'/dashboard',
        element:<DashBoard></DashBoard> ,
        children:[
            {
                path:'/dashboard',
                element:<WatchLater></WatchLater>
            },
            {
                path:'/dashboard/MyOrders',
                element:<MyOrders></MyOrders>
            },
            {
                path:'/dashboard/addProduct',
                element:<AddProduct></AddProduct> 
            },
            {
                path:'/dashboard/myproduct',
                element:<MyProducts></MyProducts>
            },
            {
                path:'/dashboard/manageUser',
                element:<ManageUser></ManageUser>
            },
            {
                path:'/dashboard/manageSeller',
                element:<ManageSeller></ManageSeller>
            }
        ]
    }
]); 