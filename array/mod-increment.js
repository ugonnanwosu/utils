// modules

// relative modules
import mod from '@usn/utils/number/mod'

// modules

export function modIncrement(array=[], index=-1, increment=1) {
  const newIndex = mod(index + increment, array.length);
  return array[newIndex];
}

export default modIncrement;