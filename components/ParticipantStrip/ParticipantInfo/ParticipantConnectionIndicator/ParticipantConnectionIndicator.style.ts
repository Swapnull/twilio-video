import styled from '@emotion/styled';

const Indicator = styled.span<{ isReconnecting: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: ${({ isReconnecting }) => (isReconnecting ? '#ffb100' : '#0c0')};
  display: inline-block;
  margin-right: 3px;
`;

export default { Indicator };
