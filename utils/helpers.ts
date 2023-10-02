const units = ["bytes", "Kb", "Mb", "Gb", "Tb"];

const formatSize = (size) => {
  let l = 0,
    n = parseInt(size, 10) || 0;

  while (n >= 1024 && ++l) {
    n = n / 1024;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
};

export { formatSize };
