const returnSum = (arr) => {
  const parseArr = arr.map(x => {
    if (x === undefined) {
      x = 0;
    }
    return x;
  });
  const total = parseArr.reduce((a, b) => a + b);
  return total;
};

export default returnSum;