import React, { Component } from 'react';

class Budget extends Component {
    render() {
        return (
            <div>
                <BudgetTitle balance={this.props.balance}/>
                <CategoryEntry color="#bfd9ff"/>
            </div>
        );
    }
}

function BudgetTitle(props) {
    return(
        <div>
            <input disabled className="BudgetTitle" defaultValue="Spendable Money"/>
            <input disabled className="CategoryBalance" placeholder={props.balance}/>
            <button className="CategoryBalance" onClick={props.addEntry}> &#43; </button>
        </div>
    );
}



function CategoryEntry(props) {
    return(
        <div>
            <input className="BudgetTitle" placeholder="Name" style={{backgroundColor: props.color}} />
            <input className="CategoryBalance" placeholder="Amount" style={{backgroundColor: props.color}} />
        </div>
    );
}

export default Budget;