/**
 * Function used to compare to values. If result is negative a should be placed before b, and vice versa for
 * positive result. Handles null or undefined values - treats them as less than any other value.
 * @param a First value to compare
 * @param b Second value to compare
 * @param isAsc Indicates whether the comparison should be ascending order or descending
 * @returns Number indicating ordering of a and b
 */
export function compare(a: string | number | null | undefined, b: string | number | null | undefined, isAsc: boolean): number {
    if (a === null || a === undefined) {
      return isAsc ? -1 : 1;
    }
    if (b === null || b === undefined) {
      return isAsc ? 1 : -1;
    }
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function htmlToMarkdown(html: string): string {
  // Convert line breaks to Markdown line breaks
  let markdown = html.replace(/<br>/g, '  \n');

  // Convert <hN> tags to Markdown
  markdown = markdown.replace(/<h2>(.*?)<\/h2>/g, '## $1\n');
  markdown = markdown.replace(/<h3>(.*?)<\/h3>/g, '### $1\n');

  // Convert <p> tags to Markdown
  markdown = markdown.replace(/<p>(.*?)<\/p>/g, '$1\n');

  // Convert <em> and <i> tags to Markdown
  markdown = markdown.replace(/<em>(.*?)<\/em>/g, '*$1*');
  markdown = markdown.replace(/<i>(.*?)<\/i>/g, '*$1*');

  return markdown;
}

/**
 * Converts a number of bytes to a string of KiB or MiB. If there are more bytes than 1024 * 1024 it is converted into
 * MiB, else it is converted to KiB.
 * @param bytes number of bytes
 * @param precession amount of decimals
 */
export function byteConverter(bytes: number, precession: number): string {
  if (bytes > 1024 * 1024) {
    return (bytes / 1024 / 1024).toFixed(precession) + 'MiB'
  }
  return (bytes / 1024).toFixed(precession) + 'KiB'
}
