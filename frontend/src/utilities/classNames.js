export default function classNames(className) {
  if (className instanceof Array) {
    return className.join(' ');
  }
  return className;
}
