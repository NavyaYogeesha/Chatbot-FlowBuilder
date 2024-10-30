/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  Connection,
  Edge,
  Node,
  ReactFlowInstance,
  Position,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import TextNode from "./Node/TextNode";
import SaveButton from "./SaveButton";

type FlowBuilderProps = {
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
  setSelectedNode: (node: Node | null) => void;
};

const nodeTypes = { textNode: TextNode };

const FlowBuilder: React.FC<FlowBuilderProps> = ({
  nodes,
  setNodes,
  setSelectedNode,
}) => {
  const [internalNodes, setInternalNodes, onNodesChange] = useNodesState(nodes); // Use internal state for draggable nodes
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = React.useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    React.useState<ReactFlowInstance | null>(null);

  /**
   * Function used to connect/draw edges from one node to another
   * marker end propert defined to give pointer edges
   */
  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.Arrow }, // Adds an arrow pointer to new edges
          },
          eds
        )
      ),
    [setEdges]
  );

  const onInit = useCallback(
    (rfi: ReactFlowInstance) => setReactFlowInstance(rfi),
    []
  );

  /**
   * This will show the settings panel which allows to edit the text on click of any node.
   * @param event
   * @param node
   */
  const onNodeClick = (_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  React.useEffect(() => {
    setInternalNodes(nodes);
  }, [nodes]);

  /**
   *  Handle node drag and drop within the flow area
   */
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (type === "textNode") {
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const newNode: Node = {
          id: `${internalNodes.length + 1}`,
          type: "textNode",
          position,
          data: { label: "New Text Node" },
          sourcePosition: Position.Right, // optional, to allow defining edge connections
          targetPosition: Position.Left,
        };
        const updatedNodes = [...internalNodes, newNode];
        setInternalNodes(updatedNodes);
        setNodes(updatedNodes);
      }
    },
    [reactFlowInstance, setNodes, internalNodes.length]
  );

  /**
   * Handles the drag over on mouse leave
   * @param event
   */
  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      className="flow-builder"
      ref={reactFlowWrapper}
      style={{ height: "100vh" }}
    >
      <SaveButton nodes={nodes} edges={edges} />
      <ReactFlow
        nodes={internalNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onInit={onInit}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilder;
