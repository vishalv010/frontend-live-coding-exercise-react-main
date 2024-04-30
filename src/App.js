import React, { Component } from "react";
import { MyForm } from "./components/MyForm";

class App extends Component {
  state = {
  };


  render() {
    return (
      <div className="main__wrap">
        <main className="container">
            <MyForm />
        </main>
      </div>
    );
  }
}

export default App;
