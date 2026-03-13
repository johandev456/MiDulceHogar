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
import {Layout, RequireAuth } from "./routes/layout/layout";
import ModPostPage from "./routes/modPostPage/modPostPage";
import { getUserContact, listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import ContactInfoPage from "./routes/contactInfoPage/contactInfoPage";

function App() {
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
        }
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
          path: "/profileUpdate",
          element: <ProfileUpdatePage/>
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
          loader: getUserContact
        }

      ]
    }
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;
