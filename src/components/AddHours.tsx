import React, { useState } from "react";
import {
  Clock,
  DoorClosed,
  DoorOpenFill,
  XCircle,
} from "react-bootstrap-icons";

import TimeField from "react-simple-timefield";

export const DAY_LOOKUP = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type HoursType = {
  day: number;
  from: string;
  to: string;
  isClosed: boolean;
  additionalHours?: {
    from: string;
    to: string;
  } | null;
};
export type MergedHours = {
  days: number[];
  from: string;
  to: string;
  isClosed?: boolean;
  additionalHours?: {
    from: string;
    to: string;
  } | null;
};

const AddHours: React.FC<{
  mergedOpeningHours: (mergedHours: MergedHours[]) => void;
}> = ({ mergedOpeningHours }) => {
  const [hours, setHours] = useState<HoursType[]>([
    {
      day: 0,
      from: "09:00",
      to: "12:00",
      isClosed: false,
      additionalHours: null,
    },
    {
      day: 1,
      from: "09:00",
      to: "12:00",
      isClosed: false,
      additionalHours: null,
    },
    {
      day: 2,
      from: "09:00",
      to: "13:00",
      isClosed: false,
      additionalHours: null,
    },
    {
      day: 3,
      from: "09:00",
      to: "13:00",
      isClosed: false,
      additionalHours: null,
    },
    {
      day: 4,
      from: "10:00",
      to: "14:00",
      isClosed: false,
      additionalHours: null,
    },
    {
      day: 5,
      from: "00:00",
      to: "00:00",
      isClosed: true,
      additionalHours: null,
    },
    {
      day: 6,
      from: "00:00",
      to: "00:00",
      isClosed: true,
      additionalHours: null,
    },
  ]);

  const handleOnHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, slot, id } = e.target;

    const idx = Number(id);

    let newHours = [...hours];

    const isClosed = hours[idx].from === "00:00" && hours[idx].to === "00:00";

    newHours[idx] = {
      ...newHours[idx],
      from: hours[idx].from,
      to: hours[idx].to,
      [slot]: value,
      isClosed,
    };

    setHours(newHours);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const days: {
      days: number[];
      from: string;
      to: string;
      isClosed?: boolean;
      additionalHours?: {
        from: string;
        to: string;
      } | null;
    }[] = [];

    const filteredArr: HoursType[] = hours.reduce(
      (acc: any, current: HoursType) => {
        const x = acc.find(
          (hour: HoursType) =>
            hour?.from === current.from &&
            hour?.to === current.to &&
            hour?.additionalHours?.from === current?.additionalHours?.from &&
            hour?.additionalHours?.to === current?.additionalHours?.to
        );

        return !x ? acc.concat([current]) : acc;
      },
      []
    );

    filteredArr.map((x) => {
      const results = hours.filter(
        (item) =>
          item?.from === x.from &&
          item?.to === x.to &&
          item?.additionalHours?.from === x.additionalHours?.from &&
          item?.additionalHours?.to === x.additionalHours?.to
      );

      const isClosed = results[0].from === "00:00" && results[0].to === "00:00";

      days.push({
        days: results.map(({ day }) => day),
        from: results[0].from,
        to: results[0].to,
        isClosed,
        additionalHours: results[0].additionalHours || null,
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
      additionalHours: null,
    };

    setHours(newHours);
  };

  const emptyAdditionalHours = {
    from: "13:00",
    to: "17:00",
  };

  const addAdditionalHours = (hour: HoursType, index: number) => {
    const newHours = [...hours];

    newHours[index] = {
      ...newHours[index],
      ...hour,
      additionalHours: emptyAdditionalHours,
    };
    setHours(newHours);
  };

  const removeAdditionalHours = (index: number) => {
    const newHours = [...hours];

    newHours[index] = {
      ...newHours[index],
      additionalHours: null,
    };
    setHours(newHours);
  };

  return (
    <>
      <h3>Add opening hours</h3>
      <div>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          {hours.map((hour, i) => {
            const { day, isClosed } = hour;

            return (
              <React.Fragment key={day}>
                <div className="row">
                  <div className="col-2 font-weight-bold">
                    {DAY_LOOKUP[day]}
                  </div>
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
                  <div className="col-2 pl-0">
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
                    <span className="btn p-0">
                      {!isClosed && !hour?.additionalHours && (
                        <Clock
                          color="royalblue"
                          size={18}
                          onClick={() => addAdditionalHours(hour, i)}
                        />
                      )}
                    </span>
                  </div>
                </div>
                {hour?.additionalHours && (
                  <div className="row">
                    <div className="col-2"></div>
                    <div className="col-4">
                      <div className="input-group mb-3">
                        <TimeField
                          value={hour.additionalHours.from}
                          input={
                            <input
                              type="text"
                              className="form-control"
                              id="as"
                              slot="to"
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
                          value={hour.additionalHours.to}
                          input={
                            <input
                              type="text"
                              className="form-control"
                              id="as"
                              slot="to"
                            />
                          }
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-2 pl-0">
                      <span className="btn p-0">
                        <XCircle
                          color="#730000"
                          size={18}
                          onClick={() => removeAdditionalHours(i)}
                        />
                      </span>
                    </div>
                  </div>
                )}
              </React.Fragment>
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
