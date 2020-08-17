import styled from '@emotion/styled';
import maxWidth from '@feast-it/pesto';

const Container = styled.div`
    width: 500px;

    @ .inputSelect {
        width: calc(100% - 35px);
    }

    ${({ theme }) => maxWidth(theme.breakpoints.s)} {
        width: calc(100vw - 32px);
    }

`;

const ListSection = styled.div`
  margin: 1rem 0;
`;

export default { Container, ListSection };
