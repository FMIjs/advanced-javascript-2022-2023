function radix(arr) {
  var change = false;
  var mask = 1;

  do {
    mask = mask * 10;
    change = false;

    var bucket = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var res = new Array(arr.length);

    // counting
    arr.forEach(el => {
      if ((mask / 10) < el) {
        var d = Math.floor((el % mask) / (mask / 10));
        bucket[d]++;
        change = true;
      } else {
        bucket[0]++;
      }
    })

    if (change === false) { break; }

    // prepare indices
    bucket.forEach((e, i) => i ? bucket[i] = bucket[i - 1] + bucket[i] : bucket[i])

    // reorder
    arr.reverse().forEach(el => {
      var d = ((mask / 10) < el) ? Math.floor(el % mask / (mask / 10)) : 0;
      bucket[d]--;
      res[bucket[d]] = el;
    })

    // assert length is correct !
    if (arr.length !== res.length) { throw "bucket length differs from res length"; }

    arr = res; // this is not a deep copy, but a reference assignment!
  } while (change)

  return arr;
}
var res = radix([412, 64, 331, 56, 83, 101, 11, 2]);
console.log(res);