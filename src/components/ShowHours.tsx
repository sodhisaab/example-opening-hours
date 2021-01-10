import React from "react";

const DAY_LOOKUP = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const openHours = [
  { days: [1, 2, 3, 4, 5], from: "09:00", to: "21:00" },
  { days: [6, 0], from: "11:00", to: "21:00" },
];

const ShowHours: React.FC = () => {
  return (
    <div className="mt-5">
      <h3>Opening hours</h3>
      {openHours.map((group) => {
        return group.days.map((day) => (
          <p key={day}>
            {DAY_LOOKUP[day]} {group.from} - {group.to}
          </p>
        ));
      })}
    </div>
  );
};

export default ShowHours;
