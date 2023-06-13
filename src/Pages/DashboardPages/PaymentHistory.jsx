import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DashboardHeader from "../../Components/Shared/DashboardHeader";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const [payments, setPayments] = useState([]);

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const response = await axiosSecure.get(`/api/enrolled`);
    const sortedPayments = response.data
      .filter((email) => email.email === user.email)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    setPayments(sortedPayments);
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <DashboardHeader title={"Payment History"} subtitle={"Page"} />

      <div className="container overflow-x-auto my-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Payment Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => {
              return (
                <tr key={payment.key}>
                  <th>{index + 1}</th>
                  <td>{payment.itemNames}</td>
                  <td>{formatDate(payment.date)}</td>
                  <td className="text-blue-500">$ {payment.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
