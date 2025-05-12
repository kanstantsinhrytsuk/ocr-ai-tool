import { Status } from "@constants/actions";
import Ocr from "@services/ocr";
import { getBase64 } from "@utils/getBase64";
import { getTextFromFile } from "@utils/getTextFromFile";

export const submit = async ({
  prompt,
  schemaFile,
  fileURL,
  targetFile
}) => {
  const schema = schemaFile?.name ? await getTextFromFile(schemaFile) : null;
  const file = targetFile?.name ? await getBase64(targetFile) : fileURL;

  try {
    if (!prompt || !file) {
      throw new Error("Please provide all required data");
    }

    const fileContent = await Ocr.extractFileContent(file);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const message = await Ocr.run({
      prompt,
      schema,
      fileContent,
    });

    if (!message) {
      throw new Error("No data found");
    }

    return {
      status: Status.Success,
      message,
    }
  } catch (error) {
    return {
      status: Status.Error,
      message: error.message,
    }
  }
};