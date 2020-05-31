import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Inner = styled.div`
  width: 2px;
  border: 1px solid black;
  box-sizing: content-box;

  &:not(:last-child) {
    border-right: none;
  }
`;

export default { Container, Inner };
