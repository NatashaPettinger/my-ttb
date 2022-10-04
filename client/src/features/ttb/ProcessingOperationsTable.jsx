import React from 'react'

//table showing months & years
//Expands into table showing form fields.

const ProcessingOperationsTable = ({ row={} }) => {
    const placeholder1 = ''
    const placeholder2 = ''

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
                        <td>1. On hand first of month</td>
                        <td></td>
                        <td>{row.procStart? row.procStart.total : null}</td>
                    </tr>
                    <tr>
                        <td>2. Received</td>
                        <td></td>
                        <td>{row.procDumped? row.procDumped.total : null}</td>
                    </tr>
                    <tr>
                        <td>4. Alcohol, Flavor, Materials Dumped</td>
                        <td></td>
                        <td>{row.procDumped? row.procDumped.total : null}</td>
                    </tr>
                    <tr>
                        <td>5. Wine Mixed with Spirits</td>
                        <td></td>
                        <td>{row.procDumped? row.procDumped.total : null}</td>
                    </tr>
                    <tr>
                        <td>6. Dumped for Further Processing</td>
                        <td></td>
                        <td>{row.procDumped? row.procDumped.total : null}</td>
                    </tr>
                    <tr>
                        <td>7. Gains</td>
                        <td></td>
                        <td>{row.procDumped? row.procDumped.total : null}</td>
                    </tr>
                    <tr>
                        <td>8. Total - Lines 1 through 7</td>
                        <td></td>
                        <td>{row.procDumped? row.procDumped.total : null}</td>
                    </tr>
                    <tr>
                        <td>9. Bottled or Packaged</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>10. Wine Mixed With Spirits</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>11. Used for Denaturation</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>12. Transferred in Bond</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>13. Withdrawn Tax Determined</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>14. Withdrawn Free of Tax: For U.S. Hospital, Scientific, or Educational Use</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>15. Withdrawn Without Payment of Tax: For Addition to Wine</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>16. For Exportation & Transfer to C.B.W.</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>17. Transferred to Production Account for Redistillation</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>18. Withdrawn for Research, Development, or Testing</td>
                        <td></td>
                        <td>{row.procToResearchBulk? row.procToResearchBulk : null}</td>
                    </tr>
                    <tr>
                        <td>19. Destroyed</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>20. Used for Redistillation</td>
                        <td>N/A</td>
                        <td>N/A</td>
                    </tr>
                    <tr>
                        <td>24. Losses</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>25. On hand end of month</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>26. Total - Lines 9 through 25</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr><th colSpan={3} >PART II - FINISHED PRODUCTS - All quantities in proof gallons</th></tr>
                    <tr>
                      <th>Transaction (a)</th>
                      <th>BOTTLED (b)</th>
                      <th>PACKAGED (c)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>27. On hand first of month</td>
                        <td></td>
                        <td>{row.procStart? row.procStart.total : null}</td>
                    </tr>
                    <tr>
                        <td>28. Bottled or Packaged</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>29. Received</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>30. Inventory Overages</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>31. Total - Lines 27 through 30</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>32. Transferred in Bond</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>33. Withdrawn, tax determined</td>
                        <td>This is the amount to pay excise taxes on</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>34. Withdrawn Free of Tax: For U.S. Hospital, Scientific, or Educational Use</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>35. Withdrawn Without Payment of Tax: For Addition to Wine</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>36. For Exportation, Vessels, and Aircraft, and Transfer to C.B.W.</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>37. Transferred to Production Account for Redistillation</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>38. Withdrawn for research, development, and testing</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>39. Destroyed</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>40. Dumped for Further Processing</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>44. Losses</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>45. Inventory Shortages</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>46. On hand end of month</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>47. Total - Lines 32 through 46</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr><th colSpan={6} >PART IV - PROCESSING OF BEVERAGE (Nonindustrial use) SPIRITS</th></tr>
                    <tr>
                      <th>Transaction (a)</th>
                      <th>Bulk spirits dumped into processing (whole proof gallons) (b)</th>
                      <th>Bottled-imported (whole proof gallons) (c)</th>
                      <th>Bottled (Excluded bottled in bond and export) (whole wine gallons) (d)</th>
                      <th>Bottled in bond 24 CFR 5.42(b) - exclude export (whole wine gallons) (e)</th>
                      <th>Bottled for Export (whole wine gallons) (f)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>49. Alcohol and Neutral Spirits (other than vodka)</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>50. Blended Straight Whiskey</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>51. (a) Blended whiskey with neutral spirits</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>51. (b) Blended whiskey with light whiskey</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>52. Blended light whiskey</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>53. Any other blends of 100% whiskey</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>54. (a) Imported whiskey: Scotch</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>54. (b) Imported whiskey: Canadian</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>54. (c) Imported whiskey: Irish & Others</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>55. Domestic whiskey distilled at 160˚ and under</td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td>{placeholder2}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>56. Domestic whiskey distilled at over 160˚</td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>57. Brandy distilled at 170˚ and under</td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>58. Brandy distilled at over 170˚</td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>60. (a) Rum domestic</td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>60. (b) Rum imported</td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>61. Gin</td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>62. Vodka</td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>63. Cordials, liqueurs, and specialties</td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>64. Cocktails and mixed drinks</td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>65. Tequila</td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>67. Total - lines 49 through 66</td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td>{placeholder1}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default ProcessingOperationsTable
