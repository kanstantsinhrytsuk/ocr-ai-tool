import { useEffect, useRef, useState } from 'react';

interface UseFileActionsProps {
  defaultValue?: File[];
  setFile: (file: File | null) => void;
}

export const useFileActions = ({ defaultValue = [], setFile }: UseFileActionsProps) => {
  const [files, setFiles] = useState(defaultValue);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (files.length) {
      setFile(files[0]);
    } else {
      setFile(null);
    }
  }, [files]);

  useEffect(() => {
    if (files.length) {
      const fileList = new DataTransfer();
      files.map((file: File) => fileList.items.add(file))
      fileInputRef.current.files = fileList.files;
    } else {
      fileInputRef.current.value = '';
    }
  }, [files]);

  useEffect(() => {
    const inputFile = fileInputRef.current;
    inputFile.addEventListener('change', handleChange);
    inputFile.addEventListener('cancel', handleCancel);
    return () => {
      inputFile.removeEventListener('change', handleChange);
      inputFile.removeEventListener('cancel', handleCancel);
    }
  }, []);

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFiles(Array.from(files));
    } else {
      setFiles([]);
    }
  }

  const handleCancel = () => {
    setFiles([]);
  }

  const handleRemove = (file: File) => () => {
    const newFiles = files.filter(f => f.name !== file.name);
    setFiles(newFiles);
  }

  return { files, handleChange, handleRemove, fileInputRef };
}