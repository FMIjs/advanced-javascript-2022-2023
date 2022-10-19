var quickSort = function (arr) {
  var partition = function (lIdx, rIdx) {
    var pivot = arr[lIdx];

    var tmpL = lIdx;
    var tmpR = rIdx;

    while (true) {
      // Move L
      while (arr[tmpL] < pivot) { tmpL += 1; }
      // Move R
      while (arr[tmpR] > pivot) { tmpR -= 1; }


      // Return if all is well
      if (tmpL >= tmpR) { return tmpR; }

      // swap if not
      [arr[tmpL], arr[tmpR]] = [arr[tmpR], arr[tmpL]];
    }
  }

  var sort = function (lIdx, rIdx) {
    if (lIdx >= rIdx) { return; }
    var pivotIdx = partition(lIdx, rIdx);
    sort(lIdx, pivotIdx); // sort left
    sort(pivotIdx + 1, rIdx); // sort right
  }

  sort(0, arr.length - 1);
  return arr;
}

var res = quickSort([4, 6, 1, 5, 2, 3, 8, 7, 9])
console.log(res);