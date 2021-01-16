import React, { useState } from "react";
import { DoorClosed, DoorOpenFill } from "react-bootstrap-icons";

import TimeField from "react-simple-timefield";

export const DAY_LOOKUP = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type HoursType = {
  day: number;
  from: string;
  to: string;
  isClosed?: boolean;
};
export type MergedHours = {
  days: number[];
  from: string;
  to: string;
  isClosed?: boolean;
};

const AddHours: React.FC<{
  mergedOpeningHours: (mergedHours: MergedHours[]) => void;
}> = ({ mergedOpeningHours }) => {
  const [hours, setHours] = useState<HoursType[]>([
    { day: 0, from: "09:00", to: "12:00", isClosed: false },
    { day: 1, from: "09:00", to: "12:00", isClosed: false },
    { day: 2, from: "09:00", to: "13:00", isClosed: false },
    { day: 3, from: "09:00", to: "13:00", isClosed: false },
    { day: 4, from: "10:00", to: "14:00", isClosed: false },
    { day: 5, from: "00:00", to: "00:00", isClosed: true },
    { day: 6, from: "00:00", to: "00:00", isClosed: true },
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
      isClosed: false,
    };

    setHours(newHours);
  };

  const handleOnFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const days: {
      days: number[];
      from: string;
      to: string;
      isClosed?: boolean;
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

    filteredArr.map((x) => {
      const results = hours.filter(
        (item) => item?.from === x.from && item?.to === x.to
      );

      const isClosed = results[0].from === "00:00" && results[0].to === "00:00";

      days.push({
        days: results.map(({ day }) => day),
        from: results[0].from,
        to: results[0].to,
        isClosed,
      });

      return null;
    });

    mergedOpeningHours(days);
  };

  const handleOnShopClose = (
    hour: HoursType,
    isClosed: boolean,
    index: number
  ) => {
    const newHours = [...hours];

    newHours[index] = {
      ...newHours[index],
      ...hour,
      from: isClosed ? "00:00" : "09:00",
      to: isClosed ? "00:00" : "17:00",
      isClosed,
    };

    setHours(newHours);
  };

  return (
    <>
      <h3>Add opening hours</h3>
      <div>
        <form onSubmit={(e) => handleOnFormSubmit(e)}>
          {hours.map((hour, i) => {
            const { day, isClosed } = hour;
            return (
              <div className="row" key={day}>
                <div className="col font-weight-bold">{DAY_LOOKUP[day]}</div>
                <div className="col-4">
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
                <div className="col-4">
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
                <div className="col-1 pl-0">
                  <span className="btn p-0">
                    {isClosed ? (
                      <DoorClosed
                        color="royalblue"
                        size={21}
                        onClick={() => handleOnShopClose(hour, false, i)}
                      />
                    ) : (
                      <DoorOpenFill
                        color="royalblue"
                        size={21}
                        onClick={() => handleOnShopClose(hour, true, i)}
                      />
                    )}
                  </span>
                </div>
              </div>
            );
          })}
          <div className="row">
            <div className="col-4" />
            <div className="col-8">
              <button className="btn btn-primary w-100" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddHours;
