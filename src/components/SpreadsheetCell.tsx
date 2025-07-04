import React, { useState, useRef, useEffect } from 'react';
import type { SpreadsheetCell as CellType } from '../types/spreadsheet';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

interface SpreadsheetCellProps {
  cell: CellType | undefined;
  isSelected: boolean;
  isEditing: boolean;
  onCellClick: () => void;
  onCellEdit: (value: string) => void;
  onStartEdit: () => void;
  onStopEdit: () => void;
  columnIndex: number;
  rowIndex: number;
  width: number;
}

const SpreadsheetCell: React.FC<SpreadsheetCellProps> = ({
  cell,
  isSelected,
  isEditing,
  onCellClick,
  onCellEdit,
  onStartEdit,
  onStopEdit,
  columnIndex,
  rowIndex,
  width
}) => {
  const [editValue, setEditValue] = useState(cell?.value || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(cell?.value || '');
  }, [cell?.value]);

  const handleDoubleClick = () => {
    onStartEdit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isEditing) {
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        onCellEdit(editValue);
        onStopEdit();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setEditValue(cell?.value || '');
        onStopEdit();
      }
    } else {
      if (e.key === 'Enter' || e.key === 'F2') {
        e.preventDefault();
        onStartEdit();
      }
    }
  };

  const handleBlur = () => {
    if (isEditing) {
      onCellEdit(editValue);
      onStopEdit();
    }
  };

  const renderCellContent = () => {
    const value = cell?.value || '';
    
    // Special rendering for specific columns based on content
    if (value === 'In-progress' || value === 'need to start' || value === 'Complete' || value === 'Blocked') {
      return <StatusBadge status={value as any} />;
    }
    
    if (value === 'High' || value === 'Medium' || value === 'Low') {
      return <PriorityBadge priority={value as any} />;
    }
    
    if (value.startsWith('www.')) {
      return (
        <a
          href={`https://${value}`}
          className="text-blue-600 hover:text-blue-800 hover:underline truncate block"
          onClick={(e) => e.stopPropagation()}
        >
          {value}
        </a>
      );
    }
    
    if (value.includes(',') && /^\d{1,3}(,\d{3})*$/.test(value)) {
      return <span className="font-medium">{value}</span>;
    }
    
    return <span className="truncate">{value}</span>;
  };

  return (
    <div
      className={`
        relative border-r border-b border-gray-200 cursor-cell select-none
        ${isSelected ? 'ring-2 ring-blue-500 ring-inset bg-blue-50' : ''}
        ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
        hover:bg-blue-50 transition-colors
      `}
      style={{ width: width, height: '32px' }}
      onClick={onCellClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isSelected ? 0 : -1}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full h-full px-2 text-sm border-none outline-none bg-white"
          style={{ width: width }}
        />
      ) : (
        <div className="w-full h-full px-2 py-1 text-sm flex items-center overflow-hidden">
          {renderCellContent()}
        </div>
      )}
    </div>
  );
};

export default SpreadsheetCell;