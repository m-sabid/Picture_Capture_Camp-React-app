import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";
import SignupPage from "../Pages/SignupPage";
import LoginPage from "../Pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup-page",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
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
