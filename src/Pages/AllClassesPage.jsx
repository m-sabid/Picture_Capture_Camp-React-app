import { useQuery } from "@tanstack/react-query";
import { FaChevronCircleRight } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import SiteHeaderTitle from "../Components/Shared/SiteHeaderTitle";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../Components/Shared/baseurl";

const AllClassesPage = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get(`/api/all-classes`);
    return res.data;
  });

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

      <div className="container my-10 mx-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {classes.map((res) => (
          <div key={res._id} className="">
            <div
              className={`card card-compact ${res.seats === 0 ? "bg-red-500" : "bg-base-100"} shadow-xl`}
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
                  disabled={res.seats === 0}
                >
                  Select Class
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClassesPage;
