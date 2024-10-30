import React, { useState } from "react";
import FlowBuilder from "./components/FlowBuilder";
import NodePanel from "./components/NodePanel";
import SettingsPanel from "./components/SettingsPanel";
import SaveButton from "./components/SaveButton";
import { Node } from "reactflow";

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "1",
      type: "textNode",
      position: { x: 250, y: 5 },
      data: { label: "Default Node" },
    },
  ]);

/**
 * Function to Edit the text in node body
 * @param id 
 * @param newText 
 */
  const handleNodeTextChange = (id: string, newText: string) => {
    setNodes((nds) => nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, label: newText } } : node)));
  };

 /**
  * Function to add new node
  */
  const addNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: "textNode",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: "New Text" },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  return (
    <div className="app-container">
      <FlowBuilder nodes={nodes} setNodes={setNodes} setSelectedNode={setSelectedNode} />
      {!selectedNode ? (
        <NodePanel addNode={addNode} />
      ) : (
        <SettingsPanel
          selectedNode={selectedNode}
          onNodeChange={handleNodeTextChange}
          setSelectedNode={setSelectedNode}
          onSave={() => setSelectedNode(null)} // Exit settings on save
        />
      )}
    </div>
  );
};

export default App;
