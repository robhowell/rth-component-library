import styled from 'styled-components';

const Button = styled.button`
  ${({ theme }) => theme.bodyFont};
  color: #054d00;
  background-color: #e4ffe2;
  border: 1px solid #a4dda2;
  padding: 10px 20px;
  border-radius: ${({ theme }) => theme.defaultBorderRadius};
  cursor: pointer;

  &:hover {
    border: 1px solid #84bd82;
  }
`;

export default Button;
