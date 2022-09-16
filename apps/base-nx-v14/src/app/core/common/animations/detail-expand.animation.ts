import {
  animate,
  query,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const detailExpandAnimation = trigger("detailExpand", [
  state("void", style({ height: "0px", minHeight: "0" })),
  state("*", style({ height: "*" })),
  transition("void => *", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
]);
