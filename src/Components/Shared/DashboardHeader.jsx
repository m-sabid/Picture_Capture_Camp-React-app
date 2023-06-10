import React from "react";

const DashboardHeader = ({ title, subtitle }) => {
  return (
    <div className="w-full bg-primary text-secondary py-5 text-center rounded-b-full shadow-2xl border-b-4 border-quaternary shadow-focus">
      <h2 className="uppercase font-bold text-3xl">{title ? title : ""}</h2>
      <p>{subtitle ? subtitle : ""}</p>
    </div>
  );
};

export default DashboardHeader;
