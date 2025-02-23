import { shapes } from '@joint/core';

// Function to create shapes
export const createShape = (
  type: string,
  position: { x: number; y: number },
  color: string
) => {
  switch (type) {
    case 'rectangle':
      return new shapes.standard.Rectangle({
        position,
        size: { width: 100, height: 40 },
        attrs: {
          body: {
            fill: color,
            stroke: '#2980b9',
            strokeWidth: 2,
          },
          label: {
            text: 'Server',
            fill: '#ffffff',
            fontSize: 14,
          },
        },
      });
    case 'circle':
      return new shapes.standard.Circle({
        position,
        size: { width: 80, height: 80 },
        attrs: {
          body: {
            fill: color,
            stroke: '#c0392b',
            strokeWidth: 2,
          },
          label: {
            text: 'DB',
            fill: '#ffffff',
            fontSize: 14,
          },
        },
      });
    default:
      throw new Error(`Unknown shape type: ${type}`);
  }
};
