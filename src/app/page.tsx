"use client";
import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  const [initialNodes, setInitialNodes] = useState([]);
  const [initialEdges, setInitialEdges] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [inputText, setInputText] = useState<string>("");

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onGenerateClick = () => {
    const nodesRegex = /const\s+initialNodes\s*=\s*\[([^\]]+)\]/;
    const edgesRegex = /const\s+initialEdges\s*=\s*\[([^\]]+)\]/;

    const nodesMatch = inputText.match(nodesRegex);
    const edgesMatch = inputText.match(edgesRegex);

    const newNodes = nodesMatch ? eval(`[${nodesMatch[1]}]`) : [];
    const newEdges = edgesMatch ? eval(`[${edgesMatch[1]}]`) : [];

    setInitialNodes(newNodes);
    setInitialEdges(newEdges);
  };

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="bg-[#1D1D21] w-[40vw]">
        <div className="p-4 border-b-2">
          <img src="/opaio.png" width={"120px"} alt="Logo" />
        </div>
        <div className="flex flex-col p-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-[#F2F2F3] font-semibold">Text to Diagram</h1>
            <p className="text-[#D0D0D0] text-sm">
              Leverage AI algorithms for text interpretation and structuring,
              followed by the use of AI-driven diagram tools to craft a visually
              cohesive flow chart, guaranteeing precision in representing the
              expanded prompt
            </p>
            <p className="text-[#D0D0D0] text-sm">
              • Type a detailed prompt of the flow diagram you want to generate
            </p>
            <p className="text-[#D0D0D0] text-sm">
              • Wait a few seconds for the diagram to generate
            </p>
            <p className="text-[#D0D0D0] text-sm">
              • You can keep on modifying the generated diagram
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-[#F2F2F3] font-semibold">Prompt</p>
            <Textarea
              className="bg-[#2C2C30] h-[300px]"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button onClick={onGenerateClick}>Generate</Button>
          </div>
        </div>
      </div>

      <div style={{ width: "100vw", height: "100vh" }} className="bg-[#0E0E12]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <Background variant="dots" gap={50} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Home;
