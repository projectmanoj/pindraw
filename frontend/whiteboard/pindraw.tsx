"use client";
import { WhiteBoard } from "./canvas";
import ToolBar from "./tools";

import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { dataAtom, selectedToolAtom } from "./atoms";

const PinDraw = () => {
  const CanvasRef = useRef<HTMLCanvasElement>(null!);
  const [keyboardEvent, setKeyboardEvent] = useState<
    (e: KeyboardEvent) => void
  >(() => {});
  const [selectedTool, setSelectdTool] = useAtom(selectedToolAtom);
  const [data, setData] = useAtom(dataAtom);

  useEffect(() => {
    if (CanvasRef.current != null) {
      const session = new WhiteBoard({
        canvRef: CanvasRef,
        selectedTool: selectedTool,
        data: data,
        setData: setData,
        keyboardEventHandler: setKeyboardEvent,
      });
      return () => session.destroy();
    }
  }, [CanvasRef, selectedTool, data, setData]);

  useEffect(() => {
    if (keyboardEvent) {
      document.addEventListener("keydown", keyboardEvent);
      return () => document.removeEventListener("keydown", keyboardEvent);
    }
  }, [keyboardEvent]);

  useEffect(() => {
    console.log(selectedTool);
  }, [selectedTool]);

  return (
    <div className="static">
      <ToolBar
        className="absolute top-5 flex w-full justify-center"
        setSelectdTool={setSelectdTool}
        selectedTool={selectedTool}
      />
      <canvas ref={CanvasRef} />
    </div>
  );
};

export default PinDraw;
