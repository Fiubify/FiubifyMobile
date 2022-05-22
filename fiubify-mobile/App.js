import React, { Component } from "react";

import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore.js";

import Fiubify from "./Fiubify.jsx";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fiubify />
      </Provider>
    );
  }
}

export default App;
