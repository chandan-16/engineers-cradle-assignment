import { useState } from 'react';

import Header from './components/Header'
import Toolbar from './components/Toolbar'
import SpreadsheetTabs from './components/SpreadsheetTabs';
import { defaultSpreadsheetData } from './data/spreadsheetData';
import type { SpreadsheetData } from './types/spreadsheet';


import './App.css'

function App() {
  const [data, setData] = useState<SpreadsheetData>(defaultSpreadsheetData);
  const [activeSpreadsheetTab, setActiveSpreadsheetTab] = useState('q3-overview');



  const handleToolbarAction = (action: string) => {
    console.log(`Toolbar action : ${action}`);
    switch(action) {
          case 'hideFiels' :
            console.log('Hide fields clicked - would show column visibility menu');
            break;
          case 'sort' : 
            console.log('Sort Clicked - would show sort options');
            break;
          case 'filter' : 
            console.log('Filter clicked- would show filter options');
            break;
          case 'cellView' : 
            console.log('cellView clicked- would show filter options');
            break;
          case 'import' : 
            console.log('Import clicked- would show filter options');
            break;
          case 'export' : 
            console.log('Export clicked- would show filter options');
            break;
          case 'share' : 
            console.log('Share clicked- would show filter options');
            break;
          case 'newAction' : 
            console.log('newAction clicked- would show filter options');
            break;
        }
  };

  const handleSpreadsheetTabChange = ( tabId: string ) => {
    console.log(`Spreadsheet tab changed : ${tabId}`);
    setActiveSpreadsheetTab(tabId);
  }

  return (
    <>
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header />
      <Toolbar onAction={handleToolbarAction} />
      <SpreadsheetTabs onTabChange={handleSpreadsheetTabChange} />
    </div>
    </>
  )
}

export default App
