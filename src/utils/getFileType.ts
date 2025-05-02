import mime from 'mime';

export const getFileType = async (file) => {
  const fileData = await fetch(file);
  if (!fileData.ok) {
    console.error(`Failed to fetch the file: ${file}`);
    throw new Error("Failed to fetch the file");
  }

  const fileMimeType = fileData.headers.get('content-type');
  return fileMimeType ? mime.getExtension(fileMimeType) : null;
};
