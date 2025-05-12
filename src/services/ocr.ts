import { DEFAULT_STRATEGY } from "@constants/strategies";
import { getStrategy } from "./strategies";

// import gpt from "./strategies/gpt";
import mistral from "./strategies/mistral";

const strategy = getStrategy(process.env.CURRENT_STRATEGY || DEFAULT_STRATEGY);

const Ocr = {
  extractFileContent: mistral.extractFileContent,
  run: strategy.run,
}

Object.freeze(Ocr);

export default Ocr;
