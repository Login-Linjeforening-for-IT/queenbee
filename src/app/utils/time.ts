import { BeehiveAPI } from "../config/constants";

export function convertToRFC3339(datetime: string) {
  const dateParts = datetime.split(" ");
  return `${dateParts[0]}T${dateParts[1]}Z`;
}

export function convertFromRFC3339(dt: string): string {
  if(dt) {
    // Remove milliseconds (including dot and fractional seconds)
    const withoutMilliseconds = dt.replace(/\.\d+/g, '');

    // Replace 'T' with space and remove 'Z'
    return withoutMilliseconds.replace("T", " ").replace("Z", "").replaceAll("-", "/");
  }
  return dt
}

export function isDatetimeUnset(dt: string): boolean {
  if(dt === BeehiveAPI.TIME_UNSET) {
    return true;
  }
  return false;
}