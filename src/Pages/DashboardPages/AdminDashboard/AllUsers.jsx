import React, { useState, useEffect, createContext, useContext } from "react";
import { FaUserShield, FaChalkboardTeacher } from "react-icons/fa";
import BASE_URL from "../../../Components/Shared/baseurl";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get(`/api/users`);
    return res.data;
  });

  const updateRole = (userId, role) => {
    fetch(`${BASE_URL}/user/role/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
        }
      });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const makeAdmin = (userId) => {
    updateRole(userId, "admin");
    refetch();
  };

  const makeInstructor = (userId) => {
    updateRole(userId, "instructor");
    refetch();
  };

  return (
    <div>
      <h2 className="my-10 text-center text-3xl font-bold border-b-2 pb-3">
        All Users - {users.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-3/5 mx-auto font-bold">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="flex gap-2 justify-center items-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover">
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex gap-2 justify-center items-center">
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      onClick={() => makeAdmin(user._id)}
                      title="Make Admin"
                      className="text-green-600 bg-gray-200 text-2xl p-2 rounded-full cursor-pointer"
                    >
                      <FaUserShield />
                    </button>
                  )}
                  {user.role === "user" && (
                    <div className="flex gap-4 justify-center items-center">
                      <button
                        onClick={() => makeInstructor(user._id)}
                        title="Make Instructor"
                        className="text-green-600 bg-gray-200 text-2xl p-2 rounded-full cursor-pointer"
                      >
                        <FaChalkboardTeacher />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
