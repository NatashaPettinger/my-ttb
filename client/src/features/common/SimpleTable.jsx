import React from 'react'
import { useTable, useExpanded } from 'react-table'

/* const table = styled.table`
  width: 100%
`
const Styles = styled.div`
box-sizing: border-box;
padding: 0;
margin: .1rem 0;
border: 0;
` */

function Table({ columns, data, renderRowSubComponent  }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    visibleColumns,
    prepareRow,
  } = useTable({
    columns,
    data,
    autoResetExpanded: false,
  },
  useExpanded)

  // Render the UI for your table
  return (
    <>
      <table className="table table-compact w-full"  {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                        <td {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      ) 
                    })}
                  </tr>
                  {row.isExpanded ? (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              )
            })}
        </tbody>
      </table>
    </>
  )
}

export default Table
