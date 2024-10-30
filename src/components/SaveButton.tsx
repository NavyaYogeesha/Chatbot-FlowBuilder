import React from "react";
import { Edge, Node } from "reactflow";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Detects cycles in a directed graph using Depth-First Search (DFS).
 *
 * @param {Node[]} nodes - Array of nodes in the graph.
 * @param {Edge[]} edges - Array of edges in the graph.
 * @returns {boolean} True if a cycle is detected, false otherwise.
 */
const detectCycle = (nodes: Node[], edges: Edge[]): boolean => {
  const adjacencyList = new Map<string, string[]>();

/**
 *  Build adjacency list
 */
  nodes.forEach((node) => {
    adjacencyList.set(node.id, []);
  });

  edges.forEach((edge) => {
    adjacencyList.get(edge.source)?.push(edge.target);
  });

  const visited = new Set<string>();
  const recStack = new Set<string>();

  /**
   * Recursive helper function for DFS traversal.
   *
   * @param {string} nodeId - Current node ID.
   * @returns {boolean} True if a cycle is detected from this node, false otherwise.
   */
  const dfs = (nodeId: string): boolean => {
    if (recStack.has(nodeId)) {
      // Cycle detected
      return true;
    }

    if (visited.has(nodeId)) {
      // Already visited this node; no cycle from this path
      return false;
    }

    visited.add(nodeId);
    recStack.add(nodeId);

    const neighbors = adjacencyList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (dfs(neighbor)) {
        return true;
      }
    }

    recStack.delete(nodeId);
    return false;
  };

  // Check for cycles starting from each node
  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Checks if there are multiple sink nodes (nodes with no outgoing edges).
 *
 * @param {Node[]} nodes - Array of nodes in the graph.
 * @param {Edge[]} edges - Array of edges in the graph.
 * @returns {boolean} True if there are multiple sink nodes, false otherwise.
 */
const hasMultipleSinkNodes = (nodes: Node[], edges: Edge[]): boolean => {
  const sinkNodes = nodes.filter((node) => !edges.some((edge) => edge.source === node.id));
  return sinkNodes.length > 1;
};

// Define the props type for the SaveButton component
type SaveButtonProps = {
  nodes: Node[];
  edges: Edge[];
};

/**
 * SaveButton component that provides a button to save the flow.
 * Validates the flow for multiple sink nodes and cycles before saving.
 *
 * @param {SaveButtonProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const SaveButton: React.FC<SaveButtonProps> = ({ nodes, edges }) => {
  /**
   * Handler function for the Save button click event.
   * Validates the flow for multiple sink nodes and cycles.
   */
  const handleSave = () => {
    // Check for cycles in the graph
    if (detectCycle(nodes, edges)) {
      toast.error("Error: The flow contains cycles!", {
        position: "top-center",
      });
      return;
    }

    // Check for multiple sink nodes
    if (hasMultipleSinkNodes(nodes, edges)) {
      toast.error("Error: There is more than one node with no outgoing edges!", {
        position: "top-center",
      });
      return;
    }

    // If all validations pass
    toast.success("Flow saved successfully", {
      position: "top-center",
    });
  };

  return (
    <>
      <button onClick={handleSave}>Save Flow</button>
      <ToastContainer closeButton={false} />
    </>
  );
};

export default SaveButton;
