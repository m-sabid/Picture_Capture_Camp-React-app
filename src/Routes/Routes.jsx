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
import AllClassesPage from "../Pages/AllClassesPage";
import MyClassesCart from "../Pages/DashboardPages/MyClassesCart";
import Payment from "../Pages/DashboardPages/Payment";
import EnrolledClasses from "../Pages/DashboardPages/EnrolledClasses";
import PaymentHistory from "../Pages/DashboardPages/PaymentHistory";
import InstructorClasses from "../Pages/DashboardPages/InstructorDashboard/InstructorClasses";
import InstructorFeedback from "../Pages/DashboardPages/InstructorDashboard/InstructorFeedback";
import InstructorsPage from "../Pages/InstructorsPage";

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
      {
        path: "/classes",
        element: <AllClassesPage />,
      },
      {
        path: "/instructors",
        element: <InstructorsPage />,
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
      {
        path: "manage-classes",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      {
        path: "instructor-add-class",
        element: <AddClasses />,
      },
      {
        path: "instructor-my-class",
        element: <InstructorClasses />,
      },
      {
        path: "instructor-feedback",
        element: <InstructorFeedback />,
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
        path: "my-classes",
        element: <MyClassesCart />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "enrolled-classes",
        element: <EnrolledClasses />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
    ],
  },
]);
