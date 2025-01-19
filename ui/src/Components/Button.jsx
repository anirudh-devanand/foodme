import React from 'react'; 
import styled from 'styled-components';

const BTN = styled.button`
margin: auto;
background-color: ${({theme}) => theme.component_text_primary}; 
color: white;
font-weight: bold;`
;

const Button = (props) => {
    const {text, onClick} = props;

  return (
    <BTN onClick={(e) => onClick(e.target.value)}>
       {text}
    </BTN>
  )
}

export default Button