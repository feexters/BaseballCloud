import React from "react";
import { Provider } from "react-redux";
import { store } from "store";
import { Screen } from "screens";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { Toastr } from "ui";

function App() {
  return (
    <Provider store={store}>
      <Toastr />
      <Screen />
    </Provider>
  );
}

export default App;
