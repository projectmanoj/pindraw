import { RoughCanvas } from "roughjs/bin/canvas";
import React from "react";
import { FillStyle, Options, TextOptions, Shapes, Text, Tools } from "./types";
import { Options as DefaultRoughOptions } from "roughjs/bin/core";

export const DefaultOptions: Options = {
  seed: 12345,
  fill: "yellow",
  bowing: 10,
  fillStyle: "cross-hatch",
  stroke: "silver",
  strokeWidth: 3,
  roughness: 0,
};

export class WhiteBoard {
  private canvRef: React.RefObject<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private canvasBoard: HTMLCanvasElement;
  private drawBoard: RoughCanvas;

  private data: (Shapes | Text)[];
  private setData: React.Dispatch<React.SetStateAction<(Shapes | Text)[]>>;

  private selectedTool: Tools = "rectangle";
  private fillColor: string = "red";
  private fillStyle: FillStyle = "hachure";

  private start: boolean = false;
  private x: number | null = null;
  private y: number | null = null;
  private width: number | null = null;
  private height: number | null = null;

  constructor({
    canvRef,
    selectedTool,
    data,
    setData,
    keyboardEventHandler,
  }: {
    canvRef: React.RefObject<HTMLCanvasElement>;
    selectedTool: Tools;
    data: (Shapes | Text)[];
    setData: React.Dispatch<React.SetStateAction<(Shapes | Text)[]>>;
    keyboardEventHandler: React.Dispatch<
      React.SetStateAction<(e: KeyboardEvent) => void>
    >;
  }) {
    canvRef.current.width = window.innerWidth;
    canvRef.current.height = window.innerHeight;
    this.canvRef = canvRef;
    this.selectedTool = selectedTool;
    this.canvasBoard = this.canvRef.current;
    this.ctx = this.canvasBoard.getContext("2d")!;
    this.drawBoard = new RoughCanvas(this.canvasBoard, {
      options: {
        ...(DefaultOptions as DefaultRoughOptions),
      },
    });
    this.data = data;
    this.setData = setData;
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
      if (this.x !== null && this.y !== null) {
        this.start = true;
        if (this.selectedTool === "rectangle") {
          this.addItem({
            type: "rectangle",
            x: this.x,
            y: this.y,
            width: e.x - this.x,
            height: e.y - this.y,
            options: {
              fill: this.fillColor,
              fillStyle: this.fillStyle,
            },
          });
        } else if (this.selectedTool === "circle") {
          this.addItem({
            type: "circle",
            centerX: this.x,
            centerY: this.y,
            diameter:
              2 *
              Math.sqrt(Math.pow(e.x - this.x, 2) + Math.pow(e.y - this.y, 2)),
            options: {
              fill: this.fillColor,
              fillStyle: this.fillStyle,
            },
          });
        }
      }
    }
  };

  mouseUpHandler = (e: MouseEvent) => {
    console.log("**********UP**********");

    if (this.x !== null && this.y !== null) {
      const x = this.x;
      const y = this.y;
      if (!(x === e.x && y === e.y)) {
        if (this.selectedTool === "rectangle") {
          this.setData((data) => [
            ...data,
            {
              type: "rectangle",
              x,
              y,
              width: e.x - x,
              height: e.y - y,
              options: { fill: this.fillColor, fillStyle: this.fillStyle },
            },
          ]);
        } else if (this.selectedTool === "circle") {
          this.setData((data) => [
            ...data,
            {
              type: "circle",
              centerX: x,
              centerY: y,
              diameter:
                2 * Math.sqrt(Math.pow(e.x - x, 2) + Math.pow(e.y - y, 2)),
              options: {
                fill: this.fillColor,
                fillStyle: this.fillStyle,
              },
            },
          ]);
        }
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
    this.ctx.fillStyle = "#09090b";
    this.ctx.fillRect(0, 0, this.canvasBoard.width, this.canvasBoard.height);
    for (const item of this.data) {
      if (item.type === "text") {
        this.addText(item.text, item.x, item.y, item.options);
      } else {
        this.addItem(item);
      }
    }
    console.log(this.data);
  }

  addItem(item: Shapes | Text) {
    if (item.type === "text") {
      this.addText("Hello", item.x, item.y);
    }
    if (item.type === "rectangle") {
      this.drawBoard.rectangle(
        item.x,
        item.y,
        item.width,
        item.height,
        item.options,
      );
    } else if (item.type === "circle") {
      this.drawBoard.circle(
        item.centerX,
        item.centerY,
        item.diameter,
        item.options,
      );
    }
  }
  addText(text: string, x: number, y: number, options: TextOptions = {}) {
    const {
      font,
      fillStyle,
      strokeStyle,
      textAlign,
      textBaseline,
      direction,
      maxWidth,
      stroke,
      opacity,
      textRendering,
    } = options;
    this.ctx.save();

    if (font) this.ctx.font = font;
    if (fillStyle) this.ctx.fillStyle = fillStyle;
    if (strokeStyle) this.ctx.strokeStyle = strokeStyle;
    if (textAlign) this.ctx.textAlign = textAlign;
    if (textBaseline) this.ctx.textBaseline = textBaseline;
    if (direction) this.ctx.direction = direction;
    if (textRendering && "textRendering" in this.ctx) {
      // @ts-expect-error: textRendering not in older lib.dom.d.ts
      ctx.textRendering = textRendering;
    }
    if (typeof opacity === "number") this.ctx.globalAlpha *= opacity;

    if (typeof maxWidth === "number") {
      this.ctx.fillText(text, x, y, maxWidth);
      if (stroke) this.ctx.strokeText(text, x, y, maxWidth);
    } else {
      this.ctx.fillText(text, x, y);
      if (stroke) this.ctx.strokeText(text, x, y);
    }

    this.ctx.restore();
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
      this.start = false;
      this.x = null;
      this.y = null;
      this.width = null;
      this.height = null;
    }
  };
}
