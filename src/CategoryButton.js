import React, { Component } from 'react';

function CategoryButton(props) {
        return (
            <div>
                <button className="CategoryButton" onClick={props.handleClick}>
                    Create Budget &#10133;
                </button>
            </div>
        );
}

export default CategoryButton;
