import { dia } from '@joint/core';

// Initialize JointJS graph and paper
export const initializeJointJS = (
  canvasRef: React.RefObject<HTMLDivElement>
) => {
  const graph = new dia.Graph();
  const paper = new dia.Paper({
    el: canvasRef.current!,
    model: graph,
    width: 800,
    height: 600,
    gridSize: 10,
    interactive: true,
    allowDropFromOutside: true,
  });

  return { graph, paper };
};
