import React from "react";
import { MergedHours } from "./AddHours";

const StoredInDB: React.FC<{ hours: MergedHours[] }> = ({ hours }) => {
  if (!hours) {
    return null;
  }

  return (
    <>
      <h3>Data will be stored in database like following </h3>
      <pre>{JSON.stringify(hours, null, 2)}</pre>
    </>
  );
};

export default StoredInDB;
