import PropTypes from 'prop-types'

const NumberStringPropTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export default NumberStringPropTypes;
