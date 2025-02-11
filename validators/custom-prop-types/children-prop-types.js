import PropTypes from 'prop-types'

const ChildrenPropTypes = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
  PropTypes.func,
  PropTypes.string,
]);

export default ChildrenPropTypes