
export const validator = (passwordLine: string) => {
  const [rule, password] = passwordLine.split(':');
  const [constraint, character] = rule.split(' ');
  const [minimum, maximum] = constraint
    .split('-')
    .map(stringNum => parseInt(stringNum));
  const characters = password.split('');
  const characterCount = characters.filter(item => item === character).length;
  return minimum <= characterCount && characterCount <= maximum;
};
