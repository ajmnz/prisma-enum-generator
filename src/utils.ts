export const firstLower = (s: string): string => {
  return s.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toLowerCase());
};
