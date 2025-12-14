import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      const payload = {
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data,
        })),
        edges: edges.map(edge => ({
          source: edge.source,
          target: edge.target,
          id: edge.id,
        })),
      };

      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const dagStatus = data.is_dag ? 'Yes' : 'No';
      alert(`Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nDAG: ${dagStatus}`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px'}}>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
}
