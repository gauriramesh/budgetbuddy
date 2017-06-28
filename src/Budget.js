import React, { Component } from 'react';

class Budget extends Component {
    render() {
        return (
            <div>
                <BudgetTitle/>
                <CategoryBalance overallBalance={this.props.overallBalance}/>
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
            <input disabled className="CategoryBalance" defaultValue={props.overallBalance}/>
        </div>
    );
}

export default Budget;