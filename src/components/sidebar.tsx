import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SidebarProps {
  inputText: string;
  onInputChange: (value: string) => void;
  onGenerateClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  inputText,
  onInputChange,
  onGenerateClick,
}) => {
  return (
    <div className="bg-[#1D1D21] w-[40vw]">
      <div className="p-4 border-b-2">
        <img src="/opaio.png" width={"120px"} alt="Logo" />
      </div>
      <div className="flex flex-col p-4 space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-[#F2F2F3] font-semibold">Text to Diagram</h1>
          <p className="text-[#D0D0D0] text-sm">
            Use AI algorithms to interpret and structure text, then employ
            AI-driven diagram tools to create a visually cohesive and precise
            charts representing the expanded prompt
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-[#F2F2F3] font-semibold">Type</p>
          <div className="flex flex-row w-full space-x-2">
            <Link href="/" className="w-full">
              <Button variant="secondary" className="w-full bg-[#2C2C30]">
                Flow
              </Button>
            </Link>
            <Link href="/radar" className="w-full">
              <Button variant="secondary" className="w-full bg-[#2C2C30]">
                Radar
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-[#F2F2F3] font-semibold">Prompt</p>
          <Textarea
            className="bg-[#2C2C30] h-[300px]"
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
          />
          <Button onClick={onGenerateClick}>Generate</Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
