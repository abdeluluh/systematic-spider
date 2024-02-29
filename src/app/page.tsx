"use client";
import Sidebar from "@/components/sidebar";
import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  OnConnect,
} from "reactflow";
import "reactflow/dist/style.css";

const Home: React.FC = () => {
  const [initialNodes, setInitialNodes] = useState([]);
  const [initialEdges, setInitialEdges] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [inputText, setInputText] = useState<string>("");

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      if (params.source && params.target) {
        setEdges((eds) => addEdge(params, eds));
      }
    },
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
      <Sidebar
        inputText={inputText}
        onInputChange={setInputText}
        onGenerateClick={onGenerateClick}
      />

      <div style={{ width: "100vw", height: "100vh" }} className="bg-[#0E0E12]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Home;
