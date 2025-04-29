import PropTypes from 'prop-types'

// modules
import ColourValidator from '@usn/utils/validators/colour-validator'

// relative modules
import ChildrenPropTypes from './children-prop-types'
import NumberStringPropTypes from './number-string-prop-types'

/** @namespace */
const CustomPropTypes = {};

// general
CustomPropTypes.children = ChildrenPropTypes

// numbers & maths
CustomPropTypes.numberString = NumberStringPropTypes

CustomPropTypes.vector2 = PropTypes.shape({
  x: PropTypes.number,
  y: PropTypes.number,
}),

CustomPropTypes.vector2 = PropTypes.shape({
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number,
}),

// colours
CustomPropTypes.color = ColourValidator.factoryColour(false);
CustomPropTypes.color.isRequired = ColourValidator.factoryColour(true);
CustomPropTypes.colour = ColourValidator.factoryColour(false);
CustomPropTypes.colour.isRequired = ColourValidator.factoryColour(true);
CustomPropTypes.hex = ColourValidator.factoryHex(false);
CustomPropTypes.hex.isRequired = ColourValidator.factoryHex(true);
CustomPropTypes.hsl = ColourValidator.factoryHSL(false);
CustomPropTypes.hsl.isRequired = ColourValidator.factoryHSL(true);
CustomPropTypes.hsla = ColourValidator.factoryHSLA(false);
CustomPropTypes.hsla.isRequired = ColourValidator.factoryHSLA(true);
CustomPropTypes.rgb = ColourValidator.factoryRGB(false);
CustomPropTypes.rgb.isRequired = ColourValidator.factoryRGB(true);
CustomPropTypes.rgba = ColourValidator.factoryRGBA(false);
CustomPropTypes.rgba.isRequired = ColourValidator.factoryRGBA(true);

export default CustomPropTypes;