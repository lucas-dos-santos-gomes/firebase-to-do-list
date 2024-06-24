import styled from "styled-components";
import { themes } from "../../styles/themes";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 7px 20px;
  font-size: 1.4rem;

  background-color: ${themes.dark.color.primary};
  color: ${themes.dark.fontColor.primary};

  & > a {
    display: flex;
    align-items: center;
  }
`;