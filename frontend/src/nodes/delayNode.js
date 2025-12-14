import { BaseNode } from '../components/BaseNode';
import { nodeConfigs } from '../components/nodeConfigs';

export const DelayNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      config={nodeConfigs.delay}
    />
  );
};
