"use client";

import { ArrowBigDownDash, Triangle } from 'lucide-react';
import React, { JSX, useState } from 'react';

type TableColumn = {
  name: string;
  keys: string[];
  sortable?: boolean;
  className?: string
  customBodyRender?: (row: any) => JSX.Element;
};

type TableConfig = {
  tableClassName: string;
  tHeadClassName: string;
  tBodyClassName: string;
  trClassName: string;
  thClassName: string;
  thIconClassName: string;
  tdClassname: string;
  showItemQuantity: number;
  columns: TableColumn[];
  rows: {
    className: string;
  };
  emptyState: {
    text: () => string;
  };
};

type TableComponentProps = {
  data: Record<string, any>[];
  config: TableConfig;
};

const Downicon: React.FC = () =>  <Triangle strokeWidth={1.75} fill='white' size={10} className='rotate-180'/>
const Upicon: React.FC = () =>  <Triangle strokeWidth={1.75} fill='white' size={10} className=''/>
const Combineicon: React.FC = () => <>
    <Upicon /><Downicon />
</>

const TableComponent: React.FC<TableComponentProps> = ({ data, config }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <table className={config.tableClassName}>
      <thead className={config.tHeadClassName}>
        <tr>
          {config.columns.map((col) => (
            <th
              key={col.name}
              className={col.className ? `${col.className} ${config.thClassName} `: config.thClassName}
              onClick={() => col.sortable && handleSort(col.keys[0])}
            >
                <div className={config.thIconClassName}>
                    <span > {col.sortable && (sortConfig.key === col.keys[0] ? (sortConfig.direction === 'asc' ? <Upicon /> : <Downicon />) : <Combineicon />)}  </span>
                    <span>{col.name}  </span>
                </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={config.tBodyClassName}>
        {sortedData.length > 0 ? (
          sortedData.slice(0, config.showItemQuantity).map((row, index) => (
            <tr key={index} className={config.trClassName}>
              {config.columns.map((col, colIndex) =>
                col.customBodyRender ? (
                  <td className={config.tdClassname} key={colIndex}>{col.customBodyRender(row)}</td>
                ) : (
                  <td key={colIndex} className={config.tdClassname}>{ row[col.keys[0]] || config.emptyState.text()}</td>
                )
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={config.columns.length} className={config.tdClassname}>
              {config.emptyState.text()}
            </td>
          </tr>
        )}
      </tbody>
     
    </table>
  );
};




export default TableComponent;
