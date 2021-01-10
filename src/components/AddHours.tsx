import React, { useState } from "react";
import TimeField from "react-simple-timefield";

const DAY_LOOKUP = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type HoursType = { from: string; to: string };

const AddHours: React.FC = () => {
  const [hours, setHours] = useState<HoursType[]>([
    { from: "", to: "" },
    { from: "", to: "" },
    { from: "", to: "" },
    { from: "", to: "" },
    { from: "", to: "" },
    { from: "", to: "" },
    { from: "", to: "" },
  ]);

  const handleOnHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, slot } = e.target;

    const existingValue = {
      from: hours[Number(name)].from,
      to: hours[Number(name)].to,
      [slot]: value,
    };

    setHours((prevState) => ({
      ...prevState,
      [name]: {
        ...existingValue,
      },
    }));
  };

  const handleOnFormSubmit = (e: any) => {
    e.preventDefault();

    console.log("Prince ~  newHours", JSON.stringify(hours, null, 2));
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
                      value={hours[i].from}
                      onChange={handleOnHoursChange}
                      input={
                        <input
                          type="text"
                          className="form-control"
                          name={`${i}`}
                          id={`${i}`}
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
                      value={hours[i].to}
                      onChange={handleOnHoursChange}
                      input={
                        <input
                          type="text"
                          className="form-control"
                          name={`${i}`}
                          id={`${i}`}
                          slot="to"
                        />
                      }
                      style={{
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
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
