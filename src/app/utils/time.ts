import { TIME } from "../config/constants";

/**
 * Converts a datetime string on the format 'YYYY-MM-DD HH:MM:ss' to the RFC3339 format.
 * @param datetime on format 'YYYY-MM-DD HH:MM:ss'
 */
export function convertToRFC3339(datetime: string) {
  const dateParts = datetime.split(" ");
  return `${dateParts[0]}T${dateParts[1]}Z`;
}

/**
 * Converts a string on the format RFC3339 to an easy readable datetime format for us humans.
 * @param dt datetime on RFC3339 format
 */
export function convertFromRFC3339(dt: string): string {
  if(dt) {
    // Remove milliseconds (including dot and fractional seconds)
    const withoutMilliseconds = dt.replace(/\.\d+/g, '');

    // Replace 'T' with space and remove 'Z'
    return withoutMilliseconds.replace("T", " ").replace("Z", "").replaceAll("-", "/");
  }
  return dt
}

/**
 * Function is used to check if the datetime is unset. If unset it returns true, else false.
 * @param dt Datetime on the RFC3339 format
 */
export function isDatetimeUnset(dt: string): boolean {
  return dt === TIME.TIME_UNSET;
}

export function getTime(rfc3339: string | null) {
  if(rfc3339) {
    return rfc3339.slice(11,19);
  }
  return null;
}
