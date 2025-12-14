export const nodeConfigs = {
  customInput: {
    title: 'Input',
    subtitle: 'Define input',
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: 'input_1',
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        options: ['Text', 'File'],
        defaultValue: 'Text',
      },
    ],
    outputs: [{ id: 'value', position: 50 }],
    width: 220,
    minHeight: 120,
  },

  customOutput: {
    title: 'Output',
    subtitle: 'Define output',
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: 'output_1',
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        options: ['Text', 'Image'],
        defaultValue: 'Text',
      },
    ],
    inputs: [{ id: 'value', position: 50 }],
    width: 220,
    minHeight: 120,
  },

  llm: {
    title: 'LLM',
    subtitle: 'Language Model',
    inputs: [
      { id: 'system', position: 33 },
      { id: 'prompt', position: 66 },
    ],
    outputs: [{ id: 'response', position: 50 }],
    width: 200,
    minHeight: 100,
  },

  text: {
    title: 'Text',
    subtitle: 'Text with variables',
    fields: [
      {
        name: 'text',
        label: 'Text',
        type: 'textarea',
        defaultValue: '{{input}}',
        rows: 3,
      },
    ],
    outputs: [{ id: 'output', position: 50 }],
    width: 240,
    minHeight: 140,
  },

  uppercase: {
    title: 'Uppercase',
    subtitle: 'Convert to uppercase',
    fields: [
      {
        name: 'text',
        label: 'Text',
        type: 'text',
        defaultValue: '',
      },
    ],
    inputs: [{ id: 'input', position: 50 }],
    outputs: [{ id: 'output', position: 50 }],
    width: 200,
    minHeight: 100,
  },

  concat: {
    title: 'Concat',
    subtitle: 'Concatenate strings',
    fields: [
      {
        name: 'separator',
        label: 'Separator',
        type: 'text',
        defaultValue: '',
      },
    ],
    inputs: [
      { id: 'input1', position: 33 },
      { id: 'input2', position: 66 },
    ],
    outputs: [{ id: 'output', position: 50 }],
    width: 200,
    minHeight: 120,
  },

  regexReplace: {
    title: 'Regex Replace',
    subtitle: 'Replace by regex pattern',
    fields: [
      {
        name: 'pattern',
        label: 'Pattern',
        type: 'text',
        defaultValue: '',
      },
      {
        name: 'replacement',
        label: 'Replacement',
        type: 'text',
        defaultValue: '',
      },
    ],
    inputs: [{ id: 'input', position: 50 }],
    outputs: [{ id: 'output', position: 50 }],
    width: 220,
    minHeight: 140,
  },

  number: {
    title: 'Number',
    subtitle: 'Number input',
    fields: [
      {
        name: 'value',
        label: 'Value',
        type: 'text',
        defaultValue: '0',
      },
    ],
    outputs: [{ id: 'output', position: 50 }],
    width: 200,
    minHeight: 100,
  },

  delay: {
    title: 'Delay',
    subtitle: 'Delay execution (ms)',
    fields: [
      {
        name: 'milliseconds',
        label: 'Milliseconds',
        type: 'text',
        defaultValue: '1000',
      },
    ],
    inputs: [{ id: 'input', position: 50 }],
    outputs: [{ id: 'output', position: 50 }],
    width: 220,
    minHeight: 110,
  },
};
