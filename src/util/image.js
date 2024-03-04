function getData(img) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = function () {
      resolve({
        size: {
          max: maxSize(image.naturalWidth, image.naturalHeight),
        },
      })
    }

    image.onerror = function (error) {
      reject(error)
    }

    image.src = URL.createObjectURL(img)
  })
}

function maxSize(width, height) {
  return width > height ? 'width' : 'height'
}

export { getData }
