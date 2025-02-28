"use client";

import { TableColumn, TableConfig } from "@/interface/main";
import { Triangle } from "lucide-react";
import React, { useState } from "react";


type TableComponentProps = {
  data: Record<string, any>[];
  config: TableConfig;
  showItemQuantity: number;
  onCellClick?: (cellData: any, row: Record<string, any>) => void;
  onSortClick?: (sort_key: string, sort_dir: 'asc' | 'desc' ) => void;
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
  onSortClick
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

    onSortClick?.(sortConfig.key || '', sortConfig.direction);
  };
  
  const sortedData = [...data]

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
