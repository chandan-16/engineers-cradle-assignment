import React from 'react'
import { EyeOff, ArrowUpDown, Filter, Grid3x3, Download, Upload, Share, Plus } from 'lucide-react';

interface ToolbarProps {
    onAction : (action: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onAction }) => {
  return (
    <div className='bg-white border-b border-gray-200 px-4 py-3'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-700'>Toolbar</span>
                <div className='w-px h-6 bg-gray-300 ml-3'></div>

                <div className='flex items-center space-x-1'>
                    <button onClick={() => onAction('hideFields')} className='flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors'>
                      <EyeOff size={16} />
                      <span>Hide Fields</span>  
                    </button>

                    <button onClick={() => onAction('sort')} className='flex items-center space-x-2 px-3 py-3 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors'>
                        <ArrowUpDown size={16} />
                        <span>Sort</span>
                    </button>

                    <button onClick={() => onAction('filter')} className='flex items-center space-x-2 px-3 py-3 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors'>
                        <Filter size={16} />
                        <span>Filter</span>
                    </button>

                    <button onClick={() => onAction('cellView')} className='flex items-center space-x-2 px-3 py-3 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors'>
                        <Grid3x3 size={16} />
                        <span>Cell view</span>
                    </button>
                </div>
            </div>

            <div className='flex items-center space-x-1'>
                <button onClick={() => onAction('import')} className='flex items-center space-x-2 px-3 py-3 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors'>
                    <Upload size={16} />
                    <span>Import</span>
                </button>

                <button onClick={() => onAction('export')} className='flex items-center space-x-2 px-3 py-3 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors'>
                    <Download size={16} />
                    <span>Export</span>
                </button>

                <button onClick={() => onAction('share')} className='flex items-center space-x-2 px-3 py-3 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors'>
                    <Share size={16} />
                    <span>Share</span>
                </button>

                <button onClick={() => onAction('newAction')} className='flex items-center space-x-2 px-3 py-3 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors'>
                    <Plus size={16} />
                    <span>New Action</span>
                </button>
            </div>
        </div> 
    </div>
  )
}

export default Toolbar