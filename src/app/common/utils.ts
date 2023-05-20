/**
 * Function used to compare to values. If result is negative a should be places before b, and vice versa for
 * positive result.
 * @param a First value to compare
 * @param b Second value to compare
 * @param isAsc Indicates wether the comparison should be ascending order or descending
 * @returns Number indicating ordering of a and b
 */
export function compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}