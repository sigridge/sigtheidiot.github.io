import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";
import { spillRef } from "./firebaseSetup";

export const Counter = () => {
  const [minutesSince, setMinutesSince] = useState(0);
  const [hoursSince, setHoursSince] = useState(0);
  const [daysSince, setDaysSince] = useState(0);

  const updateTime = () => {
    const timeStamp = new Date().getTime() / 1000 / 60;
    spillRef.set({ timestamp: timeStamp });
  };

  useEffect(() => {
    spillRef.child("timestamp").on("value", (snapshot) => {
      const timeStamp = snapshot.val();
      const today = new Date().getTime() / 1000 / 60;
      const minutesSince = Math.floor(today - timeStamp);
      setMinutesSince(minutesSince);
      setHoursSince(Math.floor(minutesSince / 60));
      setDaysSince(Math.floor(minutesSince / 60 / 24));
    });
  }, []);

  return (
    <>
      Det har vært {minutesSince} {minutesSince === 1 ? "minutt" : "minutter"}{" "}
      siden Buck sølte noe!
      <br />
      {hoursSince <= 1 ? " " : "Det er det samme som " + hoursSince + " timer"}
      <br />
      {daysSince <= 1 ? " " : "Eller " + daysSince + " dager"}
      {/*Disable knappen hvis man ikke er logget inn (og er buck || sigrid)*/}
      <Button
        variant="contained"
        onClick={() => updateTime()}
        style={{ marginTop: "15px" }}
        startIcon={<HistoryIcon />}
      >
        Trykk her når Buck søler
      </Button>
    </>
  );
};
