import { Button, FormGroup, LinearProgress, Stack } from "@mui/material";
import React, { useState } from "react";

import { submit } from "./actions";

import { TargetInput } from "./components/TargetInput";
import ResponseMessage from "./components/ResponseMessage";


export interface Fields {
  prompt: string;
  fileURL: string;
  schemaFile: File;
  targetFile: File;
}

function Tool() {
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState({
    status: '',
    data: ''
  })
  const [fields, setFields] = useState({
    fileURL: "",
    targetFile: null,
  });

  const handleChangeFileURL = (value: string) => {
    setFields({
      ...fields,
      fileURL: value
    })
  }

  const handleChangeFile = (value: File| null) => {
    setFields({
      ...fields,
      targetFile: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const result = await submit({ targetFile: fields.targetFile, fileURL: fields.fileURL });
    setResult(result);

    setIsPending(false);
  }

  return (
    <Stack paddingY={2}>
      <h1>OCR AI Tool (Document Understanding lib)</h1>
      <form style={{ marginBottom: 20 }} onSubmit={handleSubmit}>
        <FormGroup sx={{ display: "flex", gap: 2 }}>
          <TargetInput
            defaultValue={fields.targetFile}
            setFile={handleChangeFile}
            setFileURL={handleChangeFileURL}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={isPending}
          >Process</Button>
        </FormGroup>
      </form>
      { isPending && <LinearProgress /> }
      { !isPending && result.status && <ResponseMessage result={result} />}
    </Stack>
  );
}

export default Tool;
