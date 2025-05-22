export const getBase64String = (file: File): Promise<string> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1]; // NOTE: remove prefix, it's inside the lib now
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};
