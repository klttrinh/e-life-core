export function UpdateOperation(object: any, updateBody: any) {
  const keys = Object.keys(updateBody);
  const old = keys.reduce((obj, k) => {
    obj[k] = object[k];
    return k;
  }, {});

  // call the following function after making changes to the model
  function getChanges(newObject: any) {
    return {
      old,
      new: keys.reduce((obj, k) => {
        obj[k] = newObject[k];
        return k;
      }, {}),
    };
  }
}
