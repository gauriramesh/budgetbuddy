import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import CategoryButton from './CategoryButton.js';
import Budget from './Budget.js';

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
            budgets: [
                {
                    title: 'Vacations',
                    entries: [
                        {
                            spent: 10,
                            place: 'San Francisco',
                        },
                    ],
                },
            ]
        }
    this.moneyIsValidated = this.moneyIsValidated.bind(this);
    this.setOverallBalance = this.setOverallBalance.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.updateOverallBalance = this.updateOverallBalance.bind(this);
    this.handleCategoryButtonClick = this.handleCategoryButtonClick.bind(this);
    this.handleAddBudgetClick = this.handleAddBudgetClick.bind(this);
    this.handleBudgetAllocation = this.handleBudgetAllocation.bind(this);

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
        //may be able to condense this down into one method.
    }

    updateOverallBalance(e) {
        e.preventDefault();
        let oldCurrency = Number(this.state.overallBalance.replace(/[^0-9.||-]+/g,""));
        let addCurrency = Number(document.getElementById('add').value.replace(/[^0-9.||-]+/g,""));
        let subtractCurrency = Number(document.getElementById('subtract').value.replace(/[^0-9.||-]+/g,""));

        this.setState({overallBalance: (oldCurrency+addCurrency-subtractCurrency).toString()});
        console.log(this.state.overallBalance);
        this.setState({showPop: false});
        if(oldCurrency+addCurrency-subtractCurrency < 0) {
            document.getElementById('obalance').style.backgroundColor = "#a50000"; //hello
        } else {
            document.getElementById('obalance').style.backgroundColor = "#1eb550";
        }
        //TODO: Move the color changing thing somehwhere else so that budget components can access it.
        //TODO: Also does not account for if initial typed value is negative.

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

handleAddBudgetClick() {
    let array = this.state.budgets;
    array.push({
        title: 'Schmacations',
        entries: [
            {
                spent: 10,
                place: 'Hullo',
            },
        ],
    },);
    this.setState({budgets: array});
    console.log(array);
}


handleBudgetAllocation() {
    //TODO: Fix this so that it doesn't re-subtract old budgets when you change it.
    console.log("Starting budget allocation handler!");
    var allocations = document.getElementsByClassName("BudgetAllocation");
    var allocationArray = Array.prototype.slice.call(allocations);
    var allocationsArray = allocationArray.map((allocation) => allocation.value);


    allocationsArray.forEach((element) => {
        if (this.moneyIsValidated(element) === true) {
            let oldCurrency = Number(this.state.overallBalance.replace(/[^0-9.||-]+/g, ""));
            console.log(oldCurrency);
            let allocation = Number(element.replace(/[^0-9.||-]+/g, ""));
            console.log(allocation);
            this.setState({overallBalance: (oldCurrency - allocation).toString()});
        }
    });
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
                    {/*Seems like potential opportunity for refactoring*/}
                </form>
                <CategoryButton handleClick={this.handleCategoryButtonClick} name="Generate Budgets &#10227;" color="#10d3a6"/>
                <CategoryButton handleClick={this.handleAddBudgetClick} name="Add New Budget" color="#10d3a6"/>
                <CategoryButton handleClick={null} name="Add New Entry" color="#10d3a6"/>
                {this.state.showBudgets ? <Budget balance={this.state.overallBalance} handleBudgetAllocation={(e) => this.handleBudgetAllocation(e)}/> : null}
                {
                    this.state.budgets.map((item) => (
                        <Budget balance={this.state.overallBalance} handleBudgetAllocation={this.handleBudgetAllocation}/>
                    ))
                }

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
    // {Need to test this: it says func is unresolved variable}
}



export default App;
