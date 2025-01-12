import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-[200px]">
      <div className="w-16 h-16 border-4 border-yellow-600 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
