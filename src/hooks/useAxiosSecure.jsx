import { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../Components/Shared/baseurl";
import { AuthContext } from "../providers/AuthProvider";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const axiosSecure = axios.create({
    baseURL: `${BASE_URL}`,
  });

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token"); // Retrieve token from local storage
      config.headers["Authorization"] = `Bearer ${token}`; // Inject authorization header
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          logout()
            .then(() => {
              navigate("/login");
            })
            .catch((logoutError) => {
              console.log("Error during logout:", logoutError);
              navigate("/login");
            });
        }
        return Promise.reject(error);
      }
    );
  }, [axiosSecure, logout, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;
