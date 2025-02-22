import React, { useState } from 'react';
import DiagramEditor from '../components/DiagramEditor';
import { generateCode, terraformTemplate } from '../utils/codeGenerator';

const Home = () => {
  const [generatedCode, setGeneratedCode] = useState('');

  const handleGenerateCode = () => {
    const diagramData = {
      server: { type: 'aws_instance', name: 'web-server' },
      database: { type: 'aws_rds_instance', name: 'main-db' },
    };
    const code = generateCode(diagramData, terraformTemplate);
    setGeneratedCode(code);
  };

  return (
    <div>
      <h1>Diagramming App</h1>
      <DiagramEditor />
      <button onClick={handleGenerateCode}>Generate Code</button>
      <pre>{generatedCode}</pre>
    </div>
  );
};

export default Home;