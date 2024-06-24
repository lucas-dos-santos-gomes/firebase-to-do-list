import styled from "styled-components";

export const RoundImage = styled.img`
  border-radius: 50px;
  height: ${({ height }) => height ?? '100%'};
`;