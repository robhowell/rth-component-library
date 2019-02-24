import styled, { css } from 'styled-components';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const headingStyles = css`
  ${({ theme }) => theme.headingFont};
`;

const Heading1 = styled.h1`
  ${headingStyles};
  font-size: 36px;
`;

const Heading2 = styled.h2`
  ${headingStyles};
  font-size: 30px;
`;

const Heading3 = styled.h3`
  ${headingStyles};
  font-size: 26px;
`;

const Heading4 = styled.h4`
  ${headingStyles};
  font-size: 20px;
`;

const Heading5 = styled.h5`
  ${headingStyles};
  font-size: 18px;
`;

const Heading6 = styled.h6`
  ${headingStyles};
  font-size: 16px;
`;

const Heading = ({ level, ...props }) => {
  if (level === 1) return <Heading1 {...props} />;
  if (level === 2) return <Heading2 {...props} />;
  if (level === 3) return <Heading3 {...props} />;
  if (level === 4) return <Heading4 {...props} />;
  if (level === 5) return <Heading5 {...props} />;
  if (level === 6) return <Heading6 {...props} />;

  return <Fragment />;
};

Heading.propTypes = {
  level: PropTypes.number.isRequired
};

export default Heading;
