/* istanbul ignore file */
export default function importIcon(path: string): string {
  try {
    return require(`../assets${path}`);
  } catch (e) {
    return require('../assets/icons/unknown.png');
  }
}
