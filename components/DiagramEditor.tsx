import React, { useEffect, useRef } from 'react';
import { dia, shapes } from '@joint/core';

const DiagramEditor = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const graph = new dia.Graph();
        const paper = new dia.Paper({
            el: canvasRef.current,
            model: graph,
            width: 800,
            height: 600,
            gridSize: 10,
        });

        const rect = new shapes.standard.Rectangle({
            position: { x: 100, y: 100 },
            size: { width: 100, height: 40 },
            attrs: { label: { text: 'Server' } },
        });

        const circle = new shapes.standard.Circle({
            position: { x: 300, y: 100 },
            size: { width: 40, height: 40 },
            attrs: { label: { text: 'DB' } },
        });

        graph.addCells([rect, circle]);
    }, []);

    return <div ref={canvasRef}></div>;
};

export default DiagramEditor;