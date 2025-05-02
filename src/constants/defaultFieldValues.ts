import defaultSchema from '@assets/schemas/prescription-schema.json';

export const DEFAULT_FIELD_VALUES = {
  prompt: `Your task is to extract and structure the following glasses prescription information into a specific JSON format.
The prescription is usually written in French, but can be from France or Belgium; if there is another language, fallback to it.
Respond only with a valid JSON object conforming to the provided format.

### Input Language:
French (primary)
English (secondary)
Any other (fallback)

### Notes:
- The full correction lines (OD, OS, OU) often contain Sphere/Cylinder/Axis/Add values. Parse both the full line and individual components.
- The booleans VL, VP, VA indicate if the prescription includes corrections for distance vision, near vision, or pediatric vision.
- If only OU (both eyes) is provided, extract the values and duplicate them into both the left and right eye fields.
- If a field is not available, just omit it.
- Handle ambiguities or unreadable text by making reasonable assumptions or noting the uncertainty.

Now parse the following prescription.
  `,
  schemaFile: new File([JSON.stringify(defaultSchema)], "prescription-schema.json", { type: "application/json" }),
  targetFile: null,
};