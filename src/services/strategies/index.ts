import MistralStrategy from './mistral';

const STRATEGIES = {
  mistral: MistralStrategy,
};

export const getStrategy = (strategy) => {
  if (!STRATEGIES[strategy]) {
    throw new Error(`Strategy ${strategy} not found`);
  }

  return STRATEGIES[strategy];
};