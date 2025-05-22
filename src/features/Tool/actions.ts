import { Status } from "@constants/actions";
import { getBase64String } from "@utils/getBase64";
import { OCRInput } from "document-understanding";
import { MistralPrescriptionUnderstanding, PrescriptionDocuments } from "document-understanding/prescription";

const PrescriptionUnderstandingService = MistralPrescriptionUnderstanding({
  apiKey: process.env.MISTRAL_API_KEY,
});

export const submit = async ({
  fileURL,
  targetFile
}: { targetFile?: File; fileURL: string }) => {
  const isFile = Boolean(targetFile?.name);
  const file = isFile ? await getBase64String(targetFile) : fileURL;

  try {
    if (!file) {
      throw new Error("Please provide all required data");
    }

    const result: PrescriptionDocuments = await PrescriptionUnderstandingService.understand({
      source: targetFile?.name ? 'base64' : 'url',
      file: file,
      documentType: 'image',
    } as OCRInput);

    console.log({ result });

    return {
      status: Status.Success,
      data: result,
    }
  } catch (error) {
    return {
      status: Status.Error,
      data: { message: error.message },
    }
  }
};