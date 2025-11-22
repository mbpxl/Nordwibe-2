export const validateImageFile = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      resolve(false);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(true);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(false);
    };

    img.src = objectUrl;

    setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
      resolve(false);
    }, 2000);
  });
};