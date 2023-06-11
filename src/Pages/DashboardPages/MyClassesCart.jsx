import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import DashboardHeader from "../../Components/Shared/DashboardHeader";
import axios from "axios";
import BASE_URL from "../../Components/Shared/baseurl";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyClassesCart = () => {
  const { user } = useContext(AuthContext);
  const [classesCart, setClassesCart] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const response = await axiosSecure.get(`/api/all-carts`);
    setClassesCart(response.data.filter((email) => email.email === user.email));
  });

  const handleDelete = async (cartId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${BASE_URL}/api/carts/${cartId}`);
          Swal.fire("Deleted!", "The item has been deleted.", "success");
          refetch();
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the item.",
            "error"
          );
        }
      }
    });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <DashboardHeader title={"My Classes"} />

      <div className="overflow-x-auto">
        <table className="table mt-10">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Classes</th>
              <th>Price</th>
              <th>Delete</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {classesCart.map((classItem, index) => (
              <tr key={classItem._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12">
                        <img
                          src={classItem.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{classItem.title}</div>
                    </div>
                  </div>
                </td>
                <td className="font-bold text-blue-500">{classItem.price}</td>
                <td>
                  <button
                    className="btn bg-red-300 hover:bg-red-500 hover:text-white"
                    onClick={() => handleDelete(classItem._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button className="btn bg-blue-300 hover:bg-blue-500 hover:text-white">
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClassesCart;
