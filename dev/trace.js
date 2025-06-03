export function Trace() {
  return new Error().stack;
}

export default Trace