import React, { Component } from 'react';

function Budget(props) {
        return (
            <div>
                <BudgetAllocation handleBudgetAllocation={props.handleBudgetAllocation}/>
                <BalanceTracking amountAllocated={props.amountAllocated}/>
                <BottomTotals totalUsed={props.totalUsed}/>
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

function BottomTotals(props) {
    return(
        <div>
            <input disabled className="BudgetTitle" value="Total:"/>
            <input disabled className="CategoryBalance" value={props.totalUsed}/>
        </div>
    );
}

export default Budget;