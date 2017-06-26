import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
         <OverallBalance/>
      </div>
    );
  }
}

class OverallBalance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overallBalance: "$0.00"
        }
    this.moneyIsValidated = this.moneyIsValidated.bind(this);
    this.handleOverallBalance = this.handleOverallBalance.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);

    };

    moneyIsValidated(input) {
        let regexp = /^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?\.[0-9]{1,2}$/;
        return regexp.test(input);
    }

    handleOverallBalance(e) {
        e.preventDefault();
        console.log(this.state.overallBalance);
        if(this.moneyIsValidated(e.target.value)===true) {
            this.setState({overallBalance: e.target.value});
        }
        //may be able to condense this down into one method.
    }

    handleSubmission() {
        document.getElementById("obalance").disabled = true;
    }

    handleEdit() {
        //TODO: add popup functionality here.
    }




    render() {
        return (
            <div className="App">
                <form>
                    <input id="obalance" className="OverallBalance-input" onChange={(e) => this.handleOverallBalance(e)}/>
                    <button className="OverallBalance-submit" type="button" onClick={this.handleSubmission}> Enter </button>
                    <button type="button" onClick={this.handleEdit}>Edit</button>
                </form>
            </div>
        );
    }
}

export default App;
