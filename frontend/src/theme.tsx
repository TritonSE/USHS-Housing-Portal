import isPropValid from "@emotion/is-prop-valid";
import { PropsWithChildren } from "react";
import { IStyleSheetContext, StyleSheetManager, createGlobalStyle } from "styled-components";

// Store global theme values (e.g. colors) here.
// This is object is accessible via the `theme` prop on all styled components.
// See: https://styled-components.com/docs/advanced#theming
export const theme = {
  colors: {
    primary: "#B64201",
    neutralGray0: "#F3F3F3",
    // background: "",
    // ...etc
    text: "black",
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
  overflow-x: hidden;
}
`;

// This implements the default behavior from styled-components v5 preventing
// "unknown prop ... is being sent through to the DOM" errors in the console
// See https://styled-components.com/docs/faqs#shouldforwardprop-is-no-longer-provided-by-default
const shouldForwardProp: IStyleSheetContext["shouldForwardProp"] = (propName, target) => {
  if (typeof target === "string") {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
};

// Wrapper component to apply styled-components styles manager to the app
export const StyledComponentsManager = ({ children }: PropsWithChildren) => (
  <StyleSheetManager shouldForwardProp={shouldForwardProp}>{children}</StyleSheetManager>
);
