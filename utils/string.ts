export function capitalizeFirstLetter(str: string): string {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
}
