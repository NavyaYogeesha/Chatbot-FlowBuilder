import React, { useState, useEffect } from "react";
import { Node } from "reactflow";
import backArrow from "../../assets/ic--outline-arrow-back.svg";

type SettingsPanelProps = {
  /**
   * The currently selected node to be edited.
   */
  selectedNode: Node;
  /**
   * Callback function to update the node's label.
   *
   * @param {string} id - The ID of the node.
   * @param {string} newText - The new text for the node label.
   */
  onNodeChange: (id: string, newText: string) => void;
  /**
   * Callback function to save the current changes.
   */
  onSave: () => void;
  /**
   * Function to update the selected node state.
   *
   * @param {Node | null} node - The node to set as selected, or null to deselect.
   */
  setSelectedNode: (node: Node | null) => void;
};

/**
 * SettingsPanel component allows users to edit the properties of a selected node.
 *
 * @param {SettingsPanelProps} props - The props for the component.
 * @returns {JSX.Element} The rendered SettingsPanel component.
 */
const SettingsPanel: React.FC<SettingsPanelProps> = ({
  selectedNode,
  onNodeChange,
  onSave,
  setSelectedNode,
}) => {
  // State to manage the text input.
  const [text, setText] = useState(selectedNode.data.label);

  /**
   * Updates the text state when the selected node changes.
   */
  useEffect(() => {
    setText(selectedNode.data.label);
  }, [selectedNode]);

  /**
   * Handles changes to the text area.
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement>} event - The change event.
   */
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    onNodeChange(selectedNode.id, newText);
  };

  /**
   * Handles the back button click to deselect the node.
   */
  const handleBackClick = () => {
    setSelectedNode(null);
  };

  return (
    <div className="settings-panel">
      <div className="edit-header">
        <div className="edit-header-content">
          <img src={backArrow} onClick={handleBackClick} alt="Back" />
          <div>Message</div>
        </div>
      </div>
      <div className="edit-body">
        <label>Text</label>
        <div>
          <textarea
            className="text-area"
            rows={5}
            value={text}
            onChange={handleTextChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSave();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
