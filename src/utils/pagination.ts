import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/pagination";

/**
 * Generates the metadata object for pagination.
 *
 * @param {number} total - The total number of items.
 * @param {number} [size] - The number of items per page (optional).
 * @param {number} [page] - The current page number (optional).
 * @returns {Object} - The metadata object with page, size, and total properties.
 */
export const buildMeta = (total: number, size?: number, page?: number) => {
  return {
    page: page || DEFAULT_PAGE,
    size: size || DEFAULT_PAGE_SIZE,
    total: Number(total)
  };
};

/**
 * Generates pagination options based on the given option object.
 *
 * @param {Object} option - The option object for pagination.
 * @param {number} option.page - The current page number. Defaults to 1.
 * @param {number} option.size - The number of items per page. Defaults to 10.
 * @return {Object} - The pagination options.
 * @return {number} - The limit of items per page.
 * @return {number} - The offset for pagination.
 */
export const getPaginationOptions = (option: {
  page?: number;
  size?: number;
}) => {
  const { page = DEFAULT_PAGE, size = DEFAULT_PAGE_SIZE } = option;

  const offset = (page - 1) * size;

  return {
    limit: size,
    offset
  };
};
