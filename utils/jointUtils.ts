import { dia } from '@joint/core';

// Initialize JointJS graph and paper
export const initializeJointJS = (
  canvasRef: React.RefObject<HTMLDivElement>
) => {
  if (!canvasRef.current) {
    throw new Error('Canvas reference is not valid.');
  }

  const graph = new dia.Graph();
  const paper = new dia.Paper({
    el: canvasRef.current,
    model: graph,
    width: 400,
    height: 500,
    gridSize: 10,
    interactive: true,
    allowDropFromOutside: true,
  });

  return { graph, paper };
};
