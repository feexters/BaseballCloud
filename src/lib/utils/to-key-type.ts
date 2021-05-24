export const toKeyType = (value: string) => {
  const lower = value.toLowerCase();
  return lower.split(' ').join('_')
}