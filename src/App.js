import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import CategoryButton from './CategoryButton.js';
import Budget from './Budget.js';
import CategoryEntry from './Entry.js';

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
            showPop: false,
            amountAllocated: "$0.00",
            totalUsed: "$0.00",
        }
    this.moneyIsValidated = this.moneyIsValidated.bind(this);
    this.setOverallBalance = this.setOverallBalance.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.updateOverallBalance = this.updateOverallBalance.bind(this);
    this.handleCategoryButtonClick = this.handleCategoryButtonClick.bind(this);
    this.handleBudgetAllocation = this.handleBudgetAllocation.bind(this);
    this.checkNegative = this.checkNegative.bind(this);
    this.handleEntryKey = this.handleEntryKey.bind(this);

};

    moneyIsValidated(input) {
        let regexp = /^(?:(?:USD)?\$)?(?:-)?(?:\d+|\d{1,3}(?:,\d{3})*)(?:\.\d{1,2})?$/;
        return regexp.test(input);
    }

    setOverallBalance(e) {
        e.preventDefault();
        console.log(this.state.overallBalance);
        if(this.moneyIsValidated(e.target.value)===true) {
            this.setState({overallBalance: e.target.value});
        }
    }

    checkNegative() {
        if(Number(this.state.overallBalance.replace(/[^0-9.||-]+/g,"")) < 0) {
            document.getElementById('obalance').style.backgroundColor = "#a50000";
        } else {
            document.getElementById('obalance').style.backgroundColor = "#1eb550";
        }
    }

    updateOverallBalance(e) {
        e.preventDefault();
        let oldCurrency = Number(this.state.overallBalance.replace(/[^0-9.||-]+/g,""));
        let addCurrency = Number(document.getElementById('add').value.replace(/[^0-9.||-]+/g,""));
        let subtractCurrency = Number(document.getElementById('subtract').value.replace(/[^0-9.||-]+/g,""));

        this.setState({overallBalance: (oldCurrency+addCurrency-subtractCurrency).toString()});
        console.log(this.state.overallBalance);
        this.setState({showPop: false});
        this.checkNegative();
    }

    handleSubmission() {
        document.getElementById("obalance").disabled = true;
    }

    handleEdit() {
        this.setState({
           showPop: true,
        });
    }

    handleCategoryButtonClick() {
        this.setState({
            showBudgets: true,
        });
    }


handleBudgetAllocation() {
    console.log("Starting budget allocation handler!");
    var allocations = document.getElementsByClassName("BudgetAllocation");
    var allocationsArray = Array.prototype.slice.call(allocations).map((allocation) => allocation.value);


    allocationsArray.forEach((element) => {
        if (this.moneyIsValidated(element)) {
            let oldCurrency = Number(this.state.overallBalance.replace(/[^0-9.||-]+/g, ""));
            console.log(oldCurrency);
            let allocation = Number(element.replace(/[^0-9.||-]+/g, ""));
            console.log(allocation);
            this.setState({amountAllocated: allocation.toString()})
            console.log(this.state.amountAllocated);
            this.checkNegative();
            this.setState({overallBalance: (oldCurrency - allocation).toString()});
        }
    });
}

handleEntryKey(e) {
    this.forceUpdate();
    if(e.keyCode==13) {
        //set the state
        //maybe make active element disabled.
        let allocation = Number(document.activeElement.value.replace(/[^0-9.||-]+/g, ""));
        let oldAllocation = Number(this.state.amountAllocated.replace(/[^0-9.||-]+/g, ""));
        this.setState({amountAllocated: (oldAllocation-allocation).toString()});
        let oldTotalUsed = Number(this.state.totalUsed.replace(/[^0-9.||-]+/g, ""));
        this.setState({totalUsed: (oldTotalUsed + allocation).toString()});

    }
}




    render() {
        const budget = this.state.budgets;
        return (
            <div className="App">
                <form>
                    <input id="obalance" className="OverallBalance-input" value={this.state.overallBalance} onChange={(e) => this.setOverallBalance(e)}/>
                    <br/>
                    <button className="OverallBalance-submit"  type="button" onClick={this.handleSubmission}> Enter </button>
                    <button className="OverallBalance-submit" type="button" onClick={this.handleEdit}>Edit</button>
                    {this.state.showPop ? <EditPopup updateOverallBalance={(e) => this.updateOverallBalance(e)}/> : null}
                </form>

                            <CategoryButton handleClick={this.handleAddBudgetClick} name="Add New Budget" color="#10d3a6"/>
                            <Budget totalUsed={this.state.totalUsed} amountAllocated={this.state.amountAllocated} addEntry={this.handleAddEntry} balance={this.state.overallBalance} handleBudgetAllocation={this.handleBudgetAllocation}  handleEntryKey={(e) => this.handleEntryKey(e)} />
                            <CategoryEntry handleEntryKey={(e) => this.handleEntryKey(e)} color="#42f4c8" />
                            <CategoryEntry handleEntryKey={(e) => this.handleEntryKey(e)} color="#42f4c8" />
                            <CategoryEntry handleEntryKey={(e) => this.handleEntryKey(e)} color="#42f4c8" />
                            <CategoryEntry handleEntryKey={(e) => this.handleEntryKey(e)} color="#42f4c8" />
                            <CategoryEntry handleEntryKey={(e) => this.handleEntryKey(e)} color="#42f4c8" />
                            <CategoryEntry handleEntryKey={(e) => this.handleEntryKey(e)} color="#42f4c8" />

                {this.state.showBudgets ?  <Budget handleEntryKey={(e) => this.handleEntryKey(e)} totalUsed={this.state.totalUsed} amountAllocated={this.state.amountAllocated} addEntry={this.handleAddEntry} entries={this.state.budgets.map((budget)=> budget.entries)} balance={this.state.overallBalance} handleBudgetAllocation={this.handleBudgetAllocation}/>  : null}

            </div>
        );
    }
}

function EditPopup(props) {
      return(
          <div>
              <div className="popup">
                  <h3> Edit or Update Balance </h3>
                  <form>
                      Add: <input id="add" name="Add" defaultValue="$0.00"/> <br/>
                      Subtract: <input id="subtract" name="Subtract" defaultValue="$0.00"/> <br/>
                      <button className="updateClose" onClick={props.updateOverallBalance}> Update & Close </button>
                  </form>
              </div>
          </div>
      );
}

EditPopup.propTypes = {
    updateOverallBalance: PropTypes.func.isRequired
}



export default App;
