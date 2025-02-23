import React, { useEffect, useRef, useState } from 'react';
import { dia } from '@joint/core';
import { initializeJointJS } from '../utils/jointUtils';
import { createShape } from '../utils/shapeUtils';
import { saveGraphToFirestore, loadGraphFromFirestore } from '../utils/firebaseUtils';

const DiagramEditor = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [draggingShape, setDraggingShape] = useState<string | null>(null);
    const [shapeColor, setShapeColor] = useState<string>('#3498db'); // Default color
    const [diagramName, setDiagramName] = useState<string>(''); // Diagram name
    const graph = useRef<dia.Graph | null>(null);
    const paper = useRef<dia.Paper | null>(null);

    useEffect(() => {
        if (!canvasRef.current) {
            console.error('Canvas ref is not attached to the DOM element.');
            return;
        }

        //console.log('Canvas ref:', canvasRef.current); // Debugging
        // console.log('Canvas dimensions:', {
        //     width: canvasRef.current.clientWidth,
        //     height: canvasRef.current.clientHeight,
        // }); // Debugging

        try {
            // Initialize JointJS graph and paper
            const { graph: jointGraph, paper: jointPaper } = initializeJointJS(canvasRef);
            graph.current = jointGraph;
            paper.current = jointPaper;

            // console.log('Graph:', jointGraph); // Debugging
            // console.log('Paper:', jointPaper); // Debugging

            // Handle native drop event
            const handleDrop = (event: DragEvent) => {
                event.preventDefault();
                // console.log('Drop event fired'); // Debugging
                if (!paper.current || !draggingShape || !canvasRef.current) return;

                // Get the canvas's bounding rectangle
                const canvasRect = canvasRef.current.getBoundingClientRect();

                // Calculate the drop position relative to the canvas
                const x = event.clientX - canvasRect.left;
                const y = event.clientY - canvasRect.top;

                console.log('Drop position:', { x, y }); // Debugging

                // Create the shape at the drop position
                const shape = createShape(draggingShape, { x, y }, shapeColor);
                console.log('Shape created:', shape); // Debugging
                graph.current?.addCell(shape);
                setDraggingShape(null);
            };

            // Prevent default drag behavior
            const handleDragOver = (event: DragEvent) => {
                event.preventDefault();
            };

            const canvas = canvasRef.current;
            canvas.addEventListener('drop', handleDrop);
            canvas.addEventListener('dragover', handleDragOver);

            return () => {
                canvas.removeEventListener('drop', handleDrop);
                canvas.removeEventListener('dragover', handleDragOver);
            };
        } catch (error) {
            console.error('Error initializing JointJS:', error);
        }
    }, [draggingShape, shapeColor]);

    return (
        <div style={{ display: 'flex' }}>
            {/* Toolbar */}
            <div style={{ width: '150px', padding: '10px', borderRight: '1px solid #ccc' }}>
                <h3>Shapes</h3>
                <div>
                    <label>Shape Color:</label>
                    <input
                        type="color"
                        value={shapeColor}
                        onChange={(e) => setShapeColor(e.target.value)}
                    />
                </div>
                <div>
                    <label>Diagram Name:</label>
                    <input
                        type="text"
                        value={diagramName}
                        onChange={(e) => setDiagramName(e.target.value)}
                        placeholder="Enter diagram name"
                    />
                </div>
                <div
                    draggable
                    onDragStart={() => setDraggingShape('rectangle')}
                    style={{ padding: '10px', margin: '5px', border: '1px solid #ccc', cursor: 'grab' }}
                >
                    Rectangle
                </div>
                <div
                    draggable
                    onDragStart={() => setDraggingShape('circle')}
                    style={{ padding: '10px', margin: '5px', border: '1px solid #ccc', cursor: 'grab' }}
                >
                    Circle
                </div>
                <button
                    onClick={() => saveGraphToFirestore(graph.current!, diagramName)}
                    style={{ padding: '10px', margin: '5px', border: '1px solid #ccc', cursor: 'pointer' }}
                >
                    Save Diagram
                </button>
                <button
                    onClick={() => loadGraphFromFirestore(graph.current!, diagramName)}
                    style={{ padding: '10px', margin: '5px', border: '1px solid #ccc', cursor: 'pointer' }}
                >
                    Load Diagram
                </button>
            </div>
            {/* Canvas */}
            <div
                ref={canvasRef}
                style={{ flex: 1, border: '1px solid #ccc', width: '100%', height: '100vh', backgroundColor: '#f0f0f0' }}
            ></div>
        </div>
    );
};

export default DiagramEditor;