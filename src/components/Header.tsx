import { Search, Bell, ChevronRight } from 'lucide-react';
import React from 'react';

const Header = () => {
  return (
    <header className='bg-white border-b border-gray-200 px-4 py-4'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center justify-between'>
                <span className='hover:text-blue-500 cursor-pointer transition-colors'>Wrokspace</span>
                <ChevronRight size={14} className='text-gray-400' />
                <span className='hover:text-blue-600 cursor-pointer transition-colors'>Folder 2</span>
                <ChevronRight size={14} className='text-gray-400' />
                <span className='font-medium text-gray-900'>SpreadSheet 3</span>
            </div>

            <div className='flex items-center space-x-4'>

                <div className='relative'>
                    <Search size={16} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                    <input type="text" placeholder='Search within sheet' className='pl-10 pr-4 border py-3 border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-transparent w-64' /> 
                </div>

                <div className='relative'>
                    <Bell size={18} className='text-gray-600 hover:text-gray-800 cursor-pointer transition-colors' />
                    <div className='absolute -top-3 bg-red-500 text-white text-xs rounded w-4 h-4 flex items-center justify-center'>3</div>
                </div>

                <div className='flex items-center space-x-2'>
                    <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>CG</div>
                    <span className='text-sm font-medium text-gray-700'>Chandan Gautam</span>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header