export function pushOrSplice (array : any[], item : any) : any[] {
  let index = array.findIndex(arrayItem => arrayItem == item);
  if (index < 0) array.push(item);
  else array.splice(index, 1);

  return array;
}

export function pushOrSpliceArray (array : any[], targetArray : any []) : any[] {
  targetArray.forEach(item => pushOrSplice(array, item));
  return array;
}