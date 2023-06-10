// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const ManageClasses = () => {
//   const [axiosSecure] = useAxiosSecure();

//   const { data: users = [], refetch } = useQuery(["users"], async () => {
//     const res = await axiosSecure.get(`/api/manage-classes`);
//     console.log(res, "I am from m-class");
//     return res.data;
//   });
//   return (
//     <div>
//       <h1>Hello</h1>
//       {users.map((dt) => {
//         console.log(dt);
//         return (
//           <>
//             <h1>{dt.users}</h1>
//           </>
//         );
//       })}
//     </div>
//   );
// };

// export default ManageClasses;

import React from 'react';

const ManageClasses = () => {
    return (
        <div>
            
        </div>
    );
};

export default ManageClasses;
