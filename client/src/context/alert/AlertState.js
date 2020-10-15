import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";
import { v4 as uuid } from "uuid";

const AlertState = (props) => {
  const initialState = [];

  // state allows to access anything in our state
  // dispatch allows us to dispatch objects to reducer
  const [state, dispatch] = useReducer(alertReducer, initialState);

  /* ALL OUR ACTIONS */
  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
