import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { SpreadsheetData, CellPosition } from '../types/spreadsheet';
import { generateColumnHeaders, getCellReference } from '../utils/spreadsheetUtils';
import SpreadsheetCell from './SpreadsheetCell';

interface SpreadsheetGridProps {
  data: SpreadsheetData;
  onCellEdit: (cellRef: string, value: string) => void;
}

const TOTAL_ROWS = 1000;
const TOTAL_COLS = 26; // A-Z
const ROW_HEIGHT = 32;
const DEFAULT_COL_WIDTH = 120;
const MIN_COL_WIDTH = 50;
const MAX_COL_WIDTH = 400;
const HEADER_HEIGHT = 32;
const ROW_HEADER_WIDTH = 60;

const SpreadsheetGrid: React.FC<SpreadsheetGridProps> = ({ data, onCellEdit }) => {
  const [selectedCell, setSelectedCell] = useState<CellPosition>({ row: 0, col: 0, columnId: 'A' });
  const [editingCell, setEditingCell] = useState<CellPosition | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({});
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const columnHeaders = generateColumnHeaders(TOTAL_COLS);

  const getColumnWidth = (columnId: string) => {
    return columnWidths[columnId] || DEFAULT_COL_WIDTH;
  };

  const getTotalWidth = () => {
    return ROW_HEADER_WIDTH + columnHeaders.reduce((total, header) => total + getColumnWidth(header), 0);
  };

  // Calculate visible range based on scroll position
  const getVisibleRange = () => {
    const containerHeight = containerRef.current?.clientHeight || 600;
    const containerWidth = containerRef.current?.clientWidth || 800;
    
    const startRow = Math.floor(scrollTop / ROW_HEIGHT);
    const endRow = Math.min(TOTAL_ROWS - 1, startRow + Math.ceil(containerHeight / ROW_HEIGHT) + 5);
    
    // Calculate visible columns based on accumulated widths
    let accumulatedWidth = ROW_HEADER_WIDTH;
    let startCol = 0;
    let endCol = TOTAL_COLS - 1;
    
    // Find start column
    for (let i = 0; i < TOTAL_COLS; i++) {
      const colWidth = getColumnWidth(columnHeaders[i]);
      if (accumulatedWidth + colWidth > scrollLeft) {
        startCol = i;
        break;
      }
      accumulatedWidth += colWidth;
    }
    
    // Find end column
    accumulatedWidth = ROW_HEADER_WIDTH;
    for (let i = 0; i < TOTAL_COLS; i++) {
      const colWidth = getColumnWidth(columnHeaders[i]);
      accumulatedWidth += colWidth;
      if (accumulatedWidth > scrollLeft + containerWidth + 200) { // Add buffer
        endCol = i;
        break;
      }
    }
    
    return { startRow, endRow, startCol, endCol };
  };

  const { startRow, endRow, startCol, endCol } = getVisibleRange();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (editingCell || isResizing) return; // Don't handle navigation when editing or resizing

    const { row, col } = selectedCell;
    let newRow = row;
    let newCol = col;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        newRow = Math.max(0, row - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        newRow = Math.min(TOTAL_ROWS - 1, row + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newCol = Math.max(0, col - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        newCol = Math.min(TOTAL_COLS - 1, col + 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (e.shiftKey) {
          newRow = Math.max(0, row - 1);
        } else {
          newRow = Math.min(TOTAL_ROWS - 1, row + 1);
        }
        break;
      case 'Tab':
        e.preventDefault();
        if (e.shiftKey) {
          newCol = Math.max(0, col - 1);
        } else {
          newCol = Math.min(TOTAL_COLS - 1, col + 1);
        }
        break;
      case 'F2':
        e.preventDefault();
        setEditingCell(selectedCell);
        break;
    }

    if (newRow !== row || newCol !== col) {
      const newColumnId = columnHeaders[newCol];
      setSelectedCell({ row: newRow, col: newCol, columnId: newColumnId });
      scrollToCell(newRow, newCol);
    }
  }, [selectedCell, editingCell, columnHeaders, isResizing]);

  const scrollToCell = (row: number, col: number) => {
    if (!containerRef.current) return;

    const containerHeight = containerRef.current.clientHeight;
    const containerWidth = containerRef.current.clientWidth;
    
    const cellTop = row * ROW_HEIGHT;
    
    // Calculate cell left position based on accumulated column widths
    let cellLeft = ROW_HEADER_WIDTH;
    for (let i = 0; i < col; i++) {
      cellLeft += getColumnWidth(columnHeaders[i]);
    }
    
    const cellWidth = getColumnWidth(columnHeaders[col]);
    
    // Vertical scrolling
    if (cellTop < scrollTop) {
      setScrollTop(cellTop);
    } else if (cellTop + ROW_HEIGHT > scrollTop + containerHeight) {
      setScrollTop(cellTop + ROW_HEIGHT - containerHeight);
    }
    
    // Horizontal scrolling
    if (cellLeft < scrollLeft) {
      setScrollLeft(cellLeft - ROW_HEADER_WIDTH);
    } else if (cellLeft + cellWidth > scrollLeft + containerWidth) {
      setScrollLeft(cellLeft + cellWidth - containerWidth);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleCellClick = (row: number, col: number) => {
    if (isResizing) return; // Don't select cells while resizing
    const columnId = columnHeaders[col];
    setSelectedCell({ row, col, columnId });
    setEditingCell(null);
  };

  const handleCellEdit = (cellRef: string, value: string) => {
    onCellEdit(cellRef, value);
  };

  const handleStartEdit = (row: number, col: number) => {
    if (isResizing) return; // Don't start editing while resizing
    const columnId = columnHeaders[col];
    setEditingCell({ row, col, columnId });
  };

  const handleStopEdit = () => {
    setEditingCell(null);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setScrollTop(target.scrollTop);
    setScrollLeft(target.scrollLeft);
  };

  // Column resizing handlers
  const handleMouseDown = (e: React.MouseEvent, columnId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isNearRightEdge = e.clientX > rect.right - 8; // 8px resize zone
    
    if (isNearRightEdge) {
      // Start resizing
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(columnId);
      setResizeStartX(e.clientX);
      setResizeStartWidth(getColumnWidth(columnId));
      
      // Add global event listeners
      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - resizeStartX;
        const newWidth = Math.max(MIN_COL_WIDTH, Math.min(MAX_COL_WIDTH, resizeStartWidth + deltaX));
        
        setColumnWidths(prev => ({
          ...prev,
          [columnId]: newWidth
        }));
      };
      
      const handleMouseUp = () => {
        setIsResizing(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }
  };

const handleMouseMove = (e: React.MouseEvent, columnId: string) => {
  if (isResizing) return;

  if (!(e.currentTarget instanceof HTMLElement)) return;

  const rect = e.currentTarget.getBoundingClientRect();
  const isNearRightEdge = e.clientX > rect.right - 8;

  e.currentTarget.style.cursor = isNearRightEdge ? 'col-resize' : 'pointer';
};

const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  if (!isResizing) {
    (e.currentTarget as HTMLDivElement).style.cursor = 'pointer';
  }
};

  // Calculate column positions for rendering
  const getColumnPosition = (colIndex: number) => {
    let position = ROW_HEADER_WIDTH;
    for (let i = 0; i < colIndex; i++) {
      position += getColumnWidth(columnHeaders[i]);
    }
    return position;
  };

  return (
    <div className="flex-1 overflow-hidden bg-white">
      {/* Column Headers */}
      <div className="sticky top-0 z-20 bg-gray-50 border-b border-gray-200">
        <div className="relative" style={{ height: HEADER_HEIGHT }}>
          {/* Corner cell */}
          <div 
            className="absolute top-0 left-0 bg-gray-100 border-r border-gray-200 flex items-center justify-center text-xs font-medium text-gray-500 z-10"
            style={{ width: ROW_HEADER_WIDTH, height: HEADER_HEIGHT }}
          />
          
          {/* Column headers container */}
          <div 
            className="absolute top-0 overflow-hidden"
            style={{ 
              left: ROW_HEADER_WIDTH, 
              right: 0, 
              height: HEADER_HEIGHT,
              transform: `translateX(-${scrollLeft}px)`
            }}
          >
            {columnHeaders.slice(startCol, endCol + 1).map((header, index) => {
              const actualColIndex = startCol + index;
              const colWidth = getColumnWidth(header);
              const position = getColumnPosition(actualColIndex) - ROW_HEADER_WIDTH;
              
              return (
                <div
                  key={header}
                  className={`absolute top-0 bg-gray-50 border-r border-gray-200 flex items-center justify-center text-xs font-medium text-gray-500 hover:bg-gray-100 select-none transition-colors ${
                    isResizing === header ? 'bg-blue-50' : ''
                  }`}
                  style={{ 
                    left: position,
                    width: colWidth, 
                    height: HEADER_HEIGHT,
                    cursor: 'pointer'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, header)}
                  onMouseMove={(e) => handleMouseMove(e, header)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="pointer-events-none">{header}</span>
                  {/* Visual resize indicator */}
                  <div
                    className={`absolute right-0 top-0 w-1 h-full transition-all pointer-events-none ${
                      isResizing === header ? 'bg-blue-500 w-0.5' : ''
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto"
        onScroll={handleScroll}
        style={{ height: 'calc(100vh - 200px)' }}
      >
        <div
          ref={gridRef}
          style={{
            height: TOTAL_ROWS * ROW_HEIGHT,
            width: getTotalWidth(),
            position: 'relative'
          }}
        >
          {/* Visible rows */}
          {Array.from({ length: endRow - startRow + 1 }, (_, index) => {
            const rowIndex = startRow + index;
            return (
              <div
                key={rowIndex}
                className="absolute"
                style={{
                  top: rowIndex * ROW_HEIGHT,
                  left: 0,
                  height: ROW_HEIGHT,
                  width: getTotalWidth()
                }}
              >
                {/* Row header */}
                <div
                  className="absolute top-0 left-0 bg-gray-100 border-r border-b border-gray-200 flex items-center justify-center text-xs font-medium text-gray-500 select-none"
                  style={{ width: ROW_HEADER_WIDTH, height: ROW_HEIGHT }}
                >
                  {rowIndex + 1}
                </div>
                
                {/* Cells */}
                {columnHeaders.slice(startCol, endCol + 1).map((columnId, colIndex) => {
                  const actualColIndex = startCol + colIndex;
                  const cellRef = getCellReference(rowIndex, actualColIndex);
                  const cell = data[cellRef];
                  const isSelected = selectedCell.row === rowIndex && selectedCell.col === actualColIndex;
                  const isEditing = editingCell?.row === rowIndex && editingCell?.col === actualColIndex;
                  const colWidth = getColumnWidth(columnId);
                  const position = getColumnPosition(actualColIndex);

                  return (
                    <div
                      key={cellRef}
                      className="absolute top-0"
                      style={{
                        left: position,
                        width: colWidth,
                        height: ROW_HEIGHT
                      }}
                    >
                      <SpreadsheetCell
                        cell={cell}
                        isSelected={isSelected}
                        isEditing={isEditing}
                        onCellClick={() => handleCellClick(rowIndex, actualColIndex)}
                        onCellEdit={(value) => handleCellEdit(cellRef, value)}
                        onStartEdit={() => handleStartEdit(rowIndex, actualColIndex)}
                        onStopEdit={handleStopEdit}
                        columnIndex={actualColIndex}
                        rowIndex={rowIndex}
                        width={colWidth}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetGrid;