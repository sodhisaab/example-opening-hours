import React, { useState, useEffect } from "react";
import AddHours, { MergedHours } from "./AddHours";
import ShowHours from "./ShowHours";
import StoredInDB from "./StoredInDB";

const OpeningHours: React.FC = () => {
  const [mergedHours, setMergedHours] = useState<MergedHours[] | []>([]);

  useEffect(() => {
    setMergedHours(mergedHours);
  }, [mergedHours, setMergedHours]);

  return (
    <div className="mt-5 container">
      <div className="row mt-5 mb-5">
        <div className="col-sm">
          <AddHours mergedOpeningHours={(hours) => setMergedHours(hours)} />
        </div>
        <div className="col-sm">
          <ShowHours hours={mergedHours} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <StoredInDB hours={mergedHours} />
        </div>
      </div>
    </div>
  );
};

export default OpeningHours;
