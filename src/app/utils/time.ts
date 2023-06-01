export function convertToRFC3339(datetime: string) {
  const dateParts = datetime.split(" ");
  return `${dateParts[0]}T${dateParts[1]}Z`;
}

export function convertFromRFC3339(dt: string): string {
  if(dt) {
    return dt.replace("T", " ").replace("Z", "").replaceAll("-", "/");
  }
  return dt
}
