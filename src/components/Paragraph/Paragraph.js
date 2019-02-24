import styled from 'styled-components';

const Paragraph = styled.p`
  ${({ theme }) => theme.bodyFont};
  color: ${({ theme }) => theme.bodyTextColor};
  margin: 10px 0 0;
`;

export default Paragraph;
