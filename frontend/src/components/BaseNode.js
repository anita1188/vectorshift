import { Handle, Position } from 'reactflow';
import { useState } from 'react';
import '../styles/node-styles.css';

export const BaseNode = ({
  id,
  data,
  config,
  onFieldChange,
}) => {
  const { title, subtitle, fields = [], inputs = [], outputs = [], width = 200, minHeight = 80 } = config;

  const [fieldValues, setFieldValues] = useState(() => {
    const initial = {};
    fields.forEach(field => {
      initial[field.name] = data?.[field.name] ?? field.defaultValue ?? '';
    });
    return initial;
  });

  const handleFieldChange = (fieldName, value) => {
    const newValues = { ...fieldValues, [fieldName]: value };
    setFieldValues(newValues);
    if (onFieldChange) {
      onFieldChange(fieldName, value);
    }
  };

  const renderField = (field) => {
    const value = fieldValues[field.name];

    switch (field.type) {
      case 'select':
        return (
          <label key={field.name} className="node-field">
            {field.label}
            <select
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="node-select"
            >
              {field.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        );
      case 'textarea':
        return (
          <label key={field.name} className="node-field">
            {field.label}
            <textarea
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="node-textarea"
              rows={field.rows || 3}
            />
          </label>
        );
      case 'text':
      default:
        return (
          <label key={field.name} className="node-field">
            {field.label}
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="node-input"
            />
          </label>
        );
    }
  };

  return (
    <div className="base-node" style={{ width, minHeight }}>
      <div className="node-header">
        <div className="node-title">{title}</div>
        {subtitle && <div className="node-subtitle">{subtitle}</div>}
      </div>

      {fields.length > 0 && (
        <div className="node-fields">
          {fields.map(field => renderField(field))}
        </div>
      )}

      {inputs.map(input => (
        <Handle
          key={`input-${input.id}`}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{ top: `${input.position}%` }}
          className="node-handle"
        />
      ))}

      {outputs.map(output => (
        <Handle
          key={`output-${output.id}`}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{ top: `${output.position}%` }}
          className="node-handle"
        />
      ))}
    </div>
  );
};
