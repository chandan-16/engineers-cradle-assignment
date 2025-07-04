// import React from 'react';
// import { Plus } from 'lucide-react'

// interface Tab {
//     id : string;
//     label : string;
//     isActive?: boolean;
//     backgroundColor?: string;
//     textColor?: string
// }

// interface SpreadsheetTabsProps {
//     onTabChange : ( tadId: string ) => void;
// }

// const SpreadsheetTabs: React.FC<SpreadsheetTabsProps> = ({ onTabChange }) => {
//   const tabs: Tab[] = [
//     { 
//       id: 'q3-overview', 
//       label: 'Q3 Financial Overview', 
//       isActive: true,
//       backgroundColor: 'bg-green-100',
//       textColor: 'text-green-800'
//     },
//     { 
//       id: 'abc', 
//       label: 'ABC',
//       backgroundColor: 'bg-gray-100',
//       textColor: 'text-gray-700'
//     },
//     { 
//       id: 'answer-question', 
//       label: 'Answer a question',
//       backgroundColor: 'bg-purple-100',
//       textColor: 'text-purple-800'
//     },
//     { 
//       id: 'extract', 
//       label: 'Extract',
//       backgroundColor: 'bg-orange-100',
//       textColor: 'text-orange-800'
//     }
//   ];

// const SpreadsheetTabs = () => {
//   return (
// <div className="bg-white border-b border-gray-200 px-4">
//       <div className="flex items-center space-x-1">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => onTabChange(tab.id)}
//             className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2 ${
//               tab.isActive
//                 ? `${tab.backgroundColor} ${tab.textColor} border-green-500`
//                 : `${tab.backgroundColor} ${tab.textColor} border-transparent hover:bg-opacity-80`
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//         <button
//           onClick={() => onTabChange('new')}
//           className="ml-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded flex items-center justify-center"
//         >
//           <Plus size={16} />
//         </button>
//       </div>
//     </div>
//   )
// }
// }
// export default SpreadsheetTabs

import React from 'react';
import { Plus } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  isActive?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

interface SpreadsheetTabsProps {
  onTabChange: (tabId: string) => void;
}

const SpreadsheetTabs: React.FC<SpreadsheetTabsProps> = ({ onTabChange }) => {
  const tabs: Tab[] = [
    { 
      id: 'q3-overview', 
      label: 'Q3 Financial Overview', 
      isActive: true,
      backgroundColor: 'bg-green-100',
      textColor: 'text-green-800'
    },
    { 
      id: 'abc', 
      label: 'ABC',
      backgroundColor: 'bg-gray-100',
      textColor: 'text-gray-700'
    },
    { 
      id: 'answer-question', 
      label: 'Answer a question',
      backgroundColor: 'bg-purple-100',
      textColor: 'text-purple-800'
    },
    { 
      id: 'extract', 
      label: 'Extract',
      backgroundColor: 'bg-orange-100',
      textColor: 'text-orange-800'
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-4">
      <div className="flex items-center space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border-b-2 ${
              tab.isActive
                ? `${tab.backgroundColor} ${tab.textColor} border-green-500`
                : `${tab.backgroundColor} ${tab.textColor} border-transparent hover:bg-opacity-80`
            }`}
          >
            {tab.label}
          </button>
        ))}
        <button
          onClick={() => onTabChange('new')}
          className="ml-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded flex items-center justify-center"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default SpreadsheetTabs;