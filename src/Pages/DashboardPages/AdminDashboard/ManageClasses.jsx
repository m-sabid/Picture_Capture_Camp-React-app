import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import DashboardHeader from "../../../Components/Shared/DashboardHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import BASE_URL from "../../../Components/Shared/baseurl";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const [feedback, setFeedback] = useState(""); // State to manage feedback in the modal

  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get(`/api/classes`);
    return res.data;
  });

  const updateStatus = (userId, status, userName) => {
    fetch(`${BASE_URL}/api/classes/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          refetch();
          Swal.fire({
            icon: "success",
            title: status === "approved" ? "Approved" : "Denied",
            text: `${userName} is now ${
              status === "approved" ? "approved" : "denied"
            }.`,
          });
        }
      });
  };

  const handleApprove = (userId, userName) => {
    updateStatus(userId, "approved", userName);
  };

  const handleDeny = (userId, userName) => {
    updateStatus(userId, "denied", userName);
  };

  const handleSendFeedback = (userId) => {
    fetch(`${BASE_URL}/api/classes/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ feedback }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Feedback Submitted",
            text: "Feedback has been submitted successfully.",
          });
        }
      });

    handleCloseModal();
  };

  const handleOpenModal = (defaultFeedback) => {
    setFeedback(defaultFeedback); 
    const modal = document.getElementById("my_modal_1");
    modal.showModal();
  };

  const handleCloseModal = () => {
    const modal = document.getElementById("my_modal_1");
    modal.close();
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div>
      <DashboardHeader title={"Manage Classes"} />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-12">
        {classes.map((res) => (
          <div key={res._id} className="mx-10">
            <dialog id="my_modal_1" className="modal">
              <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">Feedback</h3>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                <div className="modal-action">
                  <button
                    className="btn"
                    onClick={() => handleSendFeedback(res._id)}
                  >
                    Submit
                  </button>
                  <button className="btn" onClick={handleCloseModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </dialog>

            <div className="card card-compact bg-base-100 shadow-xl">
              <figure>
                <img src={res.image} alt="Shoes" />
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
                <div className="card-actions justify-end">
                  {res.status === "pending" && (
                    <>
                      <button
                        className="bg-gray-300 rounded-md text-primary p-2"
                        disabled
                      >
                        Pending
                      </button>
                      <button
                        className="bg-green-500 rounded-md text-primary hover:bg-secondary hover:text-primary p-2"
                        onClick={() =>
                          handleApprove(res._id, res.instructorName)
                        }
                        disabled={res.isDisabled}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-300 rounded-md text-primary hover:bg-red-600 hover:text-white p-2"
                        onClick={() => handleDeny(res._id, res.instructorName)}
                        disabled={res.isDisabled}
                      >
                        Deny
                      </button>
                    </>
                  )}
                  {res.status === "approved" && (
                    <>
                      <button
                        className="bg-gray-300 rounded-md text-primary p-2"
                        disabled
                      >
                        Approved
                      </button>
                      <button
                        className="bg-red-300 rounded-md text-primary hover:bg-red-600 hover:text-white p-2"
                        disabled
                      >
                        Deny
                      </button>
                    </>
                  )}
                  {res.status === "denied" && (
                    <>
                      <button
                        className="bg-gray-300 rounded-md text-primary p-2"
                        disabled
                      >
                        Denied
                      </button>
                      <button
                        className="bg-green-500 rounded-md text-primary hover:bg-secondary hover:text-primary p-2"
                        disabled
                      >
                        Approve
                      </button>
                    </>
                  )}
                  <button
                    className="bg-blue-500 rounded-md text-primary hover:bg-blue-600 hover:text-white p-2"
                    onClick={() => handleOpenModal(res.feedback)}
                  >
                    Send Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageClasses;
