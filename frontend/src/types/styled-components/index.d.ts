import { theme } from "@/theme";
import "styled-components";

type USHSTheme = typeof theme;

declare module "styled-components" {
  type DefaultTheme = USHSTheme;
}
