import { random } from './random';

export function strongPassword(length = 8) {
  const lowercaseCharset = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberCharset = '0123456789';
  let password = '';

  const lowercaseIndex = random(0, lowercaseCharset.length - 1);
  const uppercaseIndex = random(0, uppercaseCharset.length - 1);
  const numberIndex = random(0, numberCharset.length - 1);

  password += lowercaseCharset[lowercaseIndex];
  password += uppercaseCharset[uppercaseIndex];
  password += numberCharset[numberIndex];

  const remainingLength = length - 3;
  const combinedCharset = lowercaseCharset + uppercaseCharset + numberCharset;

  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = random(0, combinedCharset.length - 1);
    password += combinedCharset[randomIndex];
  }

  return password;
}
