import React, { Component } from "react";

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  componentDidMount() {
    console.log("Component did mount");
  }
  componentDidUpdate() {
    console.log("Component did update");
  }
  componentWillUnmount() {
    console.log("Component will unmount");
  }
  render() {
    return (
      <div>
        <h1>Class Component</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

export default ClassComponent;
