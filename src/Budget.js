import React, { Component } from 'react';

function Budget(props) {
        return (
            <div>
                <BudgetTitle balance={props.balance} addEntry={props.addEntry}/>
                <CategoryEntry color="#bfd9ff"/>
            </div>
        );
}

function BudgetTitle(props) {
    return(
        <div>
            <input disabled className="BudgetTitle" defaultValue={props.title} />
            <input className="CategoryBalance" placeholder={props.balance}/>
            <button className="CategoryBalance" onClick={props.addEntry}> &#43; </button>
        </div>
    );
}



function CategoryEntry(props) {
    return(
        <div>
            <input className="BudgetTitle" placeholder="Name" style={{backgroundColor: props.color}} />
            {/*On change probably need to update the giant data structure*/}
            <input className="CategoryBalance" placeholder="Amount" style={{backgroundColor: props.color}} />
        </div>
    );
}

export default Budget;