export interface SpreadsheetRow {
    id: number;
    job: string;
    submitted: string;
    status: 'In-progress' | 'need to start' | 'complete' | 'Blocked';
    submitter: string;
    url: string;
    assigned: string;
    priority: 'High' | 'Medium' | 'Low';
    dueDate: string;
    value: string;
}

export interface Column {
    id: string;
    header: string;
    accessor: keyof SpreadsheetRow;
    width: number;
    resizable: boolean;
    visible: boolean;
}

export interface SpreadsheetCell {
    value: string;
    formula?: string;
    type?: 'text' | 'number' | 'date' | 'formula';
}

export interface SpreadsheetData {
    [key: string]: SpreadsheetCell;
}

export interface CellPosition {
    row: number;
    col: number;
    columnId: string;
}
