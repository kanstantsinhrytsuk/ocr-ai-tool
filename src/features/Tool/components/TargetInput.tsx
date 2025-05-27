import React, { useState, useEffect, useRef } from 'react';
import { Button, IconButton, Box, Paper } from "@mui/material";
import { Stack, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { useFileActions } from '@hooks/useFileActions';

type Props = {
  defaultValue: File;
  setFile: (file: File | null) => void;
  setFileURL: (fileURL: string) => void;
};

export const TargetInput = ({ defaultValue, setFile, setFileURL }: Props) => {
  const initFiles: File[] = defaultValue ? [defaultValue] : [];
  const { files, fileInputRef, handleRemove } = useFileActions({ defaultValue: initFiles, setFile });
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate preview URL when files change
    if (files.length > 0) {
      const file = files[0];
      // Only create preview URL for image files
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewURL(url);
        return () => URL.revokeObjectURL(url);
      }
    } else {
      setPreviewURL(null);
    }
  }, [files]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageContainerRef.current) {
      const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setMousePosition({ x, y });
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          disabled={files.length}
          type="url"
          name="fileURL"
          label="URL"
          onChange={(e) => setFileURL(e.target.value)}
        />
        <Button
          component="label"
          variant="contained"
          tabIndex={-1}
          sx={{ width: 200, height: 55 }}
        >
          Choose file
          <input
            style={{ display: "none" }}
            type="file"
            name="targetFile"
            accept="image/*,application/pdf"
            ref={fileInputRef}
          />
        </Button>
      </Stack>
      {files?.map((file: File) => (
        <Stack key={file.name} direction="row" alignItems="center" gap={1}>
          <strong>{file.name}</strong>
          <IconButton aria-label="delete" onClick={handleRemove(file)} color="primary">
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}

      {/* Image preview section */}
      {previewURL && (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Paper elevation={3} sx={{ p: 2, height: 'auto', width: '100%', overflow: 'hidden', mx: 'auto' }}>
            <Box 
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: 'zoom-in',
                '&:hover img': {
                  transform: 'scale(2.5)',
                }
              }}
            >
              <img 
                src={previewURL} 
                alt="File preview" 
                style={{ 
                  maxWidth: '100%',
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease',
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                }} 
              />
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
}