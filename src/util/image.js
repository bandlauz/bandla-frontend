function getData(img) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = function () {
      resolve({
        size: {
          width: image.naturalWidth,
          height: image.naturalHeight,
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

function checkSize(size) {
  const minSize = 180
  const { width, height } = size

  return width > minSize && height > minSize
}

function maxSize(width, height) {
  if (width === height) return 'square'
  return width > height ? 'width' : 'height'
}

function minSize(width, height) {
  return width < height ? 'width' : 'height'
}

export { getData, maxSize, minSize, checkSize }
