import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import HelloPureComponent from "./HelloPureComponent";
import "./style.css";
/*

As you may already know, a common way to tune a React component for performance is to make it “pure,” which causes it to only re-render when its props change (instead of every time its parent re-renders). This can be done automatically by extending React.PureComponent instead of React.Component, or manually by implementing the shouldComponentUpdate lifecycle method to compare nextProps with current props. If the props look the same, it skips the render, and saves some time.


Immutability Is Important for PureComponents
By default, React components (both the function type and the class type, if it extends React.Component) will re-render whenever their parent re-renders, or whenever you change their state with setState.
An easy way to optimize a React component for performance is to make it a class, and make it extend React.PureComponent instead of React.Component. This way, the component will only re-render if its state is changed or if its props have changed. It will no longer mindlessly re-render every single time its parent re-renders; it will ONLY re-render if one of its props has changed since the last render.

*/
class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      chef: { name: "OCP" }
    };
  }

  render() {
    return (
      <div>
        <p>Hello.js :)</p>
        <Hello name={this.state.name} chef={this.state.chef} />
        <div style={{ marginTop: "2px", border: "0.5px solid" }} />
        <p>HelloPureComponent.js :)</p>
        <HelloPureComponent name={this.state.name} chef={this.state.chef} />
        <div style={{ marginBottom: "10px", border: "0.5px solid" }} />
        <button
          onClick={() => {
            console.log("setState  Le mauvais Changer");
            //this.state.name = "=> " + Math.random();
            this.state.chef.name = "Chef-" + Math.random();
            this.setState({});
          }}
        >
          Le mauvais Changer
        </button>
        <div style={{ minHeight: "2px" }} />
        <button
          onClick={() => {
            console.log("setState  Le bon Changer");
            //this.state.name = "=> " + Math.random();
            this.state.chef = { name: "Chef-" + Math.random() };
            this.setState({});
          }}
        >
          Le bon Changer
        </button>
        <div style={{ minHeight: "2px" }} />
        <button
          onClick={() => {
            console.log("setState  Le DIABLE Changer");
            /*
            ici le fait de changer le this.state.name qui est un String (immutable)
            [[
               String values are immutable. String objects are not. 
            
              https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/
            
            ]]
            il va changer un des props de HelloPureComponent, ce qui va déclencher
            render in PureComponent
            Pour Vérifier mon hypothèse, tester #ICIICI

            */
            this.state.name = "=> " + Math.random();
            this.state.chef.name = "Chef-" + Math.random();
            this.setState({});
          }}
        >
          Le DIABLE Changer
        </button>

        {/* #ICIICI */}
        <div
          style={{
            padding: "5px",
            marginTop: "100px",
            border: "15px solid red"
          }}
        >
          <p>HelloPureComponent.js #ICIICI :)</p>

          {/*
          Ici le props est juste chef 
          <HelloPureComponent name={this.state.name} cchef={this.state.chef} />
          */}
          <HelloPureComponent chef={this.state.chef} />
          <button
            onClick={() => {
              console.log("setState  Le mauvais Changer");
              this.state.name = "=> " + Math.random();
              this.state.chef.name = "Chef-" + Math.random();
              this.setState({});
            }}
          >
            Le DIABLE Changer démasqué son evil visage
          </button>
          <div style={{ minHeight: "2px" }} />
          <button
            onClick={() => {
              console.log("setState  Le mauvais Changer");
              this.state.name = "=> " + Math.random();
              this.state.chef = { name: "Chef-" + Math.random() };
              this.setState({});
            }}
          >
            Le DIABLE Changer correctement corrigé
          </button>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
