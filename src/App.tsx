import { Node } from "reactflow";
import React, { useState } from "react";

import NodePanel from "./components/Panels/NodePanel";
import FlowBuilder from "./components/FlowBuilder";
import SettingsPanel from "./components/Panels/SettingsPanel";

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
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, label: newText } }
          : node
      )
    );
  };

  return (
    <div className="app-container">
      <FlowBuilder
        nodes={nodes}
        setNodes={setNodes}
        setSelectedNode={setSelectedNode}
      />
      {!selectedNode ? (
        <NodePanel />
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
