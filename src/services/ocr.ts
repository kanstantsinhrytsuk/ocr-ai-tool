import { DEFAULT_STRATEGY } from "@constants/strategies";
import { getStrategy } from "./strategies";

import gpt from "./strategies/gpt";

const strategy = getStrategy(process.env.CURRENT_STRATEGY || DEFAULT_STRATEGY);

const Ocr = {
  extractFileContent: gpt.extractFileContent,
  run: strategy.run,
}

Object.freeze(Ocr);

export default Ocr;
