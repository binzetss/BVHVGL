export const validateAndResizeImage = (
  file,
  maxSizeMB = 20,
  scale = 0.7,
  quality = 0.7
) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject("Chỉ cho phép upload file ảnh");
      return;
    }

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      reject(`Ảnh "${file.name}" vượt quá ${maxSizeMB}MB`);
      return;
    }

    // ảnh nhỏ → không resize
    if (sizeMB <= 2) {
      resolve(file);
      return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => (img.src = e.target.result);
    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject("Resize ảnh thất bại");
            return;
          }

          resolve(
            new File([blob], file.name, {
              type: file.type,
            })
          );
        },
        file.type,
        quality
      );
    };
  });
};
