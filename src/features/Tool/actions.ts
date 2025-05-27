import { Status } from "@constants/actions";
import { getBase64String } from "@utils/getBase64";
import { MistralPrescriptionUnderstanding, PrescriptionDocuments } from "document-understanding/prescription";

const prescriptionUnderstanding = MistralPrescriptionUnderstanding({
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

    if (prescriptionUnderstanding.isInitialized === false) {
      throw prescriptionUnderstanding.error || new Error("Prescription Understanding service is not initialized");
    }

    const result: PrescriptionDocuments = await prescriptionUnderstanding.service.understand({
      source: targetFile?.name ? 'base64' : 'url',
      file: file,
      documentType: 'image',
    });

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