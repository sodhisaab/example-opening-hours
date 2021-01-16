import React, { useState, useEffect } from "react";
import { DAY_LOOKUP, MergedHours } from "./AddHours";

const ShowHours: React.FC<{ hours: MergedHours[] }> = ({ hours }) => {
  const [openHours, setOpenHours] = useState<MergedHours[]>(hours);

  useEffect(() => {
    setOpenHours(hours);
  }, [setOpenHours, hours]);

  if (!openHours) {
    return null;
  }

  return (
    <>
      <h3>Opening hours</h3>
      {openHours.map((group: MergedHours) =>
        group.days.map((day) => (
          <div className="row" key={day}>
            <div className="col-2 font-weight-bold"> {DAY_LOOKUP[day]}</div>
            {group.isClosed ? (
              <div className="col-2">Closed</div>
            ) : (
              <>
                <div className="col-2">{group.from}</div>
                <div className="col-2"> {group.to}</div>
              </>
            )}
          </div>
        ))
      )}
    </>
  );
};

export default ShowHours;
