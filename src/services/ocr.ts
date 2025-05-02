import { DEFAULT_STRATEGY } from "@constants/strategies";
import { getStrategy } from "./strategies";

const strategy = getStrategy(process.env.CURRENT_STRATEGY || DEFAULT_STRATEGY);

const Ocr = {
  getContentByFile: strategy.getContentByFile,
}

Object.freeze(Ocr);

export default Ocr;
