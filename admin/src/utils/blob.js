import { v4 as uuidv4 } from 'uuid';

import { AssetSource } from '@strapi/plugin-upload/admin/src/constants';

const base64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  return new Blob(byteArrays, { type: contentType })
}

const blobsToAssets = (blobs) => {
  return blobs.map(blob => {
    const filename = `ai_generated_image_${uuidv4()}.png`
    const loadedFile = new File([blob], filename, {
      type: blob.type,
    });

    return {
      ext: 'png',
      mime: blob.type,
      name: filename,
      rawFile: loadedFile,
      size: blob.size / 1000,
      source: AssetSource.Computer,
      type: 'image',
      url: URL.createObjectURL(blob),
      isLocal: true
    };
  })
}

const base64ImagesToBlobUrls = (images, contentType) => {
  return images.map((image) => {
    return URL.createObjectURL(base64toBlob(image, contentType))
  })
}

const base64ImagesToBlobs = (images, contentType) => {
  return images.map((image) => {
    return base64toBlob(image, contentType)
  })
}
export {
  base64toBlob,
  blobsToAssets,
  base64ImagesToBlobs,
  base64ImagesToBlobUrls
}
