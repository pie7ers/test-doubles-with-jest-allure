export function omitAttributes<T extends object, K extends keyof T>
  (obj: T | null | undefined, attributes: K[]): Omit<T, K> | null {
  if (!obj) return null;
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !attributes.includes(key as K))
  ) as Omit<T, K>
}