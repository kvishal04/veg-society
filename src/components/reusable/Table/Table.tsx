"use client";

import { TableColumn, TableConfig } from "@/interface/main";
import { Triangle } from "lucide-react";
import React, { useState } from "react";


type TableComponentProps = {
  data: Record<string, any>[];
  config: TableConfig;
  showItemQuantity: number;
  onCellClick?: (cellData: any, row: Record<string, any>) => void;
};

const DownIcon: React.FC = () => (
  <Triangle strokeWidth={1.75} fill="white" size={10} className="rotate-180" />
);
const UpIcon: React.FC = () => (
  <Triangle strokeWidth={1.75} fill="white" size={10} />
);
const CombineIcon: React.FC = () => (
  <>
    <UpIcon />
    <DownIcon />
  </>
);

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  config,
  showItemQuantity,
  onCellClick,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
  
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];
  
    // Handle null/undefined values safely
    if (aValue == null) return sortConfig.direction === "asc" ? -1 : 1;
    if (bValue == null) return sortConfig.direction === "asc" ? 1 : -1;
  
    // Detect if the value is a date in "DD/MM/YYYY" format
    const isDate = (value: string): boolean => /^\d{2}\/\d{2}\/\d{4}$/.test(value);
  
    // Convert "DD/MM/YYYY" string to Date object
    const parseDate = (dateStr: string): Date | null => {
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        const [day, month, year] = parts.map(Number);
        return new Date(year, month - 1, day); // Month is 0-based in JS
      }
      return null;
    };
  
    // Check if both values are dates
    if (isDate(aValue) && isDate(bValue)) {
      const dateA = parseDate(aValue);
      const dateB = parseDate(bValue);
      if (dateA && dateB) {
        return sortConfig.direction === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
    }
  
    // Check if both values are numbers
    if (!isNaN(aValue) && !isNaN(bValue)) {
      return sortConfig.direction === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    }
  
    // Default string comparison for other cases
    return sortConfig.direction === "asc"
      ? String(aValue).localeCompare(String(bValue), undefined, { numeric: true })
      : String(bValue).localeCompare(String(aValue), undefined, { numeric: true });
  });
  
  
  
  const getSortIcon = (col: TableColumn) => {
    if (!col.sortable) return null;
    if (sortConfig.key === col.keys[0]) {
      return sortConfig.direction === "asc" ? <UpIcon /> : <DownIcon />;
    }
    return <CombineIcon />;
  };

  return (
    <table className={config.tableClassName}>
      <thead className={config.tHeadClassName}>
        <tr>
          {config.columns.map((col) => (
            <th
              key={col.name}
              className={
                col.className
                  ? `${col.className} ${config.thClassName}`
                  : config.thClassName
              }
              onClick={() => col.sortable && handleSort(col.keys[0])}
            >
              <div className={config.thIconClassName}>
                <span>{getSortIcon(col)}</span>
                <span>{col.name}</span>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={config.tBodyClassName}>
        {sortedData.length > 0 ? (
          sortedData.slice(0, showItemQuantity).map((row) => (
            <tr
                key={row.id || JSON.stringify(row)}
                className={config.trClassName.class(row)}
               
              >
              {config.columns.map((col) => (
                <td
                  key={col.name}
                  className={`${config.tdClassname ?? ""} ${
                    col.rowclassName ?? ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCellClick?.(col.keys[0], row);
                  }}
                >
                  {col.customBodyRender
                    ? col.customBodyRender(row)
                    : row[col.keys[0]] || config.emptyState.text()}
                </td>
              ))}
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
