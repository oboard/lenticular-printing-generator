import { BuderWidget, _View } from "buder";

class _Grid extends _View {
  constructor(children: BuderWidget[]) {
    super(children);
  }

  render(): HTMLElement {
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(100px, 1fr))";
    grid.style.gap = "1rem";
    grid.style.justifyContent = "center";
    grid.style.alignItems = "center";
    grid.style.width = "100%";
    grid.style.height = "100%";
    return super.render(grid);
  }
}

export const Grid = (children: BuderWidget[]) => new _Grid(children);
