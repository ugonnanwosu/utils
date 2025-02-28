
// libs
import EventEmitter from 'wolfy87-eventemitter'

// libs [lodash]

// relative modules

// modules

const emitter = new EventEmitter();

export {
  emitter,
}

/**
 *
 */
export const EVENTS = {
  EXAMPLE: 'exaple',
}

export const eventDetails = {
  [EVENTS.EXAMPLE]: {
    description: '',
    propTypes: {

    },
    defaultProps: {

    },
  }
}

const BaseRadio = {
  emitter,
  EVENTS,
  eventDetails,
}

export default BaseRadio