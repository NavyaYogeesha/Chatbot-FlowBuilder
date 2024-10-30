import React from "react";
import { Handle, Position } from "reactflow";
import messageIcon from "../../assets/msg-gray.svg";
import whatsappIcon from "../../assets/whatsapp.svg";

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
          <img width="15px" src={messageIcon} />
          <span>Send Message</span>
        </div>
        <img className="whatsapp-icon" width="15px" src={whatsappIcon} />
      </div>
      <div className="text-node-body">
        <Handle type="target" position={Position.Left} id="target" />{" "}
        {/* Target handle */}
        <div>{data.label}</div>
        <Handle type="source" position={Position.Right} id="source" />{" "}
        {/* Source handle */}
      </div>
    </div>
  );
};

export default TextNode;
