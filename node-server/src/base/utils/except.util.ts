export function except<T> (fn : Function, data : { message : string, status : number }) : Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      if (fn.constructor.name === 'AsyncFunction')
        resolve(await fn());
      else
        resolve(fn());
    }
    catch (e) {
      reject({
        source: e,
        message: data.message || e.message,
        status: data.status || 400
      });
    }
  });
}