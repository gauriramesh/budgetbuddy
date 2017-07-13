import React, { Component } from 'react';

function Budget(props) {
        return (
            <div>
                <BudgetAllocation handleBudgetAllocation={props.handleBudgetAllocation}/>
                <BalanceTracking amountAllocated={props.amountAllocated}/>
                <BudgetTitle balance={props.balance} addEntry={props.addEntry}/>
                <CategoryEntry color="#adf442"/>
                <CategoryEntry color="#adf442"/>
                <CategoryEntry color="#adf442"/>
                <CategoryEntry color="#adf442"/>
                <CategoryEntry color="#adf442"/>
                <CategoryEntry color="#adf442"/>
                <CategoryEntry color="#adf442"/>
                <CategoryEntry color="#adf442"/>

                {/*{*/}
                {/*props.entries.map((entry) => (*/}
                    {/*<CategoryEntry color="#adf442"/>*/}
                {/*))*/}
            {/*}*/}
            </div>
        );
}

function BudgetTitle(props) {
    return(
        <div>
            <input className="BudgetTitle" placeholder="Vacations" />
            <input className="Entry" placeholder={props.balance}/>
            <button className="CategoryBalance" placeholder="click to add" onClick={props.addEntry}> &#43; </button>
        </div>
    );
}

function BalanceTracking(props) {
    return(
        <div>
            <input className="BudgetTitle" placeholder="Amount Left:" />
            <button className="Entry">{props.amountAllocated}</button>
        </div>
    );
}

function BudgetAllocation(props) {
    return(
      <div>
          <button className="BudgetTitle"> Amount Allocated : </button>
          <input id="totalAllocated" className="Entry BudgetAllocation" placeholder="Total Amount Allocated"/>
          <button className="CategoryBalance" type="button" onClick={props.handleBudgetAllocation}> 	&#10003; </button>
      </div>
    );
}



function CategoryEntry(props) {
    return(
        <div>
            <input className="BudgetTitle" placeholder="Name" style={{backgroundColor: props.color}} />
            {/*On change probably need to update the giant data structure*/}
            <input className="Entry" placeholder="Amount" style={{backgroundColor: props.color}} />
        </div>
    );
}

export default Budget;