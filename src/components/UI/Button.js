import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    display: inline-block;
    margin: 5px;
    padding: 10px;
    background-color: lightgreen;
    border: none;
    border-radius: 5px;
    outline: none;
    font-weight: 600;

    &:hover {
        cursor: pointer;
    }
`;

const Button = props => {
    return (
        <StyledButton onClick={props.clicked}>
            {props.children}
        </StyledButton>
    );
}

export default Button;