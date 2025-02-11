export const requiredError = (props, propName, componentName, location) => {
  const prop = props[propName];
  return new Error(`The ${location} \`${propName}\` is marked as required in (\`${componentName}\`), but its value is \`${prop}\`.`);
};

const ValidatorUtils = {
  requiredError
};

export default ValidatorUtils;