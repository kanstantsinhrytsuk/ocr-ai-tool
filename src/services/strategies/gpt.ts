import OpenAI from "openai";

import { getFileType } from "@utils/getFileType";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

type DocumentURL = {
  type: "input_file";
  file_data: string;
};

type ImageURL = {
  type: "input_image";
  image_url: string;
  detail: "high" | "low" | "auto";
};

type Content = DocumentURL | ImageURL;

const getFileEntity = async (file: string): Promise<Content> => {
  const fileType = await getFileType(file);

  switch (fileType) {
    case 'pdf':
      return {
        type: "input_file",
        file_data: file,
      };
    case 'png':
    case 'jpg':
    case 'jpeg':
      return {
        type: "input_image",
        image_url: file,
        detail: "high",
      };
    default:
      throw new Error(`Unsupported file type - ${fileType}`);
  }
}

const extractFileContent = async (file: string) => {
  const fileEntity = await getFileEntity(file);

  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Extract text from the image"
          },
          fileEntity,
        ],
      },
    ],
  });

  return response?.output_text || null;
}

export default {
  extractFileContent,
}
