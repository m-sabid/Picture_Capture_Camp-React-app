

const SiteHeaderTitle = ({title, subtitle}) => {
  return (
    <div className="header bg-primary text-white py-4 px-8 text-center uppercase">
      <h1 className="text-2xl font-bold">{title ? title : "" }</h1>
      <p className="text-sm mt-1">{subtitle ? subtitle : ""}</p>
    </div>
  );
};

export default SiteHeaderTitle;
