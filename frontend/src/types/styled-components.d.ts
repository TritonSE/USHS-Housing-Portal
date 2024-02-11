import { theme } from "@/theme";
import "styled-components";

type USHSTheme = typeof theme;

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface DefaultTheme extends USHSTheme {};
}
