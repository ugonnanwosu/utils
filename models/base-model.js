// libs
import EventEmitter from 'wolfy87-eventemitter'
import _ from 'lodash';

// relative modules

// modules

export const EVENTS = {
  CHANGE: 'change',
  SET: 'set',
}

/**
 * @param {Object} [store={}]
 * @param {Object} [options={}]
 */
export function BaseModel(store={}, options={}) {
  options = _.defaults({...options}, {

  });

  const {

  } = options;

  const previousStore = { ...store };

  this.isInitial = true;

  _.extend(this, new EventEmitter());

  const storeProxy = new Proxy(store, {

    /**
     *
     * @param obj
     * @param [prop]
     * @param [value]
     * @returns {boolean}
     */
    set: function (obj, prop, value) {

      const previous = _.clone(previousStore[prop]);

      if (_.isEqual(previous, value)) {
        // FIXME
        // return true;
      }

      previousStore[prop] = obj[prop];
      obj[prop] = value;

      return true;
    },

    get: function (target, prop, receiver) {
      const obj = Reflect.get(...arguments);

      // return _.get(this._proxy, attribute);

      return obj;
    }
  });

  function toJSON() {
    return { ...storeProxy };
  }

  /**
   *
   * @param {Object|*} attributes
   * @param {*} [values] - is options if `attributes` is an object
   * @param {Object} [options={}]
   */
  function set(attributes, values={}, options={}) {

    this.isInitial = false;

    if (_.isString(attributes)) {
      attributes = {[attributes]: values};
    } else if (_.isArray(attributes)) {
      attributes = _.zipObject(attributes, _.castArray(values));
    } else if (_.isObject(attributes)) {
      // options = values;
    }

    options = _.defaults({...options}, {
      silent: false,
      trace: new Error().stack,
    });

    const {
      silent,
      trace,
    } = options;

    _.each(attributes, (value, prop) => {
      _.set(storeProxy, prop, value);

      if (!silent) {
        this.emit(`${EVENTS.CHANGE}:${prop}`, {
          changedAttribute: prop,
          value,
          changes: attributes,
          trace,
        });
      }

    });

    if (!silent) {
      this.emit(EVENTS.CHANGE, {
        changes: attributes,
        values,
        trace,
      });

      this.emit(EVENTS.SET, {
        changes: attributes,
        values,
        trace,
      });
    }
  }

  /**
   *
   * @param {string} attribute
   * @returns {*}
   */
  function get(attribute) {
    return _.get(storeProxy, attribute);
  }

  _.extend(this, {
    toJSON,
    set,
    get,
  });
}


export default BaseModel