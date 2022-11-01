// return new Array NOT INPLACE

const notInPlaceSort = (array = []) => {
  const merge = (array1 = [], array2 = []) => {
    const merged = [];

    let index1 = 0,
      index2 = 0,
      index = 0;

    while (index1 < array1.length && index2 < array2.length) {
      if (array1[index1] < array2[index2]) {
        merged[index] = array1[index1];
        index1++;
      } else {
        merged[index] = array2[index2];
        index2++;
      }

      index++;
    }

    while (index1 < array1.length) {
      merged[index] = array1[index1];
      index1++;
      index++;
    }

    while (index2 < array2.length) {
      merged[index] = array2[index2];
      index2++;
      index++;
    }

    return merged;
  };

  if (array.length == 1) {
    return array;
  }

  const midIndex = ~~(array.length / 2);

  const leftSorted = notInPlaceSort(array.slice(0, midIndex));
  const rightSorted = notInPlaceSort(array.slice(midIndex, array.length));

  return merge(leftSorted, rightSorted);
};

const inplaceSort = (array = []) => {
  return array;
};

console.log(notInPlaceSort([4, 5, 3, 2, 1, 6, 7, 8, 4, 6, 3]));
console.log(inplaceSort([2, 3, 4, 5, 7, 4, 3, 2, 1, 5, 7, 8, 0]));
