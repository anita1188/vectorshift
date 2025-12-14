import { nodeConfigs } from '../components/nodeConfigs';
import { Handle, Position } from 'reactflow';
import TextAreaAutosize from 'react-textarea-autosize';
import { useState, useEffect } from 'react';
import '../styles/node-styles.css';

export const TextNode = ({ id, data }) => {
  const config = nodeConfigs.text;
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variableHandles, setVariableHandles] = useState([]);

  const extractVariables = (content) => {
    const regex = /\{\{([A-Za-z_$][A-Za-z0-9_$]*)\}\}/g;
    const vars = new Set();
    let match;

    while ((match = regex.exec(content)) !== null) {
      vars.add(match[1]);
    }

    return Array.from(vars).sort();
  };

  useEffect(() => {
    const variables = extractVariables(text);
    setVariableHandles(
      variables.map((varName, index) => ({
        id: `var:${varName}`,
        position: ((index + 1) * 100) / (variables.length + 1),
      }))
    );
  }, [text]);

  const handleTextChange = (value) => {
    setText(value);
  };

  return (
    <div className="base-node" style={{ width: 240, minHeight: 140 }}>
      <div className="node-header">
        <div className="node-title">{config.title}</div>
        <div className="node-subtitle">{config.subtitle}</div>
      </div>

      <div className="node-fields">
        <label className="node-field">
          Text
          <TextAreaAutosize
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            className="node-textarea"
            minRows={3}
            maxRows={8}
          />
        </label>
      </div>

      {variableHandles.map(handle => (
        <Handle
          key={`input-${handle.id}`}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={{ top: `${handle.position}%` }}
          className="node-handle variable-handle"
        />
      ))}

      <Handle
        type="source"
        position={Position.Right}
        id={config.outputs[0].id}
        style={{ top: `${config.outputs[0].position}%` }}
        className="node-handle"
      />
    </div>
  );
};
