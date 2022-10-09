import React from "react";
import { useTable, useGroupBy, useExpanded } from "react-table"
import IndeterminateCheckbox from "./ColumnHiding";

const Table = ({ columns, data, hiddenColumns = [], renderRowSubComponent, tableLabel, modal }) => {
  // use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    visibleColumns,
    getToggleHideAllColumnsProps,
  } = useTable({
    columns,
    data, 
    initialState: {hiddenColumns: hiddenColumns},
    autoResetExpanded: false,
    },
    useGroupBy, 
    useExpanded
  );

  return (
    <>
      <div className="navbar bg-base-100">{/* 
        <div className="flex-1">
          <button className="btn btn-ghost normal-case text-xl">{tableLabel}</button>
        </div> */}
        <div className="flex-none">
          <ul className="menu menu-vertical lg:menu-horizontal p-0">
            {modal? (
              modal.map(el => <li className="mb-2 lg:mt-0" key={el.modal}><label htmlFor={el.modal} className="btn modal-button mr-3">{el.modalText}</label></li>)
            ): null}
            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn">Table Options<svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg></label>
              <ul tabIndex={0} className="dropdown-content overflow-y-auto p-2 shadow bg-base-100 rounded-box w-52 max-h-60">
                <li><button><IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle All</button></li>
                {allColumns.map(column => (
                  <li key={column.id}>
                    <button>
                      <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}{column.Header}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </ul>
        </div>
      </div>

      <div className="rounded-none">
        <table {...getTableProps()} className="table table-compact w-full rounded-none">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                    <br></br>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              const rowProps = row.getRowProps();
              return (
                <React.Fragment key={rowProps.key}>
                  <tr {...rowProps}>
                    {row.cells.map(cell => {
                      return (
                        <td 
                          {...cell.getCellProps()}
                        >
                          {cell.isGrouped ? (
                            //if it's a grouped cell, add an expander and row count
                            <>
                              <span {...row.getToggleRowExpandedProps()}>
                                {row.isExpanded ? '⬇️' : '➡️'}
                              </span>{' '}
                              {cell.render('Cell')} ({row.subRows.length})
                            </>
                          ) : cell.isAggregated ? (
                            cell.render('Aggregated')
                          ) : cell.isPlaceholder ? null : (
                            cell.render("Cell")
                          )}
                        </td>
                      ) 
                    })}
                  </tr>
                  {/*
                      If the row is in an expanded state, render a row with a
                      column that fills the entire length of the table.
                    */}
                  {row.isExpanded ? (
                    <tr>
                      <td colSpan={visibleColumns.length} className="bg-base-300">
                        {renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
                
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table