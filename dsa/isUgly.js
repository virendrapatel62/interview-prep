// https://leetcode.com/problems/ugly-number/

const checkAndDivide = (dividedBy = [], number) => {
  for (const factor of dividedBy) {
    if (number % factor !== 0) {
      return false;
    }

    number /= factor;
  }

  return number;
};

const isUgly2 = (number) => {
  while (number > 1) {
    number = checkAndDivide([2, 3, 5], number);

    if (!number) return false;
  }

  if (number == 1) return true;
  return false;
};

const isUgly = (number) => {
  if (!number) return false;
  while (number != 1) {
    if (number % 2 == 0) {
      number = number / 2;
      continue;
    }

    if (number % 3 == 0) {
      number = number / 3;
      continue;
    }

    if (number % 5 == 0) {
      number /= 5;
      continue;
    }

    if (number == 1) return true;

    return false;
  }

  return true;
};

console.log(isUgly2(23));
console.log(isUgly2(20));
console.log(isUgly2(10));
console.log(isUgly2(29));
