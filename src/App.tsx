import React from "react";
import { Provider } from "react-redux";
import { store } from "store";
import { Screen } from "screens";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { Toastr } from "ui";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "store/store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toastr />
        <Screen />
      </PersistGate>
    </Provider>
  );
}

export default App;
