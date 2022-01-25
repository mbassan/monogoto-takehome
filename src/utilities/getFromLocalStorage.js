export default function getFromLocalStorage(key, isJSON) {
  let data = localStorage.getItem(key);
  if (isJSON) {
    try {
      data = JSON.parse(data);
    }
    catch (error) {
      console.error('Eror trying to rehydrate key ' + key + ' from localStorage:', error);
    }
  }
  return data;
}
