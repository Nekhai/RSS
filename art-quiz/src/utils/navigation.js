export const cutArray = (arr, size) => {
  arr.map(item => item.status = false)

  let newArrImages = [];

  for (let i = 0; i < Math.ceil(arr.length/size); i++) {
    newArrImages[i] = arr.slice((i*size), (i*size) + size)
  }
  localStorage.setItem('imgMap', JSON.stringify(newArrImages));
}
