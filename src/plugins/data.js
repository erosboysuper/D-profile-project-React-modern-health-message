/**
 * Filter data with uuid and content as a primary key
 * @param {*} item target message
 * @param {*} data message list
 * @returns filtered item list as an array
 */
export const filter = (item, data) =>
  data.filter((i) => i.uuid === item.uuid && i.content === item.content);

/**
 * Determine message is included to message list
 * @param {*} item target message
 * @param {*} data message list
 * @returns true/false
 */
export const contains = (item, data) => {
  return !!(filter(item, data).length > 1);
};

/**
 * Deduplicate data with uuid and content as a primary key
 * @param {*} data Data that have to be deduplicate
 * @returns Deduplicated data as an array
 */
export const deduplicate = (data) => {
  const result = [];
  data.forEach((i) => {
    if (!contains(i, data)) result.push(i);
  });
  return result;
};

/**
 * Get paginationed and sorted data
 * @param {*} data message list
 * @param {*} page current page for pagination
 * @param {*} sort sort method:asc/desc
 * @param {*} countPerPage count per page
 * @returns Sorted and paginationed data as an array 
 */
export const filterData = (data, page = 1, sort = "asc", countPerPage = 5) => {
  const sortCallback = (a, b) => {
    const factor = sort === "asc" ? 1 : -1;
    return (new Date(a.sentAt) - new Date(b.sentAt)) * factor;
  };
  const tempData = data.sort(sortCallback);
  return tempData.slice((page - 1) * countPerPage, page * countPerPage);
};

/**
 * Remove item from data
 * @param {*} item target message
 * @param {*} data message list
 * @returns message list that removed item
 */
export const removeItem = (item, data) => {
  const filteredItems = filter(item, data);
  if (filteredItems.length < 1) return data;
  const index = data.indexOf(filteredItems[0]);
  return [...data.slice(0, index), ...data.slice(index + 1, data.length)];
};
