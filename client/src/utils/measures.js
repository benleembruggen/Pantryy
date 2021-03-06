
export const quantityToString = (quantity, preferredMeasure) => {
  switch (preferredMeasure) {
    case 'Whole': return `x${quantity}`;
    case 'Gram': return `${quantity} g`;
    default: return quantity;
  }
}