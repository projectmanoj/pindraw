import { atom } from "jotai";
import { Shapes, Text, Tools } from "./types";

export const dataAtom = atom<(Shapes | Text)[]>([
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
  {
    type: "text",
    x: 50,
    y: 50,
    text: "Hello",
    options: { font: "32px Virgil, sans-serif", fillStyle: "#ffffff" },
  },
]);

export const selectedToolAtom = atom<Tools>("hand");
