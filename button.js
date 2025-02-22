import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.color};
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  box-sizing: border-box;
  text-align: center;
  width: 200px;
  color: white;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const ButtonWrapper = ({ color, label }) => {
  return (
    <StyledButton color={color}>
      {label}
    </StyledButton>
  );
};

export default ButtonWrapper;