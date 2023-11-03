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

export const sumNumbers = (list) =>
  list.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.size;
  }, 0);

export const logoList = {
  imageLogo:
    "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",

  videoLogo:
    "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z",

  documentLogo:
    "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",

  otherLogo:
    "M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z",
};

export function isFileImage(imageType: string) {
  return [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/tiff",
    "image/webp",
    "image/svg+xml",
    // "image/heic",
    // "image/heif",
    "image/x-icon",
    "image/vnd.microsoft.icon",
    "image/vnd.wap.wbmp",
    "image/avif",
    // Add any other image formats you want to support
  ].includes(imageType);
}

export const searchListByName = (list: any[], searchQuery: string) => {
  if (!searchQuery) {
    return list; // Return the original list if the search query is empty
  }

  // Convert the search query to lowercase for case-insensitive search
  const query = searchQuery.toLowerCase();

  // Use filter to find items in the list that match the search query
  const filteredList = list.filter((item) => {
    // You can change this condition to match the properties you want to search by
    return item.name.toLowerCase().includes(query);
  });

  return filteredList;
};
