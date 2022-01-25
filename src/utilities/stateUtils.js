export function deleteDocs({
  ids,
  stateVar,
  setFunc,
  cb,
  field = '_id',
}) {
  let docs = [...stateVar.docs];
  const initialLength = docs.length;
  docs = docs.filter((item) => ids.indexOf(item[field]) < 0);
  setFunc({ ...stateVar, docs });

  if (initialLength - docs.length > 0) {
    cb(initialLength - docs.length);
  }
}

export function addOrUpdateDocs({
  newDocs,
  stateVar,
  setFunc,
  field = '_id',
  cb,
  perPage,
  update,
}) {
  let docs = [...stateVar.docs];
  newDocs.forEach((newDoc) => {
    if (update) {
      docs = docs.map((item) => (item[field] === newDoc[field] ? newDoc : item));
    } else {
      docs.unshift(newDoc);
      if (docs.length > perPage) {
        docs.pop();
      }
    }
  });

  setFunc({ ...stateVar, docs });

  if (typeof cb === 'function') {
    cb();
  }
}
