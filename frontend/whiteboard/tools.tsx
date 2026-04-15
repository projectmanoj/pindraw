import {
  Circle,
  Diamond,
  Eraser,
  Hand,
  Minus,
  MoveUpRight,
  Pen,
  SlidersHorizontal,
  Sparkles,
  Square,
  Type,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tools } from "./types";

export const tools: { icon: React.ReactNode; id: Tools }[] = [
  { icon: <SlidersHorizontal />, id: "setting" },
  { icon: <Hand />, id: "hand" },
  { icon: <Type />, id: "type" },
  { icon: <MoveUpRight />, id: "arrow" },
  { icon: <Square />, id: "rectangle" },
  { icon: <Diamond />, id: "diamond" },
  { icon: <Circle />, id: "circle" },
  { icon: <Minus />, id: "line" },
  { icon: <Pen />, id: "pen" },
  { icon: <Eraser />, id: "eraser" },
  { icon: <Sparkles className="" />, id: "gen" },
];

const ToolBar = ({
  className,
  selectedTool,
  setSelectdTool,
}: {
  className: string;
  selectedTool: Tools;
  setSelectdTool: React.Dispatch<React.SetStateAction<Tools>>;
}) => {
  console.log(selectedTool);

  return (
    <div className={cn(className)}>
      <div
        className={cn(
          "flex-column bg-yellow flex items-center justify-items-center space-x-1 rounded bg-zinc-800",
        )}
      >
        {tools.map((tool, index) => (
          <div
            className={`cursor-pointer rounded p-2 ${selectedTool === tool.id && "bg-zinc-600"}`}
            key={index}
            onClick={() => setSelectdTool(tool.id)}
          >
            {tool.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolBar;
