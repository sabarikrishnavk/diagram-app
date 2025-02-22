import Handlebars from 'handlebars';

export const generateCode = (data: any, template: string): string => {
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate(data);
};

export const terraformTemplate = `
resource "{{server.type}}" "{{server.name}}" {
  // Server configuration
}

resource "{{database.type}}" "{{database.name}}" {
  // Database configuration
}
`;
