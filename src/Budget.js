import React, { Component } from 'react';

class Budget extends Component {
    render() {
        return (
            <div>
                <BudgetTitle/>
                <CategoryBalance balance={this.props.balance}/>
                {console.log("Budget Balance" + this.props.balance)}
            </div>
        );
    }
}

function BudgetTitle(props) {
    return(
        <div>
            <input disabled className="BudgetTitle" defaultValue="Spendable Money"/>
        </div>
    );
}

function CategoryBalance(props) {
    return(
        <div>
            <input disabled className="CategoryBalance" placeholder={props.balance}/>
        </div>
    );
}

export default Budget;