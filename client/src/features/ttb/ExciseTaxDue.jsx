import React from 'react'

const ExciseTaxDue = ({ row }) => {
    return (
        <>
            {(row.yearMonth.endsWith('03') || row.yearMonth.endsWith('06') || row.yearMonth.endsWith('09') || row.yearMonth.endsWith('12'))?
            <div className="p-5">
                <p>You owe ${row.exciseTax} for calendar quarter: {row.yearDate}</p>
            </div>:
            <div className="p-5">
                <p>Excise taxes will be calculated at the end of the quarter.</p>
            </div>}
        </>
    )
}

export default ExciseTaxDue