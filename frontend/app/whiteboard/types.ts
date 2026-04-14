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
