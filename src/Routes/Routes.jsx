import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Main from "../Layout/Main";
import SignupPage from "../Pages/SignupPage";
import LoginPage from "../Pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../Pages/DashboardPages/AdminDashboard/AllUsers";
import AdminHome from "../Pages/DashboardPages/AdminDashboard/AdminHome";
import AddClasses from "../Pages/DashboardPages/InstructorDashboard/AddClasses";
import ManageClasses from "../Pages/DashboardPages/AdminDashboard/ManageClasses";
import AdminRoute from "./AdminRoute";
import AllClasses from "../Pages/DashboardPages/AdminDashboard/AllClasses";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-classes",
        element: (
          <AdminRoute>
            <AllClasses />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "instructor-add-class",
        element: <AddClasses />,
      },
      {
        path: "manage-classes",
        element: <ManageClasses />,
      },
    ],
  },
]);
