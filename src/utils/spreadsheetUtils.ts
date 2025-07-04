// Convert column index to letter (0 -> A, 1 -> B, ..., 25 -> Z, 26 -> AA, etc.)
export const getColumnLetter = (index: number): string => {
  let result = '';
  while (index >= 0) {
    result = String.fromCharCode(65 + (index % 26)) + result;
    index = Math.floor(index / 26) - 1;
  }
  return result;
};

// Convert column letter to index (A -> 0, B -> 1, ..., Z -> 25, AA -> 26, etc.)
export const getColumnIndex = (letter: string): number => {
  let result = 0;
  for (let i = 0; i < letter.length; i++) {
    result = result * 26 + (letter.charCodeAt(i) - 64);
  }
  return result - 1;
};

// Get cell reference (e.g., "A1", "B2")
export const getCellReference = (row: number, col: number): string => {
  return `${getColumnLetter(col)}${row + 1}`;
};

// Parse cell reference to get row and column
export const parseCellReference = (ref: string): { row: number; col: number } => {
  const match = ref.match(/^([A-Z]+)(\d+)$/);
  if (!match) throw new Error(`Invalid cell reference: ${ref}`);
  
  const [, colLetter, rowStr] = match;
  return {
    row: parseInt(rowStr) - 1,
    col: getColumnIndex(colLetter)
  };
};

// Generate column headers for spreadsheet (A, B, C, ..., Z, AA, AB, ...)
export const generateColumnHeaders = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) => getColumnLetter(i));
};