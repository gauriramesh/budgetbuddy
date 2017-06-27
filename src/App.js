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
            overallBalance: "$0.00",
            showPop: false
        }
    this.moneyIsValidated = this.moneyIsValidated.bind(this);
    this.setOverallBalance = this.setOverallBalance.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.updateOverallBalance = this.updateOverallBalance.bind(this);

    };

    moneyIsValidated(input) {
        let regexp = /^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?\.[0-9]{1,2}$/;
        return regexp.test(input);
    }

    setOverallBalance(e) {
        e.preventDefault();
        console.log(this.state.overallBalance);
        if(this.moneyIsValidated(e.target.value)===true) {
            this.setState({overallBalance: e.target.value});
        }
        //may be able to condense this down into one method.
    }

    updateOverallBalance(e) {
        e.preventDefault();
        let oldCurrency = Number(this.state.overallBalance.replace(/[^0-9.]+/g,""));
        //TODO: This regex doesn't account for negative numbers.
        //console.log(oldCurrency);
        let addCurrency = Number(document.getElementById('add').value.replace(/[^0-9.]+/g,""));
        let subtractCurrency = Number(document.getElementById('subtract').value.replace(/[^0-9.]+/g,""));

        this.setState({overallBalance: (oldCurrency+addCurrency-subtractCurrency).toString()});
        this.setState({showPop: false});
        if(oldCurrency+addCurrency-subtractCurrency < 0) {
            document.getElementById('obalance').style.backgroundColor = "#a50000"; //hello
        } else {
            document.getElementById('obalance').style.backgroundColor = "#1eb550";
        }
        //console.log(this.state.overallBalance);

    }

    handleSubmission() {
        document.getElementById("obalance").disabled = true;
    }

    handleEdit() {
        this.setState({
           showPop: true,
        });
    }




    render() {
        return (
            <div className="App">
                <form>
                    <input id="obalance" className="OverallBalance-input" value={this.state.overallBalance} onChange={(e) => this.setOverallBalance(e)}/>
                    <button className="OverallBalance-submit" type="button" onClick={this.handleSubmission}> Enter </button>
                    <button className="OverallBalance-submit" type="button" onClick={this.handleEdit}>Edit</button>
                    {this.state.showPop ? <EditPopup updateOverallBalance={(e) => this.updateOverallBalance(e)}/> : null}
                    {/*Seems like potential opportunity for refactoring*/}
                </form>
            </div>
        );
    }
}

function EditPopup(props) {
      return(
          <div>
              <div className="popup">
                  Edit or Update Balance
                  <form>
                      Add:
                      <input id="add" defaultValue="$0.00"/> <br/>
                      Subtract:
                      <input id="subtract" defaultValue="$0.00"/> <br/>
                      <button onClick={props.updateOverallBalance}> Update & Close </button>
                  </form>
              </div>
          </div>
      );
}





export default App;
