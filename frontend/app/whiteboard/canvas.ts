import { RoughCanvas } from "roughjs/bin/canvas";
import React from "react";
import { Options, Shapes, ShapesTypes } from "./types";

export const DefaultOptions: Options = {
  seed: 12345,
  fill: "yellow",
  bowing: 1,
  fillStyle: "cross-hatch",
  stroke: "silver",
  strokeWidth: 3,
  roughness: 1,
};

export class WhiteBoard {
  private drawBoard: RoughCanvas;
  private ctx: CanvasRenderingContext2D;
  private canvasBoard: HTMLCanvasElement;

  private data: Shapes[] = [
    {
      type: "circle",
      centerX: 150,
      centerY: 150,
      diameter: 100,
    },
    {
      type: "rectangle",
      x: 1,
      y: 1,
      width: 200,
      height: 100,
    },
  ];

  private type: ShapesTypes | null = "circle";
  private start: boolean = false;
  private x: number | null = null;
  private y: number | null = null;
  private width: number | null = null;
  private height: number | null = null;

  constructor({
    canvasBoard,
    drawBoard,
    keyboardEventHandler,
  }: {
    drawBoard: RoughCanvas;
    canvasBoard: HTMLCanvasElement;
    keyboardEventHandler: React.Dispatch<
      React.SetStateAction<(e: KeyboardEvent) => void>
    >;
  }) {
    this.canvasBoard = canvasBoard;
    this.ctx = canvasBoard.getContext("2d")!;
    this.drawBoard = drawBoard;
    this.init();
    this.initMouseHandlers();
    keyboardEventHandler(() => this.keyboardEventHandler);
  }

  init() {
    this.render();
  }

  mouseDownHandler = (e: MouseEvent) => {
    console.log("**********DOWN**********");
    this.start = true;
    this.x = e.x;
    this.y = e.y;
  };

  mouseMoveHandler = (e: MouseEvent) => {
    console.log("**********MOVE**********");
    if (this.start) {
      this.render();
      if (this.x && this.y) {
        this.start = true;
        // this.addItem({
        //   type: "rect",
        //   x: this.x,
        //   y: this.y,
        //   width: e.x - this.x,
        //   height: e.y - this.y,
        // });
        this.addItem({
          type: "circle",
          centerX: this.x,
          centerY: this.y,
          diameter:
            2 *
            Math.sqrt(Math.pow(e.x - this.x, 2) + Math.pow(e.y - this.y, 2)),
        });
      }
    }
  };

  mouseUpHandler = (e: MouseEvent) => {
    console.log("**********UP**********");

    if (this.x && this.y) {
      if (!(this.x === e.x && this.y === e.y)) {
        // this.data.push({
        //   type: "rect",
        //   x: this.x,
        //   y: this.y,
        //   width: e.x - this.x,
        //   height: e.y - this.y,
        // });
        this.data.push({
          type: "circle",
          centerX: this.x,
          centerY: this.y,
          diameter:
            2 *
            Math.sqrt(Math.pow(e.x - this.x, 2) + Math.pow(e.y - this.y, 2)),
        });
      }
    }
    this.start = false;
    this.x = null;
    this.y = null;
    this.width = null;
    this.height = null;
    this.render();
  };

  render() {
    this.ctx.clearRect(0, 0, this.canvasBoard.width, this.canvasBoard.height);
    this.ctx.fillStyle = "rgba(0, 0, 0)";
    this.ctx.fillRect(0, 0, this.canvasBoard.width, this.canvasBoard.height);
    for (const item of this.data) {
      this.addItem(item);
    }
    console.log(this.data);
  }

  addItem(item: Shapes) {
    if (item.type === "rectangle") {
      this.drawBoard.rectangle(item.x, item.y, item.width, item.height, {
        ...DefaultOptions,
      });
    } else if (item.type === "circle") {
      this.drawBoard.circle(item.centerX, item.centerY, item.diameter, {
        ...DefaultOptions,
      });
    }
  }

  initMouseHandlers() {
    this.canvasBoard.addEventListener("mouseup", this.mouseUpHandler);
    this.canvasBoard.addEventListener("mousemove", this.mouseMoveHandler);
    this.canvasBoard.addEventListener("mousedown", this.mouseDownHandler);
  }

  destroy() {
    this.canvasBoard.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvasBoard.removeEventListener("mousemove", this.mouseMoveHandler);
    this.canvasBoard.removeEventListener("mouseup", this.mouseUpHandler);
  }

  keyboardEventHandler = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "Escape") {
      console.log("Escape");
      this.x = null;
      this.y = null;
      this.width = null;
      this.height = null;
    }
  };
}
