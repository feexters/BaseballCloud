import React from "react";
import { Provider } from "react-redux";
import { store } from "store";
import { HomeScreen } from "components/Login/components/HomeScreen";

function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}

export default App;
