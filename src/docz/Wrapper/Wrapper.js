import React from 'react';
import PropTypes from 'prop-types';
import { css, ThemeProvider } from 'styled-components';

const RthTheme = {
  bodyTextColor: '#444',
  bodyFont: css`
    font-family: 'Fira Sans', sans-serif;
    font-size: 16px;
    font-weight: normal;
  `,
  headingFont: css`
    font-family: 'EB Garamond', serif;
    font-weight: 600;
  `,
  defaultBorderRadius: '2px'
};

const Wrapper = ({ children }) => (
  <ThemeProvider theme={RthTheme}>{children}</ThemeProvider>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default Wrapper;
