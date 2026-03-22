import HomePage from "./routes/homePage/homePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/listPage";

import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import NewPostPage from "./routes/newPostPage/newPostPage"
import Login from "./routes/login/login";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import Register from "./routes/register/register";
import {Layout, RequireAdminAuth, RequireAuth } from "./routes/layout/layout";
import ModPostPage from "./routes/modPostPage/modPostPage";
import { getUserInfo, listPageLoader, listUserLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import ContactInfoPage from "./routes/contactInfoPage/contactInfoPage";
import LoginAdmin from "./routes/loginAdmin/loginAdmin";
import ListUsers from "./routes/listUsers/listUsers";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        
        {
          path:"/:id",
          element:<SinglePage/>,
          loader: singlePageLoader
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader: listPageLoader

        },
        
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/loginAdmin",
          element:<LoginAdmin/>
        },
      ]
    },
    {
      path:"/",
      element: <RequireAuth/>,
      children:[
        {
          path:"/profile",
          element:<ProfilePage/>,
          loader: profilePageLoader
        },
        {
          path:"/profile/:id",
          element:<ProfilePage/>,
          loader: profilePageLoader
        },
        {
          path: "/profileUpdate/:id",
          element: <ProfileUpdatePage/>,
          loader: getUserInfo
        },
        {
          path: "/add",
          element: <NewPostPage/>
        },
        {
          path: "/mod/:id",
          element: <ModPostPage/>,
          loader: singlePageLoader
        },
        {
          path: "/userContact/:id",
          element: <ContactInfoPage/>,
          loader: getUserInfo
        }
        

      ]
    },
    {
      path:"/",
      element: <RequireAdminAuth/>,
      children:[
        
        
        {
          path: "/listUsers/",
          element: <ListUsers/>,
          loader: listUserLoader
        },
        {
          path: "/add/:id",
          element: <NewPostPage/>,
          loader: getUserInfo
        },
        

      ]
    }

  ]);

function App() {

  return (

    <RouterProvider router={router}/>
  );
}

export default App;
