import React, { Component } from 'react';

function CategoryButton(props) {
        return (
            <div>
                <button className="CategoryButton" onClick={props.handleClick} style={{backgroundColor: props.color}}>
                    {props.name}
                </button>
            </div>
        );
}

export default CategoryButton;
