import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  // {
  //   path: 'dashboard',
  //   element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
  //   children: [
  //     {
  //       path: 'userhome',
  //       element: <UserHome></UserHome>
  //     },
  //   ]
  // }
]);
