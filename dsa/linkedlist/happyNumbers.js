// https://en.wikipedia.org/wiki/Happy_number
console.log("Happy Numbers");

function getSquarSum(number) {
  let sum = 0;
  while (number) {
    const last = Math.floor(number % 10);
    sum = sum + last * last;
    number = number / 10;
  }
  return sum;
}

const isHappyNumber = (number) => {
  let slow = getSquarSum(number);
  let fast = getSquarSum(slow);

  while (slow !== 1 || fast !== 1) {
    slow = getSquarSum(slow);
    fast = getSquarSum(getSquarSum(fast));

    if (slow == 1 || fast == 1) break;

    if (slow == fast) return false;
  }

  return true;
};

console.log(isHappyNumber(13));
console.log(isHappyNumber(19));
