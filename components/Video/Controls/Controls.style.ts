import styled from '@emotion/styled';

const Container = styled.div<{ showControls: boolean }>`
  display: flex;
  position: absolute;
  right: 50%;
  transform: translate(50%, 30px);
  bottom: 50px;
  z-index: 1;
  transition: opacity 1.2s, transform 1.2s, visibility 0s 1.2s;
  opacity: 0;
  visibility: hidden;
  max-width: min-content;

  button {
    margin: 0.5rem;
  }

  ${({ showControls }) =>
    showControls &&
    `
  {
    transition: opacity 0.6s, transform 0.6s, visibility 0s;
    opacity: 1;
    visibility: visible;
    transform: translate(50%, 0px);
  }
  `}
`;

export default { Container };
