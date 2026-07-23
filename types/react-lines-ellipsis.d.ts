declare module "react-lines-ellipsis" {
  import { Component } from "react";

  export interface ReactLinesEllipsisProps {
    text: string;
    maxLine?: number | string;
    ellipsis?: string;
    trimRight?: boolean;
    basedOn?: "letters" | "words";
    component?: string;
    className?: string;
    onReflow?: (state: { clamped: boolean; text: string }) => void;
  }

  export default class ReactLinesEllipsis extends Component<ReactLinesEllipsisProps> {}
}
