import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { dia } from '@joint/core';

// // Save graph to Firestore
// export const saveGraphToFirestore = async (
//   graph: dia.Graph,
//   documentId: string
// ) => {
//   const graphJSON = graph.toJSON();
//   await setDoc(doc(db, 'diagrams', documentId), { graph: graphJSON });
//   console.log('Graph saved to Firestore');
// };

// // Load graph from Firestore
// export const loadGraphFromFirestore = async (
//   graph: dia.Graph,
//   documentId: string
// ) => {
//   const docRef = doc(db, 'diagrams', documentId);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     const graphJSON = docSnap.data().graph;
//     graph.fromJSON(graphJSON);
//     console.log('Graph loaded from Firestore');
//   } else {
//     console.log('No such document!');
//   }
// };

// Save graph to Firestore
export const saveGraphToFirestore = async (
  graph: dia.Graph,
  diagramName: string
) => {
  if (!diagramName) {
    alert('Please enter a diagram name.');
    return;
  }

  const graphJSON = graph.toJSON();
  await setDoc(doc(db, 'diagrams', diagramName), { graph: graphJSON });
  console.log('Graph saved to Firestore');
};

// Load graph from Firestore
export const loadGraphFromFirestore = async (
  graph: dia.Graph,
  diagramName: string
) => {
  if (!diagramName) {
    alert('Please enter a diagram name.');
    return;
  }

  const docRef = doc(db, 'diagrams', diagramName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const graphJSON = docSnap.data().graph;
    graph.fromJSON(graphJSON);
    console.log('Graph loaded from Firestore');
  } else {
    console.log('No such document!');
  }
};
