import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import BASE_URL from "../Components/Shared/baseurl";
import { FaChevronCircleRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Bounce } from "react-awesome-reveal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import SiteHeaderTitle from "../Components/Shared/SiteHeaderTitle";
import { AuthContext } from "../providers/AuthProvider";

const AllClassesPage = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  

  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get(`/api/all-classes`);
    return res.data;
  });

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    fetchUserRole();
  }, []);

  async function fetchUserRole() {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      const foundUser = response.data.find(
        (dt) => dt.email === user?.email
      );
      if (foundUser) {
        setUserRole(foundUser.role);
      }
    } catch (error) {
      console.error("Error fetching user role", error);
    }
  }

  

  const handleSelectClass = async (addedClasses) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized Access",
        text: "You are logged in as an admin or instructor. Selecting a class is not allowed.",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/classes/cart`, {
        title: addedClasses.title,
        id: addedClasses._id,
        seats: addedClasses.seats,
        price: addedClasses.price,
        image: addedClasses.image,
        instructorName: addedClasses.instructorName,
        instructorEmail: addedClasses.instructorEmail,
        students: addedClasses.students,
        userName: user.displayName,
        email: user.email,
      });

      Swal.fire({
        icon: "success",
        title: "Class Added",
        text: "The class has been added to your cart successfully.",
      });
    } catch (error) {
      let errorMessage =
        "An error occurred while adding the class to the cart.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };

  return (
    <div>
      <SiteHeaderTitle title={"All Classes"} />

      <div className="container my-10 mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {classes.map((res) => (
          <Bounce key={res._id}>
            <div className="">
              <div
                className={`card card-compact w-full ${
                  res.seats === 0 ? "bg-red-500" : "bg-base-100"
                } shadow-xl`}
              >
                <figure>
                  <img
                    src={res.image}
                    alt="Shoes"
                    className="h-44 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-blue-500">{res.title}</h2>
                  <h2 className="">
                    <strong> Instructor: </strong> {res.instructorName}
                  </h2>
                  <h2 className="">
                    <strong> Instructor: </strong> {res.instructorEmail}
                  </h2>
                  <hr />
                  <ul className="my-2 bg-gray-100 p-3 rounded-md">
                    <li className="flex items-center gap-2 ml-2">
                      <FaChevronCircleRight /> <strong> Price: </strong>$
                      {res.price}
                    </li>
                    <li className="flex items-center gap-2 ml-2">
                      <FaChevronCircleRight /> <strong> Seats: </strong>
                      {res.seats}
                    </li>
                  </ul>
                  <hr />
                  <button
                    className="btn bg-primary text-white"
                    onClick={() => handleSelectClass(res)}
                    disabled={
                      res.seats === 0 ||
                      userRole === "admin" ||
                      userRole === "instructor"
                    }
                  >
                    Select Class
                  </button>
                </div>
              </div>
            </div>
          </Bounce>
        ))}
      </div>
    </div>
  );
};

export default AllClassesPage;
