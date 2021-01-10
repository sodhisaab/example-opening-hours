import React from "react";
import AddHours from "./AddHours";
import ShowHours from "./ShowHours";

const OpeningHours: React.FC = () => {
  return (
    <div className="mt-5 container">
      <div className="row">
        <div className="col-sm">
          <ShowHours />
        </div>
        <div className="col-sm">
          <AddHours />
        </div>
      </div>
    </div>
  );
};

export default OpeningHours;
