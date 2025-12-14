import { BaseNode } from '../components/BaseNode';
import { nodeConfigs } from '../components/nodeConfigs';

export const RegexReplaceNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      config={nodeConfigs.regexReplace}
    />
  );
};
