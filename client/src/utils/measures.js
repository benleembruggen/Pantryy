
export const SUPPORTED_MEASURES = {
  WHOLE: 'Whole',
  GRAM: 'Gram'
}

export const quantityToString = (quantity, preferredMeasure) => {
  switch (preferredMeasure) {
    case SUPPORTED_MEASURES.WHOLE: return `x${quantity}`;
    case SUPPORTED_MEASURES.GRAM: return `${quantity} g`;
    default: return quantity;
  }
}