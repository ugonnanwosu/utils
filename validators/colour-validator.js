// libs

// lodash libs
import some from 'lodash/some'
import isNil from 'lodash/isNil'

// modules
import {requiredError} from '@usn/utils/validators/validator-utils'

export function isHex(prop) {
  return (
    /^#(?:[A-Fa-f0-9]{3}){1,2}$/i.test(prop)
  );
}

export function isRGB(prop) {
  return (
    /^rgb[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*(?:,(?![)])|(?=[)]))){3}[)]$/i.test(prop)
  );
}

export function isRGBA(prop) {
  return (
    /^^rgba[(](?:\s*0*(?:\d\d?(?:\.\d+)?(?:\s*%)?|\.\d+\s*%|100(?:\.0*)?\s*%|(?:1\d\d|2[0-4]\d|25[0-5])(?:\.\d+)?)\s*,){3}\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/i.test(prop)
  );
}

export function isHSL(prop) {
  return (
    /^hsl[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*[)]$/i.test(prop)
  );
}

export function isHSLA(prop) {
  return (
    /^hsla[(]\s*0*(?:[12]?\d{1,2}|3(?:[0-5]\d|60))\s*(?:\s*,\s*0*(?:\d\d?(?:\.\d+)?\s*%|\.\d+\s*%|100(?:\.0*)?\s*%)){2}\s*,\s*0*(?:\.\d+|1(?:\.0*)?)\s*[)]$/i.test(prop)
  );
}

export function isColour(prop) {
  return some([
    isHex(prop),
    isHSL(prop),
    isHSLA(prop),
    isRGB(prop),
    isRGBA(prop),
  ])
}

export function factoryColour(isRequired) {
  return function (props, propName, componentName, location) {
    const prop = props[propName];
    if (isNil(prop)) {
      if (isRequired) {
        return requiredError(props, propName, componentName, location);
      } else {
        return null;
      }
    } else {

      if (!isColour(prop)) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${prop}\` is not a valid colour`
        );
      }
    }
  };
}

export function factoryHex(isRequired) {
  return function (props, propName, componentName, location) {
    const prop = props[propName];
    if (isNil(prop)) {
      if (isRequired) {
        return requiredError(props, propName, componentName, location);
      } else {
        return null;
      }
    } else {

      if (!isHex(prop)) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${prop}\` is not a valid hex colour`
        );
      }
    }
  };
}

export function factoryHSL(isRequired) {
  return function (props, propName, componentName, location) {
    const prop = props[propName];
    if (isNil(prop)) {
      if (isRequired) {
        return requiredError(props, propName, componentName, location);
      } else {
        return null;
      }
    } else {

      if (!isHSL(prop)) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${prop}\` is not a valid hsl colour`
        );
      }
    }
  };
}

export function factoryHSLA(isRequired) {
  return function (props, propName, componentName, location) {
    const prop = props[propName];
    if (isNil(prop)) {
      if (isRequired) {
        return requiredError(props, propName, componentName, location);
      } else {
        return null;
      }
    } else {

      if (!isHSLA(prop)) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${prop}\` is not a valid hsla colour`
        );
      }
    }
  };
}

export function factoryRGB(isRequired) {
  return function (props, propName, componentName, location) {
    const prop = props[propName];
    if (isNil(prop)) {
      if (isRequired) {
        return requiredError(props, propName, componentName, location);
      } else {
        return null;
      }
    } else {

      if (!isRGB(prop)) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${prop}\` is not a valid rgb colour`
        );
      }
    }
  };
}

export function factoryRGBA(isRequired) {
  return function (props, propName, componentName, location) {
    const prop = props[propName];
    if (isNil(prop)) {
      if (isRequired) {
        return requiredError(props, propName, componentName, location);
      } else {
        return null;
      }
    } else {

      if (!isRGBA(prop)) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${prop}\` is not a valid rgba colour`
        );
      }
    }
  };
}

const ColourValidator = {
  factoryColour,
  factoryHex,
  factoryHSL,
  factoryHSLA,
  factoryRGB,
  factoryRGBA,
  isColour,
  isHex,
  isHSL,
  isHSLA,
  isRGB,
  isRGBA,
};

export default ColourValidator;


