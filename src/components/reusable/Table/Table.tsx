import React, { useEffect, RefObject } from "react";
import { TableColumn, TableConfig } from "@/interface/main";
import { Triangle } from "lucide-react";

type TableComponentProps = {
  data: Record<string, any>[];
  config: TableConfig;
  onCellClick?: (cellData: any, row: Record<string, any>) => void;
  onSortClick?: (sort_key: string, sort_dir: "asc" | "desc") => void;
  scrollRef?: RefObject<HTMLTableRowElement | null>; // Updated ref type
};

const DownIcon: React.FC = () => (
  <Triangle strokeWidth={1.75} fill="white" size={10} className="rotate-180" />
);
const UpIcon: React.FC = () => <Triangle strokeWidth={1.75} fill="white" size={10} />;
const CombineIcon: React.FC = () => (
  <>
    <UpIcon />
    <DownIcon />
  </>
);

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  config,
  onCellClick,
  onSortClick,
  scrollRef, // Accept scrollRef for the last row
}) => {

  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [data]); // Trigger scrolling when data updates

  const handleSort = (key: string) => {
    let newSortDir: "desc" | "asc" = "desc";
    if (config.sort_by === key) {
      newSortDir = config.sort_dir === "asc" ? "desc" : "asc";
    }
    onSortClick?.(key, newSortDir);
  };

  const sortedData = [...data];

  const getSortIcon = (col: TableColumn) => {
    if (!col.sortable) return null;
    if (config.sort_by === col.keys[0]) {
      return config.sort_dir === "asc" ? <UpIcon /> : <DownIcon />;
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
          sortedData.map((row, index) => (
            <tr
              key={row.id || JSON.stringify(row)}
              className={config.trClassName.class(row)}
              ref={index === sortedData.length - 1 ? scrollRef : null} // Attach ref to the last row
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
                    ? col.customBodyRender(row, index)
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
