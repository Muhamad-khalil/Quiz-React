import { useEffect } from "react";

function Timer({ dispatch, secondRemaining }) {
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({
          type: "tick",
        });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  const mins = Math.floor(secondRemaining / 60);
  const secs = secondRemaining % 60;

  return (
    <div className={`timer ${secondRemaining <= 60 ? "warning" : ""}`}>
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
