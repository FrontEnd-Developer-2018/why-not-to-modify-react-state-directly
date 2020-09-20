import React from "react";

export default class HelloPureComponent extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>I'm String: {this.props.name}!</h1>
        <h1>I'm JS Object: {this.props.chef.name}!</h1>
      </div>
    );
  }
}
