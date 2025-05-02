import React from 'react';
import { Button, IconButton } from "@mui/material";
import { Stack, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { useFileActions } from '@hooks/useFileActions';

type Props = {
  defaultValue: File;
  setFile: (file: File | null) => void;
};

export const TargetInput = ({ defaultValue, setFile }: Props) => {
  const initFiles: File[] = defaultValue ? [defaultValue] : [];
  const { files, fileInputRef, handleRemove } = useFileActions({ defaultValue: initFiles, setFile });

  return (
    <>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          disabled={files.length}
          type="url"
          name="fileURL"
          label="URL"
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
    </>
  );
}