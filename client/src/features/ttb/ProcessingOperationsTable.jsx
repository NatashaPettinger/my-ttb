import React from 'react'

//table showing months & years
//Expands into table showing form fields.

const ProcessingOperationsTable = ({ row={} }) => {

    return (
        
        <>
            <table>
                <thead>
                    <tr><th colSpan={3} >PART I - BULK INGREDIENTS - All quantities in proof gallons</th></tr>
                    <tr>
                      <th>Transaction (a)</th>
                      <th>Wine (b)</th>
                      <th>Spirits (c)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1. On hand <br/>first of month</th>
                        <td></td>
                        <td>{row.processingFirstOfMonthBulk?? null}</td>
                    </tr>
                    <tr>
                        <th>2. Received</th>
                        <td></td>
                        <td>{row.processingBottled? row.processingBottled.total : null}</td>
                    </tr>
                    <tr>
                        <th>4. Alcohol, Flavor,<br/> Materials Dumped</th>
                        <td></td>
                        <td>{row.processingAlcFlavMat?? null}</td>
                    </tr>
                    <tr>
                        <th>5. Wine Mixed <br/>with Spirits</th>
                        <td></td>
                        <td>{row.processingWineAndSpirits?? null}</td>
                    </tr>
                    <tr>
                        <th>6. Dumped for<br/>Further Processing</th>
                        <td></td>
                        <td>{row.processingDumpedForFurtherProc?? null}</td>
                    </tr>
                    <tr>
                        <th>7. Gains</th>
                        <td></td>
                        <td>{row.processingGainsBulk?? null}</td>
                    </tr>
                    <tr>
                        <th>8. Total - <br/>Lines 1 through 7</th>
                        <td></td>
                        <td>{row.processingBottled? row.processingBottled.total : null}</td>
                    </tr>
                    <tr>
                        <th>9. Bottled <br/>or Packaged</th>
                        <td></td>
                        <td>{row.processingBottled? row.processingBottled.total : null}</td>
                    </tr>
                    <tr>
                        <th>10. Wine Mixed <br/>With Spirits</th>
                        <td></td>
                        <td>{row.processingWineAndSpirits?? null}</td>
                    </tr>
                    <tr>
                        <th>11. Used for <br/>Denaturation</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>12. Transferred in Bond</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>13. Withdrawn <br/>Tax Determined</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>14. Withdrawn Free of Tax:<br/>For U.S. Hospital, Scientific,<br/>or Educational Use</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>15. Withdrawn Without <br/>Payment of Tax: <br/>For Addition to Wine</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>16. For Exportation &<br/>Transfer to C.B.W.</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>17. Transferred to <br/>Production Account <br/>for Redistillation</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>18. Withdrawn for <br/>Research, Development, <br/>or Testing</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>19. Destroyed</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>20. Used for Redistillation</th>
                        <td>N/A</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <th>24. Losses</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>25. On hand <br/>end of month</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>26. Total - <br/>Lines 9 through 25</th>
                        <td></td>
                        <td>{row.processingBottled? row.processingBottled.total : null}</td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr><th  className="whitespace-pre text-center" colSpan={3} >PART II - FINISHED PRODUCTS - All quantities in proof gallons</th></tr>
                    <tr>
                      <th>Transaction (a)</th>
                      <th>BOTTLED (b)</th>
                      <th>PACKAGED (c)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>27. On hand <br/>first of month</th>
                        <td></td>
                        <td>{row.procStart? row.procStart.total : null}</td>
                    </tr>
                    <tr>
                        <th>28. Bottled <br/>or Packaged</th>
                        <td>{row.processingBottled? row.processingBottled.total : null}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>29. Received</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>30. Inventory Overages</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>31. Total - <br/>Lines 27 through 30</th>
                        <td>{row.processingBottled? row.processingBottled.total : null}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>32. Transferred <br/>in Bond</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>33. Withdrawn, <br/>tax determined</th>
                        <td>{row.processingBottled? row.processingBottled.total : null}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>34. Withdrawn Free of Tax: <br/>For U.S. Hospital, Scientific, <br/>or Educational Use</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>35. Withdrawn Without <br/>Payment of Tax: <br/>For Addition to Wine</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>36. For Exportation, Vessels, <br/>and Aircraft, and <br/>Transfer to C.B.W.</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>37. Transferred to Production <br/>Account for Redistillation</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>38. Withdrawn for <br/>research, development, <br/>and testing</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>39. Destroyed</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>40. Dumped for <br/>Further Processing</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>44. Losses</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>45. Inventory Shortages</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>46. On hand <br/>end of month</th>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>47. Total - <br/>Lines 32 through 46</th>
                        <td>{row.processingBottled? row.processingBottled.total : null}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr><th colSpan={6}  className="whitespace-pre text-center">PART IV - PROCESSING OF BEVERAGE (Nonindustrial use) SPIRITS</th></tr>
                    <tr>
                      <th className="whitespace-pre text-center">Transaction (a)</th>
                      <th className="whitespace-pre text-center">Bulk spirits <br/>dumped into processing <br/>(whole proof gallons) <br/>(b)</th>
                      <th className="whitespace-pre text-center">Bottled-imported <br/>(whole proof gallons) <br/>(c)</th>
                      <th className="whitespace-pre text-center">Bottled (Excluded <br/>bottled in bond and export) <br/>(whole wine gallons) <br/>(d)</th>
                      <th className="whitespace-pre text-center">Bottled in bond <br/>24 CFR 5.42(b) - <br/>exclude export <br/>(whole wine gallons) <br/>(e)</th>
                      <th className="whitespace-pre text-center">Bottled for Export <br/>(whole wine gallons) <br/>(f)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>49. Alcohol and <br/>Neutral Spirits <br/>(other than vodka)</th>
                        <td>{row.processingBottled? row.processingBottled.neutral : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.neutral : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.neutral : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.neutral : null}</td>
                    </tr>
                    <tr>
                        <th>50. Blended <br/>Straight Whiskey</th>
                        <td>{row.processingBottled? row.processingBottled.blendedStraight : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.blendedStraight : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.blendedStraight : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.blendedStraight : null}</td>
                    </tr>
                    <tr>
                        <th>51. (a) Blended whiskey <br/>with neutral spirits</th>
                        <td>{row.processingBottled? row.processingBottled.blendedNeutral : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.blendedNeutral : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.blendedNeutral : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.blendedNeutral : null}</td>
                    </tr>
                    <tr>
                        <th>51. (b) Blended whiskey <br/>with light whiskey</th>
                        <td>{row.processingBottled? row.processingBottled.blendedWLight : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.blendedWLight : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.blendedWLight : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.blendedWLight : null}</td>
                    </tr>
                    <tr>
                        <th>52. Blended light whiskey</th>
                        <td>{row.processingBottled? row.processingBottled.blendedLight : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.blendedLight : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.blendedLight : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.blendedLight : null}</td>
                    </tr>
                    <tr>
                        <th>53. Any other blends <br/>of 100% whiskey</th>
                        <td>{row.processingBottled? row.processingBottled.otherBlended : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.otherBlended : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.otherBlended : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.otherBlended : null}</td>
                    </tr>
                    <tr>
                        <th>54. (a) Imported <br/>whiskey: Scotch</th>
                        <td>{row.processingBottled? row.processingBottled.importedScotch : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.importedScotch : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.importedScotch : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.importedScotch : null}</td>
                    </tr>
                    <tr>
                        <th>54. (b) Imported <br/>whiskey: Canadian</th>
                        <td>{row.processingBottled? row.processingBottled.importedCanadian : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.importedCanadian : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.importedCanadian : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.importedCanadian : null}</td>
                    </tr>
                    <tr>
                        <th>54. (c) Imported whiskey: <br/>Irish & Others</th>
                        <td>{row.processingBottled? row.processingBottled.importedIrishAndOthers : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.importedIrishAndOthers : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.importedIrishAndOthers : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.importedIrishAndOthers : null}</td>
                    </tr>
                    <tr>
                        <th>55. Domestic whiskey <br/>distilled at 160˚ and under</th>
                        <td>{row.processingBottled? row.processingBottled.whiskeyWeak : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.whiskeyWeak : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.whiskeyWeak : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.whiskeyWeak : null}</td>
                    </tr>
                    <tr>
                        <th>56. Domestic whiskey <br/>distilled at over 160˚</th>
                        <td>{row.processingBottled? row.processingBottled.whiskeyStrong : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.whiskeyStrong : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.whiskeyStrong : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.whiskeyStrong : null}</td>
                    </tr>
                    <tr>
                        <th>57. Brandy distilled <br/>at 170˚ and under</th>
                        <td>{row.processingBottled? row.processingBottled.brandyWeak : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.brandyWeak : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.brandyWeak : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.brandyWeak : null}</td>
                    </tr>
                    <tr>
                        <th>58. Brandy distilled <br/>at over 170˚</th>
                        <td>{row.processingBottled? row.processingBottled.brandyStrong : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.brandyStrong : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.brandyStrong : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.brandyStrong : null}</td>
                    </tr>
                    <tr>
                        <th>60. (a) Rum domestic</th>
                        <td>{row.processingBottled? row.processingBottled.rum : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.rum : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.rum : null}</td>
                        <td>{row.processingBottledForExportForExport? row.processingBottledForExportForExport.rum : null}</td>
                    </tr>
                    <tr>
                        <th>60. (b) Rum imported</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>61. Gin</th>
                        <td>{row.processingBottled? row.processingBottled.gin : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.gin : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.gin : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.gin : null}</td>
                    </tr>
                    <tr>
                        <th>62. Vodka</th>
                        <td>{row.processingBottled? row.processingBottled.vodka : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.vodka : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.vodka : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.vodka : null}</td>
                    </tr>
                    <tr>
                        <th>63. Cordials, liqueurs, <br/>and specialties</th>
                        <td>{row.processingBottled? row.processingBottled.liqueur : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.liqueur : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.liqueur : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.liqueur : null}</td>
                    </tr>
                    <tr>
                        <th>64. Cocktails and <br/>mixed drinks</th>
                        <td>{row.processingBottled? row.processingBottled.other : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.other : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.other : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.other : null}</td>
                    </tr>
                    <tr>
                        <th>65. Tequila</th>
                        <td>{row.processingBottled? row.processingBottled.tequila : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.tequila : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.tequila : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.tequila : null}</td>
                    </tr>
                    <tr>
                        <th>67. Total - <br/>lines 49 through 66</th>
                        <td>{row.processingBottled? row.processingBottled.total : null}</td>
                        <td></td>
                        <td>{row.processingWineGalBottled? row.processingWineGalBottled.total : null}</td>
                        <td>{row.processingWineGalBottledInBond? row.processingWineGalBottledInBond.total : null}</td>
                        <td>{row.processingBottledForExport? row.processingBottledForExport.total : null}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default ProcessingOperationsTable
