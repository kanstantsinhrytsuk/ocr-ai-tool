import { Mistral } from "@mistralai/mistralai";
import type { ContentChunk } from "@mistralai/mistralai/models/components";
import get from "lodash/get";

import { getFileType } from "@utils/getFileType";

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

type DocumentURL = {
  type: "document_url";
  documentUrl: string;
};

type ImageURL = {
  type: "image_url";
  imageUrl: string;
};

type Content = DocumentURL | ImageURL;

const getFileEntity = async (file: string): Promise<Content> => {
  const fileType = await getFileType(file);

  switch (fileType) {
    case 'pdf':
      return {
        type: "document_url",
        documentUrl: file,
      };
    case 'png':
    case 'jpg':
    case 'jpeg':
      return {
        type: "image_url",
        imageUrl: file,
      };
    default:
      throw new Error(`Unsupported file type - ${fileType}`);
  }
}

const extractText = async (file: string) => {
  const fileEntity = await getFileEntity(file);

  const ocrResponse = await client.ocr.process({
    model: "mistral-ocr-latest",
    document: fileEntity,
    includeImageBase64: true,
  });

  return ocrResponse.pages[0]?.markdown || null;
}

const getContentByFile = async ({
  prompt,
  schema = null,
  file,
}) => {
  const content: ContentChunk[] = [
    {
      type: "text",
      text: prompt,
    },
  ];

  const extractedText = await extractText(file);
  if (extractedText) {
    console.info(extractedText);
    content.push({
      type: "text",
      text: `### File content: ${extractedText}`,
    });
  }

  if (schema) {
    content.push({
      type: "text",
      text: `### Output Format (JSON Schema): ${schema}`,
    });
  }

  try {
    const chatResponse = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [
        {
          role: "user",
          content,
        },
      ],
    });

    return get(chatResponse, 'choices[0].message.content');
  } catch (error) {
    throw new Error(`Error processing image: ${error.message}`);
  }
}

export default {
  getContentByFile,
};