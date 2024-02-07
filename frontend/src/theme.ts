import { createGlobalStyle } from "styled-components";

// Store global theme values (e.g. colors) here.
// This is object is accessible via the `theme` prop on all styled components.
// See: https://styled-components.com/docs/advanced#theming
export const theme = {
  colors: {
    // primary: "",
    // background: "",
    // ...etc
  },
};

// Global CSS applied to every page.
export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Montserrat, sans-serif;

}
body{
  background-color: #FBF7F3;
}
`;
