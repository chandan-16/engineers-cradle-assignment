import type { SpreadsheetData, SpreadsheetCell } from '../types/spreadsheet';

import { getCellReference } from '../utils/spreadsheetUtils';

// Initialize spreadsheet with sample data
export const initializeSpreadsheetData = (): SpreadsheetData => {
  const data: SpreadsheetData = {};
  
  // Sample data from the original mockData
  const sampleRows = [
    {
      A: "Launch social media campaign for pro...",
      B: "15-11-2024",
      C: "In-progress",
      D: "Aisha Patel",
      E: "www.aishapatel...",
      F: "Sophie Choudhury",
      G: "Medium",
      H: "20-11-2024",
      I: "6,200,000"
    },
    {
      A: "Update press kit for company redesign",
      B: "28-10-2024",
      C: "need to start",
      D: "Irfan Khan",
      E: "www.irfankhan...",
      F: "Tejas Pandey",
      G: "High",
      H: "30-10-2024",
      I: "3,600,000"
    },
    {
      A: "Finalize user testing feedback for app...",
      B: "05-12-2024",
      C: "In-progress",
      D: "Mark Johnson",
      E: "www.markjohns...",
      F: "Rachel Lee",
      G: "Medium",
      H: "10-12-2024",
      I: "4,750,000"
    },
    {
      A: "Design new features for the website",
      B: "10-01-2025",
      C: "Complete",
      D: "Emily Green",
      E: "www.emilygreen...",
      F: "Tom Wright",
      G: "Low",
      H: "15-01-2025",
      I: "5,900,000"
    },
    {
      A: "Prepare financial report for Q4",
      B: "25-01-2025",
      C: "Blocked",
      D: "Jessica Brown",
      E: "www.jessicabro...",
      F: "Kevin Smith",
      G: "Low",
      H: "30-01-2025",
      I: "2,800,000"
    }
  ];

  // Add headers
  const headers = ["Job", "Submitted", "Status", "Submitter", "URL", "Assigned", "Priority", "Due Date", "Value"];
  headers.forEach((header, colIndex) => {
    const cellRef = getCellReference(0, colIndex);
    data[cellRef] = { value: header, type: 'text' };
  });

  // Add sample data
  sampleRows.forEach((row, rowIndex) => {
    Object.entries(row).forEach(([col, value]) => {
      const cellRef = `${col}${rowIndex + 2}`; // Start from row 2 (after headers)
      data[cellRef] = { value, type: 'text' };
    });
  });

  return data;
};

export const defaultSpreadsheetData = initializeSpreadsheetData();