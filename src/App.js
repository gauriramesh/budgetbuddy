import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
         <OverallBalance placeholder="hello"/>
      </div>
    );
  }
}

class OverallBalance extends Component {
    moneyIsValidated(input) {
        let regexp = /^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?\.[0-9]{1,2}$/;
        regexp.test(input);
        //test commit
    }
    render() {
        return (
            <div className="App">
                <input placeholder={this.props.placeholderValue}/>
            </div>
        );
    }
}

export default App;
