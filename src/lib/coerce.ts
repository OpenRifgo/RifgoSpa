export function valOrDefault<T>(val: T | undefined, def: T) {
  if (val === undefined) return def;
  return val;
}
