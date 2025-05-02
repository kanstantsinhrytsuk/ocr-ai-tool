import defaultSchema from '@assets/schemas/prescription-schema.json';

export const DEFAULT_FIELD_VALUES = {
  prompt: ``,
  schemaFile: new File([JSON.stringify(defaultSchema)], "prescription-schema.json", { type: "application/json" }),
  targetFile: null,
};