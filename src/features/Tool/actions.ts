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

    const message = await Ocr.getContentByFile({
      prompt,
      schema,
      file,
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