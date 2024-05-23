import React, { useState } from 'react';
import yaml from 'js-yaml';
import { saveAs } from 'file-saver';

const TemplateForm = () => {
  const initialYamlTemplate = `
apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: placeholder
  annotations: key:string
  labels: key:string
spec:
  crd: <CRD_PLACEHOLDER>
  targets: <TARGETS_PLACEHOLDER>
`;

  const [crd, setCrd] = useState('');
  const [targets, setTargets] = useState('');

  const handleGenerateTemplate = () => {
    const templateWithUserInput = initialYamlTemplate
      .replace('<CRD_PLACEHOLDER>', crd)
      .replace('<TARGETS_PLACEHOLDER>', targets);

    const parsedYaml = yaml.load(templateWithUserInput);

    const yamlString = yaml.dump(parsedYaml);
    const blob = new Blob([yamlString], { type: 'text/yaml' });
    saveAs(blob, 'new-template.yaml');
  };

  const renderYamlWithInputs = (yamlString) => {
    return yamlString.split('\n').map((line, index) => {
      if (line.includes('<CRD_PLACEHOLDER>')) {
        return (
          <div key={index} className="flex">
            <span className="w-10 text-right mr-4 text-gray-500">{index + 1}</span>
            <span className="whitespace-pre">
              {line.split('<CRD_PLACEHOLDER>')[0]}
              <input
                type="text"
                value={crd}
                onChange={(e) => setCrd(e.target.value)}
                placeholder='saisir CRD'
                className="ml-2 px-2 py-1  bg-transparent focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {line.split('<CRD_PLACEHOLDER>')[1]}
            </span>
          </div>
        );
      } else if (line.includes('<TARGETS_PLACEHOLDER>')) {
        return (
          <div key={index} className="flex">
            <span className="w-10 text-right mr-4 text-gray-500">{index + 1}</span>
            <span className="whitespace-pre">
              {line.split('<TARGETS_PLACEHOLDER>')[0]}
              <input

                type="text"
                value={targets}
                onChange={(e) => setTargets(e.target.value)}
                placeholder='saisir Targets'

                className="ml-2 px-2 py-1  bg-transparent focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {line.split('<TARGETS_PLACEHOLDER>')[1]}
            </span>
          </div>
        );
      } else {
        return (
          <div key={index} className="flex">
            <span className="w-10 text-right mr-4 text-gray-500">{index + 1}</span>
            <span className="whitespace-pre">{line}</span>
          </div>
        );
      }
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create new Template</h1>
      <div className="bg-gray-100 border border-gray-300 p-4 rounded mb-4">
        {renderYamlWithInputs(initialYamlTemplate)}
      </div>
      <button
        onClick={handleGenerateTemplate}
        className="px-4 py-2 bg-blue-500 text-white rounded shadow"
      >
        Generate Template
      </button>
    </div>
  );
};

export default TemplateForm;
