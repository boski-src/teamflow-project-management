//?sort=field,1

export function sortQsToObject (queryString : string) : object & { field : string, order : number } {
  let qs = queryString.split(',');
  return { field: qs[0], order: Number(qs[1]) };
}