// libs
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

// modules
import CustomPropTypes from '@usn/utils/validators/custom-prop-types'

function TestLayout(props={}) {

  const {

  } = props;

  return (
    <div>
      I am a React Node. Tell me something
    </div>
  )
}

/** @namespace Base.propTypes */
export const propTypes = {
  /** - generic */
  className: PropTypes.string,
  children: CustomPropTypes.children,
  style: PropTypes.object,

  // theming / colour schemes
  useTheming: PropTypes.bool,
  themeMode: PropTypes.oneOf(_.map(THEME_MODES)),

  /** - specific */

  /** - events */

  /** - development */
  debug: PropTypes.bool,
}

export const defaultProps = {
  style: {},
  themeMode: null, //

}

_.extend(Base, {
  propTypes,
  // CLASS_NAME_NS,
  // CLASS_NAME_TYPE,
})

export default TestLayout;