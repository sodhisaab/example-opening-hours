import React, { useState } from "react";
import TimeField from "react-simple-timefield";

const DAY_LOOKUP = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type HoursType = { [key: string]: { from: string; to: string } };

const AddHours: React.FC = () => {
  const [hours, setHours] = useState<HoursType>({
    sun: { from: "", to: "" },
    mon: { from: "", to: "" },
    tue: { from: "", to: "" },
    wed: { from: "", to: "" },
    thu: { from: "", to: "" },
    fri: { from: "", to: "" },
    sat: { from: "", to: "" },
  });

  const handleOnHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, slot } = e.target;

    setHours((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        [slot]: value,
      },
    }));
  };

  const handleOnFormSubmit = (e: any) => {
    e.preventDefault();
    console.log("handleOnFormSubmit", hours);
  };

  return (
    <div className="mt-5">
      <h3>Add opening hours</h3>
      <div className="">
        <form onSubmit={(e) => handleOnFormSubmit(e)}>
          {DAY_LOOKUP.map((day, i) => {
            return (
              <div className="row" key={day}>
                <div className="col">{day}</div>
                <div className="col">
                  <div className="input-group mb-3">
                    <TimeField
                      value={hours[day.toLowerCase()].from}
                      onChange={handleOnHoursChange}
                      input={
                        <input
                          type="text"
                          className="form-control"
                          name={day.toLowerCase()}
                          id={`first-input-${day}`}
                          slot="from"
                        />
                      }
                      style={{
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="input-group mb-3">
                    <TimeField
                      value={hours[day.toLowerCase()].to}
                      onChange={handleOnHoursChange}
                      input={
                        <input
                          type="text"
                          className="form-control"
                          name={day.toLowerCase()}
                          id={`second-input-${day}`}
                          slot="to"
                        />
                      }
                      style={{
                        width: "100%",
                      }}
                    />
                  </div>
                </div>{" "}
              </div>
            );
          })}
          <button className="btn btn-primary" type="submit">
            save{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHours;
