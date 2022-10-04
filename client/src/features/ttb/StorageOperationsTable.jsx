import React from 'react'
//table showing months & years
//Expands into table showing form fields.

const StorageOperationsTable = ({ row={} }) => {
    return (
        <>
            <table className='table table-compact w-full'>
                <thead>
                    <tr><th colSpan={12} className="text-center" >All quantities in proof gallons</th></tr>
                    <tr className="sticky top-0 z-50">
                      <th className="z-50">Transaction (a)</th>
                      <th className="whitespace-pre text-center">Whiskey<br/>(&lt;= 160˚)<br/>(b)</th>
                      <th className="whitespace-pre text-center">Whiskey<br/>(&gt; 160˚)<br/>(c)</th>
                      <th className="whitespace-pre text-center">Brandy<br/>(&lt;= 170˚)<br/>(d)</th>
                      <th className="whitespace-pre text-center">Brandy<br/>(&gt; 170˚)<br/>(e)</th>
                      <th className="whitespace-pre text-center">Rum<br/>(f)</th>
                      <th className="whitespace-pre text-center">Gin<br/>(g)</th>
                      <th className="whitespace-pre text-center">Vodka<br/>(h)</th>
                      <th className="whitespace-pre text-center">Alc & Spirits<br/>(&gt;= 190˚)<br/>(i)</th>
                      <th className="whitespace-pre text-center">Alc & Spirits<br/>(&lt; 190˚)<br/>(j)</th>
                      <th className="whitespace-pre text-center">Other<br/>(k)</th>
                      <th className="whitespace-pre text-center">Total<br/>(l)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1. On hand first<br/>of month</th>
                        <td>{row.storageFirstOfMonth? row.storageFirstOfMonth.whiskeyWeak : null}</td>
                        <td>{row.storageFirstOfMonth? row.storageFirstOfMonth.whiskeyStrong : null}</td>
                        <td>{row.storageFirstOfMonth? row.storageFirstOfMonth.BrandyWeak : null}</td>
                        <td>{row.storageFirstOfMonth? row.storageFirstOfMonth.BrandyStrong : null}</td>
                        <td>{row.storageFirstOfMonth? row.storageFirstOfMonth.rum : null}</td>
                        <td>{row.storageFirstOfMonth? row.storageFirstOfMonth.gin : null}</td>
                        <td>{row.storageFirstOfMonth? row.storageFirstOfMonth.vodka : null}</td>
                        <td>{row.storageFirstOfMonth? row.storageFirstOfMonth.neutral : null}</td>
                        <td>{row.storageFirstOfMonth? row.storageFirstOfMonth.neutralLow : null}</td>
                        <td>{row.storageFirstOfMonth? row.storageFirstOfMonth.other : null}</td>
                        <td>{row.storageFirstOfMonth? row.storageFirstOfMonth.total : null}</td>
                    </tr>
                    <tr>
                      <th>2. Deposited in Bulk<br/>Storage</th>
                        <td>{row.depositedInStorage? row.depositedInStorage.whiskeyWeak : null}</td>
                        <td>{row.depositedInStorage? row.depositedInStorage.whiskeyStrong : null}</td>
                        <td>{row.depositedInStorage? row.depositedInStorage.BrandyWeak : null}</td>
                        <td>{row.depositedInStorage? row.depositedInStorage.BrandyStrong : null}</td>
                        <td>{row.depositedInStorage? row.depositedInStorage.rum : null}</td>
                        <td>{row.depositedInStorage? row.depositedInStorage.gin : null}</td>
                        <td>{row.depositedInStorage? row.depositedInStorage.vodka : null}</td>
                        <td>{row.depositedInStorage? row.depositedInStorage.neutral : null}</td>
                        <td>{row.depositedInStorage? row.depositedInStorage.neutralLow : null}</td>
                        <td>{row.depositedInStorage? row.depositedInStorage.other : null}</td>
                        <td>{row.depositedInStorage? row.depositedInStorage.total : null}</td>
                    </tr>
                    <tr>
                      <th>3. Received from<br/>customs custody</th>
                        <td>{row.storageRecFromCustoms? row.storageRecFromCustoms.whiskeyWeak : null}</td>
                        <td>{row.storageRecFromCustoms? row.storageRecFromCustoms.whiskeyStrong : null}</td>
                        <td>{row.storageRecFromCustoms? row.storageRecFromCustoms.BrandyWeak : null}</td>
                        <td>{row.storageRecFromCustoms? row.storageRecFromCustoms.BrandyStrong : null}</td>
                        <td>{row.storageRecFromCustoms? row.storageRecFromCustoms.rum : null}</td>
                        <td>{row.storageRecFromCustoms? row.storageRecFromCustoms.gin : null}</td>
                        <td>{row.storageRecFromCustoms? row.storageRecFromCustoms.vodka : null}</td>
                        <td>{row.storageRecFromCustoms? row.storageRecFromCustoms.neutral : null}</td>
                        <td>{row.storageRecFromCustoms? row.storageRecFromCustoms.neutralLow : null}</td>
                        <td>{row.storageRecFromCustoms? row.storageRecFromCustoms.other : null}</td>
                        <td>{row.storageRecFromCustoms? row.storageRecFromCustoms.total : null}</td>
                    </tr>
                    <tr>
                      <th>4. Returned to<br/>bulk storage</th>
                        <td>{row.storageReturned? row.storageReturned.whiskeyWeak : null}</td>
                        <td>{row.storageReturned? row.storageReturned.whiskeyStrong : null}</td>
                        <td>{row.storageReturned? row.storageReturned.BrandyWeak : null}</td>
                        <td>{row.storageReturned? row.storageReturned.BrandyStrong : null}</td>
                        <td>{row.storageReturned? row.storageReturned.rum : null}</td>
                        <td>{row.storageReturned? row.storageReturned.gin : null}</td>
                        <td>{row.storageReturned? row.storageReturned.vodka : null}</td>
                        <td>{row.storageReturned? row.storageReturned.neutral : null}</td>
                        <td>{row.storageReturned? row.storageReturned.neutralLow : null}</td>
                        <td>{row.storageReturned? row.storageReturned.other : null}</td>
                        <td>{row.storageReturned? row.storageReturned.total : null}</td>
                    </tr>
                    <tr>
                      <th>6. TOTAL<br/>(Lines 1 through 5)</th>
                        <td>{row.storageTotal6? row.storageTotal6.whiskeyWeak : null}</td>
                        <td>{row.storageTotal6? row.storageTotal6.whiskeyStrong : null}</td>
                        <td>{row.storageTotal6? row.storageTotal6.BrandyWeak : null}</td>
                        <td>{row.storageTotal6? row.storageTotal6.BrandyStrong : null}</td>
                        <td>{row.storageTotal6? row.storageTotal6.rum : null}</td>
                        <td>{row.storageTotal6? row.storageTotal6.gin : null}</td>
                        <td>{row.storageTotal6? row.storageTotal6.vodka : null}</td>
                        <td>{row.storageTotal6? row.storageTotal6.neutral : null}</td>
                        <td>{row.storageTotal6? row.storageTotal6.neutralLow : null}</td>
                        <td>{row.storageTotal6? row.storageTotal6.other : null}</td>
                        <td>{row.storageTotal6? row.storageTotal6.total : null}</td>
                    </tr>
                    <tr>
                      <th>7. Withdrawn Taxpaid</th>
                        <td>{row.storageTaxpaid? row.storageTaxpaid.whiskeyWeak : null}</td>
                        <td>{row.storageTaxpaid? row.storageTaxpaid.whiskeyStrong : null}</td>
                        <td>{row.storageTaxpaid? row.storageTaxpaid.BrandyWeak : null}</td>
                        <td>{row.storageTaxpaid? row.storageTaxpaid.BrandyStrong : null}</td>
                        <td>{row.storageTaxpaid? row.storageTaxpaid.rum : null}</td>
                        <td>{row.storageTaxpaid? row.storageTaxpaid.gin : null}</td>
                        <td>{row.storageTaxpaid? row.storageTaxpaid.vodka : null}</td>
                        <td>{row.storageTaxpaid? row.storageTaxpaid.neutral : null}</td>
                        <td>{row.storageTaxpaid? row.storageTaxpaid.neutralLow : null}</td>
                        <td>{row.storageTaxpaid? row.storageTaxpaid.other : null}</td>
                        <td>{row.storageTaxpaid? row.storageTaxpaid.total : null}</td>
                    </tr>
                    <tr>
                      <th>8. Withdrawn for Use<br/>of the United States</th>
                        <td>{row.storageToUseOfUS? row.storageToUseOfUS.whiskeyWeak : null}</td>
                        <td>{row.storageToUseOfUS? row.storageToUseOfUS.whiskeyStrong : null}</td>
                        <td>{row.storageToUseOfUS? row.storageToUseOfUS.BrandyWeak : null}</td>
                        <td>{row.storageToUseOfUS? row.storageToUseOfUS.BrandyStrong : null}</td>
                        <td>{row.storageToUseOfUS? row.storageToUseOfUS.rum : null}</td>
                        <td>{row.storageToUseOfUS? row.storageToUseOfUS.gin : null}</td>
                        <td>{row.storageToUseOfUS? row.storageToUseOfUS.vodka : null}</td>
                        <td>{row.storageToUseOfUS? row.storageToUseOfUS.neutral : null}</td>
                        <td>{row.storageToUseOfUS? row.storageToUseOfUS.neutralLow : null}</td>
                        <td>{row.storageToUseOfUS? row.storageToUseOfUS.other : null}</td>
                        <td>{row.storageToUseOfUS? row.storageToUseOfUS.total : null}</td>
                    </tr>
                    <tr>
                      <th>9. Withdrawn for Hospital,<br/>scientific educational use</th>
                        <td>{row.storageToHospSciEdu? row.storageToHospSciEdu.whiskeyWeak : null}</td>
                        <td>{row.storageToHospSciEdu? row.storageToHospSciEdu.whiskeyStrong : null}</td>
                        <td>{row.storageToHospSciEdu? row.storageToHospSciEdu.BrandyWeak : null}</td>
                        <td>{row.storageToHospSciEdu? row.storageToHospSciEdu.BrandyStrong : null}</td>
                        <td>{row.storageToHospSciEdu? row.storageToHospSciEdu.rum : null}</td>
                        <td>{row.storageToHospSciEdu? row.storageToHospSciEdu.gin : null}</td>
                        <td>{row.storageToHospSciEdu? row.storageToHospSciEdu.vodka : null}</td>
                        <td>{row.storageToHospSciEdu? row.storageToHospSciEdu.neutral : null}</td>
                        <td>{row.storageToHospSciEdu? row.storageToHospSciEdu.neutralLow : null}</td>
                        <td>{row.storageToHospSciEdu? row.storageToHospSciEdu.other : null}</td>
                        <td>{row.storageToHospSciEdu? row.storageToHospSciEdu.total : null}</td>
                    </tr>
                    <tr>
                      <th>10. Withdrawn for Export</th>
                        <td>{row.storageToExport? row.storageToExport.whiskeyWeak : null}</td>
                        <td>{row.storageToExport? row.storageToExport.whiskeyStrong : null}</td>
                        <td>{row.storageToExport? row.storageToExport.BrandyWeak : null}</td>
                        <td>{row.storageToExport? row.storageToExport.BrandyStrong : null}</td>
                        <td>{row.storageToExport? row.storageToExport.rum : null}</td>
                        <td>{row.storageToExport? row.storageToExport.gin : null}</td>
                        <td>{row.storageToExport? row.storageToExport.vodka : null}</td>
                        <td>{row.storageToExport? row.storageToExport.neutral : null}</td>
                        <td>{row.storageToExport? row.storageToExport.neutralLow : null}</td>
                        <td>{row.storageToExport? row.storageToExport.other : null}</td>
                        <td>{row.storageToExport? row.storageToExport.total : null}</td>
                    </tr>
                    <tr>
                      <th>11. Withdrawn for Transfer<br/>to foreign-trade zone</th>
                        <td>{row.storageTransferToFTZ? row.storageTransferToFTZ.whiskeyWeak : null}</td>
                        <td>{row.storageTransferToFTZ? row.storageTransferToFTZ.whiskeyStrong : null}</td>
                        <td>{row.storageTransferToFTZ? row.storageTransferToFTZ.BrandyWeak : null}</td>
                        <td>{row.storageTransferToFTZ? row.storageTransferToFTZ.BrandyStrong : null}</td>
                        <td>{row.storageTransferToFTZ? row.storageTransferToFTZ.rum : null}</td>
                        <td>{row.storageTransferToFTZ? row.storageTransferToFTZ.gin : null}</td>
                        <td>{row.storageTransferToFTZ? row.storageTransferToFTZ.vodka : null}</td>
                        <td>{row.storageTransferToFTZ? row.storageTransferToFTZ.neutral : null}</td>
                        <td>{row.storageTransferToFTZ? row.storageTransferToFTZ.neutralLow : null}</td>
                        <td>{row.storageTransferToFTZ? row.storageTransferToFTZ.other : null}</td>
                        <td>{row.storageTransferToFTZ? row.storageTransferToFTZ.total : null}</td>
                    </tr>
                    <tr>
                      <th>12. Withdrawn for<br/>Transfer to CMBW</th>
                        <td>{row.storageTransferToCMBW? row.storageTransferToCMBW.whiskeyWeak : null}</td>
                        <td>{row.storageTransferToCMBW? row.storageTransferToCMBW.whiskeyStrong : null}</td>
                        <td>{row.storageTransferToCMBW? row.storageTransferToCMBW.BrandyWeak : null}</td>
                        <td>{row.storageTransferToCMBW? row.storageTransferToCMBW.BrandyStrong : null}</td>
                        <td>{row.storageTransferToCMBW? row.storageTransferToCMBW.rum : null}</td>
                        <td>{row.storageTransferToCMBW? row.storageTransferToCMBW.gin : null}</td>
                        <td>{row.storageTransferToCMBW? row.storageTransferToCMBW.vodka : null}</td>
                        <td>{row.storageTransferToCMBW? row.storageTransferToCMBW.neutral : null}</td>
                        <td>{row.storageTransferToCMBW? row.storageTransferToCMBW.neutralLow : null}</td>
                        <td>{row.storageTransferToCMBW? row.storageTransferToCMBW.other : null}</td>
                        <td>{row.storageTransferToCMBW? row.storageTransferToCMBW.total : null}</td>
                    </tr>
                    <tr>
                      <th>13. Withdrawn for Use<br/>as supplies on<br/>vessels and aircraft</th>
                        <td>{row.storageUseOnVessels? row.storageUseOnVessels.whiskeyWeak : null}</td>
                        <td>{row.storageUseOnVessels? row.storageUseOnVessels.whiskeyStrong : null}</td>
                        <td>{row.storageUseOnVessels? row.storageUseOnVessels.BrandyWeak : null}</td>
                        <td>{row.storageUseOnVessels? row.storageUseOnVessels.BrandyStrong : null}</td>
                        <td>{row.storageUseOnVessels? row.storageUseOnVessels.rum : null}</td>
                        <td>{row.storageUseOnVessels? row.storageUseOnVessels.gin : null}</td>
                        <td>{row.storageUseOnVessels? row.storageUseOnVessels.vodka : null}</td>
                        <td>{row.storageUseOnVessels? row.storageUseOnVessels.neutral : null}</td>
                        <td>{row.storageUseOnVessels? row.storageUseOnVessels.neutralLow : null}</td>
                        <td>{row.storageUseOnVessels? row.storageUseOnVessels.other : null}</td>
                        <td>{row.storageUseOnVessels? row.storageUseOnVessels.total : null}</td>
                    </tr>
                    <tr>
                      <th>14. Withdrawn for<br/>Transfer to bonded winery</th>
                        <td>{row.storageTransferToBondedWinery? row.storageTransferToBondedWinery.whiskeyWeak : null}</td>
                        <td>{row.storageTransferToBondedWinery? row.storageTransferToBondedWinery.whiskeyStrong : null}</td>
                        <td>{row.storageTransferToBondedWinery? row.storageTransferToBondedWinery.BrandyWeak : null}</td>
                        <td>{row.storageTransferToBondedWinery? row.storageTransferToBondedWinery.BrandyStrong : null}</td>
                        <td>{row.storageTransferToBondedWinery? row.storageTransferToBondedWinery.rum : null}</td>
                        <td>{row.storageTransferToBondedWinery? row.storageTransferToBondedWinery.gin : null}</td>
                        <td>{row.storageTransferToBondedWinery? row.storageTransferToBondedWinery.vodka : null}</td>
                        <td>{row.storageTransferToBondedWinery? row.storageTransferToBondedWinery.neutral : null}</td>
                        <td>{row.storageTransferToBondedWinery? row.storageTransferToBondedWinery.neutralLow : null}</td>
                        <td>{row.storageTransferToBondedWinery? row.storageTransferToBondedWinery.other : null}</td>
                        <td>{row.storageTransferToBondedWinery? row.storageTransferToBondedWinery.total : null}</td>
                    </tr>
                    <tr>
                      <th>15. Withdrawn for<br/>Transfer to CBW</th>
                        <td>{row.storageTransferToCBW? row.storageTransferToCBW.whiskeyWeak : null}</td>
                        <td>{row.storageTransferToCBW? row.storageTransferToCBW.whiskeyStrong : null}</td>
                        <td>{row.storageTransferToCBW? row.storageTransferToCBW.BrandyWeak : null}</td>
                        <td>{row.storageTransferToCBW? row.storageTransferToCBW.BrandyStrong : null}</td>
                        <td>{row.storageTransferToCBW? row.storageTransferToCBW.rum : null}</td>
                        <td>{row.storageTransferToCBW? row.storageTransferToCBW.gin : null}</td>
                        <td>{row.storageTransferToCBW? row.storageTransferToCBW.vodka : null}</td>
                        <td>{row.storageTransferToCBW? row.storageTransferToCBW.neutral : null}</td>
                        <td>{row.storageTransferToCBW? row.storageTransferToCBW.neutralLow : null}</td>
                        <td>{row.storageTransferToCBW? row.storageTransferToCBW.other : null}</td>
                        <td>{row.storageTransferToCBW? row.storageTransferToCBW.total : null}</td>
                    </tr>
                    <tr>
                        <th>16. Withdrawn for<br/>Research, Development,<br/>or Testing</th>
                        <td>{row.storageToResearch? row.storageToResearch.whiskeyWeak : null}</td>
                        <td>{row.storageToResearch? row.storageToResearch.whiskeyStrong : null}</td>
                        <td>{row.storageToResearch? row.storageToResearch.BrandyWeak : null}</td>
                        <td>{row.storageToResearch? row.storageToResearch.BrandyStrong : null}</td>
                        <td>{row.storageToResearch? row.storageToResearch.rum : null}</td>
                        <td>{row.storageToResearch? row.storageToResearch.gin : null}</td>
                        <td>{row.storageToResearch? row.storageToResearch.vodka : null}</td>
                        <td>{row.storageToResearch? row.storageToResearch.neutral : null}</td>
                        <td>{row.storageToResearch? row.storageToResearch.neutralLow : null}</td>
                        <td>{row.storageToResearch? row.storageToResearch.other : null}</td>
                        <td>{row.storageToResearch? row.storageToResearch.total : null}</td>
                    </tr>
                    <tr>
                        <th>17. Transferred to<br/>Processing Account</th>
                        <td>{row.storageToProcessing? row.storageToProcessing.whiskeyWeak : null}</td>
                        <td>{row.storageToProcessing? row.storageToProcessing.whiskeyStrong : null}</td>
                        <td>{row.storageToProcessing? row.storageToProcessing.BrandyWeak : null}</td>
                        <td>{row.storageToProcessing? row.storageToProcessing.BrandyStrong : null}</td>
                        <td>{row.storageToProcessing? row.storageToProcessing.rum : null}</td>
                        <td>{row.storageToProcessing? row.storageToProcessing.gin : null}</td>
                        <td>{row.storageToProcessing? row.storageToProcessing.vodka : null}</td>
                        <td>{row.storageToProcessing? row.storageToProcessing.neutral : null}</td>
                        <td>{row.storageToProcessing? row.storageToProcessing.neutralLow : null}</td>
                        <td>{row.storageToProcessing? row.storageToProcessing.other : null}</td>
                        <td>{row.storageToProcessing? row.storageToProcessing.total : null}</td>
                    </tr>
                    <tr>
                        <th>18. Transferred to<br/>Production Account</th>
                        <td>{row.storageToProduction? row.storageToProduction.whiskeyWeak : null}</td>
                        <td>{row.storageToProduction? row.storageToProduction.whiskeyStrong : null}</td>
                        <td>{row.storageToProduction? row.storageToProduction.BrandyWeak : null}</td>
                        <td>{row.storageToProduction? row.storageToProduction.BrandyStrong : null}</td>
                        <td>{row.storageToProduction? row.storageToProduction.rum : null}</td>
                        <td>{row.storageToProduction? row.storageToProduction.gin : null}</td>
                        <td>{row.storageToProduction? row.storageToProduction.vodka : null}</td>
                        <td>{row.storageToProduction? row.storageToProduction.neutral : null}</td>
                        <td>{row.storageToProduction? row.storageToProduction.neutralLow : null}</td>
                        <td>{row.storageToProduction? row.storageToProduction.other : null}</td>
                        <td>{row.storageToProduction? row.storageToProduction.total : null}</td>
                    </tr>
                    <tr>
                        <th>19. Transferred to<br/>Other Bonded Premises</th>
                        <td>{row.storageToTIB? row.storageToTIB.whiskeyWeak : null}</td>
                        <td>{row.storageToTIB? row.storageToTIB.whiskeyStrong : null}</td>
                        <td>{row.storageToTIB? row.storageToTIB.BrandyWeak : null}</td>
                        <td>{row.storageToTIB? row.storageToTIB.BrandyStrong : null}</td>
                        <td>{row.storageToTIB? row.storageToTIB.rum : null}</td>
                        <td>{row.storageToTIB? row.storageToTIB.gin : null}</td>
                        <td>{row.storageToTIB? row.storageToTIB.vodka : null}</td>
                        <td>{row.storageToTIB? row.storageToTIB.neutral : null}</td>
                        <td>{row.storageToTIB? row.storageToTIB.neutralLow : null}</td>
                        <td>{row.storageToTIB? row.storageToTIB.other : null}</td>
                        <td>{row.storageToTIB? row.storageToTIB.total : null}</td>
                    </tr>
                    <tr>
                        <th>20. Destroyed</th>
                        <td>{row.storageDestroyed? row.storageDestroyed.whiskeyWeak : null}</td>
                        <td>{row.storageDestroyed? row.storageDestroyed.whiskeyStrong : null}</td>
                        <td>{row.storageDestroyed? row.storageDestroyed.BrandyWeak : null}</td>
                        <td>{row.storageDestroyed? row.storageDestroyed.BrandyStrong : null}</td>
                        <td>{row.storageDestroyed? row.storageDestroyed.rum : null}</td>
                        <td>{row.storageDestroyed? row.storageDestroyed.gin : null}</td>
                        <td>{row.storageDestroyed? row.storageDestroyed.vodka : null}</td>
                        <td>{row.storageDestroyed? row.storageDestroyed.neutral : null}</td>
                        <td>{row.storageDestroyed? row.storageDestroyed.neutralLow : null}</td>
                        <td>{row.storageDestroyed? row.storageDestroyed.other : null}</td>
                        <td>{row.storageDestroyed? row.storageDestroyed.total : null}</td>
                    </tr>
                    <tr>
                        <th>22. Other Losses</th>
                        <td>{row.storageLosses? row.storageLosses.whiskeyWeak : null}</td>
                        <td>{row.storageLosses? row.storageLosses.whiskeyStrong : null}</td>
                        <td>{row.storageLosses? row.storageLosses.BrandyWeak : null}</td>
                        <td>{row.storageLosses? row.storageLosses.BrandyStrong : null}</td>
                        <td>{row.storageLosses? row.storageLosses.rum : null}</td>
                        <td>{row.storageLosses? row.storageLosses.gin : null}</td>
                        <td>{row.storageLosses? row.storageLosses.vodka : null}</td>
                        <td>{row.storageLosses? row.storageLosses.neutral : null}</td>
                        <td>{row.storageLosses? row.storageLosses.neutralLow : null}</td>
                        <td>{row.storageLosses? row.storageLosses.other : null}</td>
                        <td>{row.storageLosses? row.storageLosses.total : null}</td>
                    </tr>
                    <tr>
                        <th>23. On hand<br/>end of month</th>
                        <td>{row.storageEndofMonth? row.storageEndofMonth.whiskeyWeak : null}</td>
                        <td>{row.storageEndofMonth? row.storageEndofMonth.whiskeyStrong : null}</td>
                        <td>{row.storageEndofMonth? row.storageEndofMonth.BrandyWeak : null}</td>
                        <td>{row.storageEndofMonth? row.storageEndofMonth.BrandyStrong : null}</td>
                        <td>{row.storageEndofMonth? row.storageEndofMonth.rum : null}</td>
                        <td>{row.storageEndofMonth? row.storageEndofMonth.gin : null}</td>
                        <td>{row.storageEndofMonth? row.storageEndofMonth.vodka : null}</td>
                        <td>{row.storageEndofMonth? row.storageEndofMonth.neutral : null}</td>
                        <td>{row.storageEndofMonth? row.storageEndofMonth.neutralLow : null}</td>
                        <td>{row.storageEndofMonth? row.storageEndofMonth.other : null}</td>
                        <td>{row.storageEndofMonth? row.storageEndofMonth.total : null}</td>
                    </tr>
                    <tr>
                        <th>24. TOTAL<br/>(Lines 7 through 23)</th>
                        <td>{row.storageTotal24? row.storageTotal24.whiskeyWeak : null}</td>
                        <td>{row.storageTotal24? row.storageTotal24.whiskeyStrong : null}</td>
                        <td>{row.storageTotal24? row.storageTotal24.BrandyWeak : null}</td>
                        <td>{row.storageTotal24? row.storageTotal24.BrandyStrong : null}</td>
                        <td>{row.storageTotal24? row.storageTotal24.rum : null}</td>
                        <td>{row.storageTotal24? row.storageTotal24.gin : null}</td>
                        <td>{row.storageTotal24? row.storageTotal24.vodka : null}</td>
                        <td>{row.storageTotal24? row.storageTotal24.neutral : null}</td>
                        <td>{row.storageTotal24? row.storageTotal24.neutralLow : null}</td>
                        <td>{row.storageTotal24? row.storageTotal24.other : null}</td>
                        <td>{row.storageTotal24? row.storageTotal24.total : null}</td>
                    </tr>
                </tbody>
            </table>
            
            <h2>What we have:</h2>
            <ul>
              <li>Find tanks where currentFill.fillDate falls within that month, check if tankHistory.length === 0. these are newly filled barrels that month, so can fill in part III accordingly</li>
              <li>Find all tanks where tankHistory.length === 0. These are all new coop. If contents === wheat, then add them to the new coop form on production.</li>
              <li>Find all tanks where they're totes.</li>
              <li>Find all tanks where tankHistory.length more than 0, these are the used coops</li>
              <li>TIB's are all tanks where there is no distillation history, that were filled that month</li>
              <li>To get the production data, sum over the array with empty dates between the start and end of the month. The contents will be determined there as well. </li>
              <li>For the materials used section in form 40, go to the use logs in the Raw Materials collection.</li>
              <li></li>
            </ul>
        </>
    )
}

export default StorageOperationsTable
