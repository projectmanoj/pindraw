"use client";
import { DefaultOptions, WhiteBoard } from "@/app/whiteboard/canvas";
import React, { useEffect, useRef, useState } from "react";
import { RoughCanvas } from "roughjs/bin/canvas";
import { Config } from "roughjs/bin/core";

const Page = () => {
  const CanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawBoard, setDrawBoard] = useState<RoughCanvas>();
  const [canvasBoard, setCanvasBoard] = useState<HTMLCanvasElement>();
  const [keyboardEvent, setKeyboardEvent] = useState<
    (e: KeyboardEvent) => void
  >(() => {});

  useEffect(() => {
    if (CanvasRef.current != null) {
      CanvasRef.current.width = window.innerWidth;
      CanvasRef.current.height = window.innerHeight;
      setCanvasBoard(CanvasRef.current);
      const roughCanvas = new RoughCanvas(CanvasRef.current, {
        ...(DefaultOptions as Config),
      });
      setDrawBoard(roughCanvas);
    }
  }, [CanvasRef]);

  useEffect(() => {
    if (canvasBoard && drawBoard) {
      const session = new WhiteBoard({
        canvasBoard: canvasBoard,
        drawBoard: drawBoard,
        keyboardEventHandler: setKeyboardEvent,
      });
      return () => session.destroy();
    }
  }, [canvasBoard, drawBoard]);

  useEffect(() => {
    if (keyboardEvent) {
      document.addEventListener("keydown", keyboardEvent);
      return () => document.removeEventListener("keydown", keyboardEvent);
    }
  }, [keyboardEvent]);

  return <canvas ref={CanvasRef} />;
};

export default Page;
