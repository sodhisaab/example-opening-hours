import React, { useState } from "react";
import TimeField from "react-simple-timefield";

const DAY_LOOKUP = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type HoursType = { day: number; from: string; to: string };

const AddHours: React.FC = () => {
  const [hours, setHours] = useState<HoursType[]>([
    { day: 0, from: "09:00", to: "12:00" },
    { day: 1, from: "10:00", to: "11:00" },
    { day: 2, from: "09:00", to: "12:00" },
    { day: 3, from: "09:00", to: "11:00" },
    { day: 4, from: "09:00", to: "12:00" },
    { day: 5, from: "16:00", to: "18:00" },
    { day: 6, from: "16:00", to: "18:00" },
  ]);

  const handleOnHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, slot, id } = e.target;

    const idx = Number(id);

    let newHours = [...hours];

    newHours[idx] = {
      ...newHours[idx],
      from: hours[idx].from,
      to: hours[idx].to,
      [slot]: value,
    };

    setHours(newHours);
  };

  const handleOnFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const days: {
      days: number[];
      from: string;
      to: string;
    }[] = [];

    const filteredArr: HoursType[] = hours.reduce(
      (acc: any, current: HoursType) => {
        const x = acc.find(
          (hour: HoursType) =>
            hour?.from === current.from && hour?.to === current.to
        );

        return !x ? acc.concat([current]) : acc;
      },
      []
    );

    // console.log("Prince ~ filteredArr", filteredArr);
    filteredArr.map((x) => {
      var results = hours.filter(
        (item) => item?.from === x.from && item?.to === x.to
      );

      days.push({
        days: results.map(({ day }) => day),
        from: results[0].from,
        to: results[0].to,
      });

      return null;
    });
    console.log(
      "Prince ~ handleOnFormSubmit ~ days",
      JSON.stringify(days, null, 2)
    );
  };

  return (
    <div className="mt-5">
      <h3>Add opening hours</h3>
      <div className="">
        <form onSubmit={(e) => handleOnFormSubmit(e)}>
          {hours.map((hour, i) => {
            const { day } = hour;
            return (
              <div className="row" key={day}>
                <div className="col">
                  {DAY_LOOKUP[day]} {i}
                </div>
                <div className="col">
                  <div className="input-group mb-3">
                    <TimeField
                      value={hour.from}
                      onChange={handleOnHoursChange}
                      input={
                        <input
                          type="text"
                          className="form-control"
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
                      value={hour.to}
                      onChange={handleOnHoursChange}
                      input={
                        <input
                          type="text"
                          className="form-control"
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
          <div className="row">
            <div className="col-6">
              <button className="btn btn-primary w-100" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHours;
