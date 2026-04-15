export type Tools =
  | "setting"
  | "hand"
  | "type"
  | "gen"
  | "diamond"
  | "arrow"
  | "pen"
  | "eraser"
  | ShapesTypes;

export type Shapes =
  | RectangleShape
  | CircleShape
  | LineShape
  | EllipseShape
  | LinePathShape
  | PolygonShape
  | ArcShape
  | CurveShape
  | PathShape;

export type ShapesTypes = Shapes["type"];
export type Point = [number, number];

export type FillStyle =
  | "hachure"
  | "solid"
  | "zigzag"
  | "cross-hatch"
  | "dots"
  | "dashed"
  | "zigzag-line";

export type Options = BaseOptions &
  Partial<Pick<CurvedShapeOptions, "curveStepCount" | "curveFitting">> &
  Partial<Pick<PathOptions, "simplification">> &
  Partial<Pick<DashedFillOptions, "dashOffset" | "dashGap">> &
  Partial<Pick<ZigzagLineFillOptions, "zigzagOffset">>;

export type Text = {
  type: "text";
  text: string;
  x: number;
  y: number;
  options?: TextOptions;
};

type RectangleShape = {
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
  options?: BaseOptions;
};

type CircleShape = {
  type: "circle";
  centerX: number;
  centerY: number;
  diameter: number;
  options?: CurvedShapeOptions;
};
type LineShape = {
  type: "line";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  options?: BaseOptions;
};
type EllipseShape = {
  type: "ellipse";
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  options?: CurvedShapeOptions;
};
type LinePathShape = {
  type: "linearPath";
  points: Point[];
  options?: BaseOptions;
};

type PolygonShape = {
  type: "polygon";
  points: Point[];
  options?: BaseOptions;
};
type ArcShape = {
  type: "arc";
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  start: number;
  stop: number;
  closed: boolean;
  options?: CurvedShapeOptions;
};
type CurveShape = {
  type: "curve";
  points: Point[];
  options?: BaseOptions;
};
type PathShape = {
  type: "path";
  d: string;
  options?: PathOptions;
};

export interface BaseOptions {
  roughness?: number;
  bowing?: number;
  seed?: number;

  stroke?: string;
  strokeWidth?: number;

  fill?: string;
  fillStyle?: FillStyle;
  fillWeight?: number;
  hachureAngle?: number;
  hachureGap?: number;

  strokeLineDash?: number[];
  strokeLineDashOffset?: number;
  fillLineDash?: number[];
  fillLineDashOffset?: number;

  disableMultiStroke?: boolean;
  disableMultiStrokeFill?: boolean;
  preserveVertices?: boolean;
}

export interface CurvedShapeOptions extends BaseOptions {
  curveStepCount?: number;
  curveFitting?: number;
}

export interface PathOptions extends BaseOptions {
  simplification?: number;
}

export interface DashedFillOptions extends BaseOptions {
  dashOffset?: number;
  dashGap?: number;
}

export interface ZigzagLineFillOptions extends BaseOptions {
  zigzagOffset?: number;
}

/**
 ***************************************************************
 ****************************TEXT*******************************
 ***************************************************************
 */
type CanvasTextAlign = "left" | "right" | "center" | "start" | "end"; // textAlign [web:52][web:53]
type CanvasTextBaseline =
  | "top"
  | "hanging"
  | "middle"
  | "alphabetic"
  | "ideographic"
  | "bottom"; // textBaseline [web:49][web:50][web:34]

type CanvasTextDirection = "ltr" | "rtl" | "inherit"; // direction [web:59]

export interface TextOptions {
  /**
   * CSS font string, e.g. "24px Virgil, sans-serif"
   * Falls back to ctx.font if omitted.
   */
  font?: string; // [web:34][web:54]

  /**
   * Fill color/gradient/pattern, used by fillText.
   * Defaults to ctx.fillStyle.
   */
  fillStyle?: string | CanvasGradient | CanvasPattern; // [web:38][web:53]

  /**
   * Stroke color (if you also use strokeText).
   * Defaults to ctx.strokeStyle.
   */
  strokeStyle?: string | CanvasGradient | CanvasPattern; // [web:38][web:54]

  /**
   * Horizontal alignment relative to (x, y).
   */
  textAlign?: CanvasTextAlign; // [web:52][web:53]

  /**
   * Vertical alignment baseline relative to y.
   */
  textBaseline?: CanvasTextBaseline; // [web:49][web:50][web:34]

  /**
   * Text direction for bidi text.
   */
  direction?: CanvasTextDirection; // [web:59]

  /**
   * Optional max width; forwarded to fillText for shrink-to-fit behavior.
   */
  maxWidth?: number; // [web:38][web:34]

  /**
   * Optional flag to also stroke the text after filling.
   */
  stroke?: boolean;

  /**
   * Optional opacity multiplier (0–1), applied via globalAlpha.
   */
  opacity?: number; // [web:39]

  /**
   * Optional textRendering hint (browser may honor it).
   */
  textRendering?:
    | "auto"
    | "optimizeSpeed"
    | "optimizeLegibility"
    | "geometricPrecision"; // [web:55]
}
