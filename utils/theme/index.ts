import styled, { CreateStyled } from '../../node_modules/@emotion/styled';

type Theme = {
  breakpoints: {
    s: string;
    m: string;
    [key: string]: string;
  };
  [key: string]: any;
};

export default styled as CreateStyled<Theme>;
