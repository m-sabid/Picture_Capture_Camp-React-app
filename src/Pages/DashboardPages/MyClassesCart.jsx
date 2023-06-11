import { useQuery } from "@tanstack/react-query";
import DashboardHeader from "../../Components/Shared/DashboardHeader";

const MyClassesCart = () => {
    const { data: classes = [], refetch } = useQuery(["classes"], async () => {
        const res = await axiosSecure.get(`api/show-all/carts`);
        return res.data;
      });


  return (
    <div>
      <DashboardHeader title={"My Classes"} />
    </div>
  );
};

export default MyClassesCart;
