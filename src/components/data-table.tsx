import type { ReactNode } from "react";

export type DataTableColumn = {
  key: string;
  label: string;
  description?: string;
  align?: "left" | "center" | "right";
};

export type DataTableRow = {
  id: string;
  cells: Record<string, ReactNode>;
};

export function DataTable({
  caption,
  description,
  columns,
  rows,
  emptyMessage = "No rows are available for this view.",
}: {
  caption: string;
  description?: string;
  columns: readonly DataTableColumn[];
  rows: readonly DataTableRow[];
  emptyMessage?: string;
}) {
  return (
    <div className="data-table-shell">
      <div className="data-table-scroll" role="region" aria-label={`${caption} table`} tabIndex={0}>
        <table className="data-table">
          <caption>
            <span className="data-table-caption-title">{caption}</span>
            {description ? <span className="data-table-caption-description">{description}</span> : null}
          </caption>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  className={`data-table-cell-${column.align ?? "left"}`}
                  key={column.key}
                  scope="col"
                >
                  <span>{column.label}</span>
                  {column.description ? <small>{column.description}</small> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((column, index) => {
                    const cell = row.cells[column.key];
                    const className = `data-table-cell-${column.align ?? "left"}`;

                    return index === 0 ? (
                      <th className={className} key={column.key} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td className={className} key={column.key}>
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td className="data-table-empty" colSpan={columns.length}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
