import React, { Component } from "react";
interface Istate{
  input:string
}
class Calculator extends Component<{},Istate> {
  constructor(props:{}) {
    super(props);
    this.state = {
      input: "",
    };
  }

  handleClick = (value:any) => {
    this.setState({ input: this.state.input + value });
  };

  clearInput = () => {
    this.setState({ input: "" });
  };

  calculateResult = () => {
 
      this.setState({ input: eval(this.state.input).toString() });
   
  };

  render() {
    return (
      <div >
        <input type="text" value={this.state.input} readOnly />
        <div >
          {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map((item) => (
            <button
              key={item}
              onClick={() => (item === "=" ? this.calculateResult() : this.handleClick(item))}
            >
              {item}
            </button>
          ))}
          <button onClick={this.clearInput}>C</button>
        </div>
      </div>
    );
  }
}

export default Calculator;
