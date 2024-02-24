import { theme } from "@/theme";
import "styled-components";

type USHSTheme = typeof theme;

declare module "styled-components" {
  // Keep this object empty. USHSTheme is auto inferred from `theme` in theme.ts
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface DefaultTheme extends USHSTheme {}
}
