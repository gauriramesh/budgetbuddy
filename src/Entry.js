import React, { Component } from 'react';

function CategoryEntry(props) {
    return(
        <div>
            <input className="BudgetTitle" placeholder="Name" style={{backgroundColor: props.color}} />
            {/*On change probably need to update the giant data structure*/}
            <input className="Entry" placeholder="Amount" style={{backgroundColor: props.color}} onKeyDown={props.handleEntryKey} />
        </div>
    );
}

export default CategoryEntry;