// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='uppercase' label='Uppercase' />
                <DraggableNode type='concat' label='Concat' />
                <DraggableNode type='regexReplace' label='Regex Replace' />
                <DraggableNode type='number' label='Number' />
                <DraggableNode type='delay' label='Delay' />
            </div>
        </div>
    );
};
