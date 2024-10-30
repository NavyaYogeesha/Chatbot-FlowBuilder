import React from "react";

/**
 * NodePanel component that allows users to drag and drop nodes into the flow.
 *
 * @returns {JSX.Element} The rendered NodePanel component.
 */
const NodePanel: React.FC = () => {
  /**
   * Handles the drag start event for nodes in the panel.
   *
   * @param {React.DragEvent} event - The drag event.
   * @param {string} nodeType - The type of node being dragged.
   */
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="node-panel">
      <div className="message-container" onDragStart={(event) => onDragStart(event, "textNode")} draggable>
        <div className="message">
          <div className="message-icon-container">
            <img src="src/assets/msg-blue.svg" width="25px" alt="Message Icon" />
            <div>Message</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodePanel;
