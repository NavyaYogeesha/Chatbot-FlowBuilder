import React from "react";
import { Handle, Position } from "reactflow";

type TextNodeProps = {
  data: {
    label: string;
  };
};

const TextNode: React.FC<TextNodeProps> = ({ data }) => {
  return (
    <div className="text-node">
      <div className="text-node-header">
        <div className="header-left">
        <img  width="15px" src="src/assets/msg-gray.svg" />
        <span>Send Message</span>
        </div>
        <img className="whatsapp-icon" width="15px" src="src/assets/whatsapp.svg" />
      </div>
      <div className="text-node-body">
        <Handle type="target" position={Position.Left} id="target" /> {/* Target handle */}
        <div>{data.label}</div>
        <Handle type="source" position={Position.Right} id="source" /> {/* Source handle */}
      </div>
    </div>
  );
};

export default TextNode;
