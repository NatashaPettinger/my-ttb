import React from 'react';

//table showing months & years
//Expands into table showing form fields.

const ProductionOperationsTable = ({ row }) => {
    return (
        <>
            <div className="divider">PART I: TRANSACTIONS</div>
            <table className='table table-compact w-full'>
                <thead>
                    <tr><th colSpan={12} className="text-center" >Proof Gallons</th></tr>
                    <tr className="sticky top-0 z-50">
                      <th className="">Transaction (a)</th>
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
                        <th className="z-30">1. Tax Payment</th>
                        <td>{row.productionTaxPayment? row.productionTaxPayment.whiskeyWeak : null}</td>
                        <td>{row.productionTaxPayment? row.productionTaxPayment.whiskeyStrong : null}</td>
                        <td>{row.productionTaxPayment? row.productionTaxPayment.BrandyWeak : null}</td>
                        <td>{row.productionTaxPayment? row.productionTaxPayment.BrandyStrong : null}</td>
                        <td>{row.productionTaxPayment? row.productionTaxPayment.rum : null}</td>
                        <td>{row.productionTaxPayment? row.productionTaxPayment.gin : null}</td>
                        <td>{row.productionTaxPayment? row.productionTaxPayment.vodka : null}</td>
                        <td>{row.productionTaxPayment? row.productionTaxPayment.neutral : null}</td>
                        <td>{row.productionTaxPayment? row.productionTaxPayment.neutralLow : null}</td>
                        <td>{row.productionTaxPayment? row.productionTaxPayment.other : null}</td>
                        <td>{row.productionTaxPayment? row.productionTaxPayment.total : null}</td>
                    </tr>
                    <tr>
                        <th>2. Use of U.S.</th>
                        <td>{row.productionUseOfUS? row.productionUseOfUS.whiskeyWeak : null}</td>
                        <td>{row.productionUseOfUS? row.productionUseOfUS.whiskeyStrong : null}</td>
                        <td>{row.productionUseOfUS? row.productionUseOfUS.BrandyWeak : null}</td>
                        <td>{row.productionUseOfUS? row.productionUseOfUS.BrandyStrong : null}</td>
                        <td>{row.productionUseOfUS? row.productionUseOfUS.rum : null}</td>
                        <td>{row.productionUseOfUS? row.productionUseOfUS.gin : null}</td>
                        <td>{row.productionUseOfUS? row.productionUseOfUS.vodka : null}</td>
                        <td>{row.productionUseOfUS? row.productionUseOfUS.neutral : null}</td>
                        <td>{row.productionUseOfUS? row.productionUseOfUS.neutralLow : null}</td>
                        <td>{row.productionUseOfUS? row.productionUseOfUS.other : null}</td>
                        <td>{row.productionUseOfUS? row.productionUseOfUS.total : null}</td>
                    </tr>
                    <tr>
                        <th>3. Hospital, Scientific,<br/>or Educational Use</th>
                        <td>{row.productionHospSciEdu? row.productionHospSciEdu.whiskeyWeak : null}</td>
                        <td>{row.productionHospSciEdu? row.productionHospSciEdu.whiskeyStrong : null}</td>
                        <td>{row.productionHospSciEdu? row.productionHospSciEdu.BrandyWeak : null}</td>
                        <td>{row.productionHospSciEdu? row.productionHospSciEdu.BrandyStrong : null}</td>
                        <td>{row.productionHospSciEdu? row.productionHospSciEdu.rum : null}</td>
                        <td>{row.productionHospSciEdu? row.productionHospSciEdu.gin : null}</td>
                        <td>{row.productionHospSciEdu? row.productionHospSciEdu.vodka : null}</td>
                        <td>{row.productionHospSciEdu? row.productionHospSciEdu.neutral : null}</td>
                        <td>{row.productionHospSciEdu? row.productionHospSciEdu.neutralLow : null}</td>
                        <td>{row.productionHospSciEdu? row.productionHospSciEdu.other : null}</td>
                        <td>{row.productionHospSciEdu? row.productionHospSciEdu.total : null}</td>
                    </tr>
                    <tr>
                        <th>4. Export</th>
                        <td>{row.productionExport? row.productionExport.whiskeyWeak : null}</td>
                        <td>{row.productionExport? row.productionExport.whiskeyStrong : null}</td>
                        <td>{row.productionExport? row.productionExport.BrandyWeak : null}</td>
                        <td>{row.productionExport? row.productionExport.BrandyStrong : null}</td>
                        <td>{row.productionExport? row.productionExport.rum : null}</td>
                        <td>{row.productionExport? row.productionExport.gin : null}</td>
                        <td>{row.productionExport? row.productionExport.vodka : null}</td>
                        <td>{row.productionExport? row.productionExport.neutral : null}</td>
                        <td>{row.productionExport? row.productionExport.neutralLow : null}</td>
                        <td>{row.productionExport? row.productionExport.other : null}</td>
                        <td>{row.productionExport? row.productionExport.total : null}</td>
                    </tr>
                    <tr>
                        <th>5. Transfer to Foreign<br/>Trade Zone</th>
                        <td>{row.productionTransferToFTZ? row.productionTransferToFTZ.whiskeyWeak : null}</td>
                        <td>{row.productionTransferToFTZ? row.productionTransferToFTZ.whiskeyStrong : null}</td>
                        <td>{row.productionTransferToFTZ? row.productionTransferToFTZ.BrandyWeak : null}</td>
                        <td>{row.productionTransferToFTZ? row.productionTransferToFTZ.BrandyStrong : null}</td>
                        <td>{row.productionTransferToFTZ? row.productionTransferToFTZ.rum : null}</td>
                        <td>{row.productionTransferToFTZ? row.productionTransferToFTZ.gin : null}</td>
                        <td>{row.productionTransferToFTZ? row.productionTransferToFTZ.vodka : null}</td>
                        <td>{row.productionTransferToFTZ? row.productionTransferToFTZ.neutral : null}</td>
                        <td>{row.productionTransferToFTZ? row.productionTransferToFTZ.neutralLow : null}</td>
                        <td>{row.productionTransferToFTZ? row.productionTransferToFTZ.other : null}</td>
                        <td>{row.productionTransferToFTZ? row.productionTransferToFTZ.total : null}</td>
                    </tr>
                    <tr>
                        <th>6. Transfer to CMBW</th>
                        <td>{row.productionTransferToCMBW? row.productionTransferToCMBW.whiskeyWeak : null}</td>
                        <td>{row.productionTransferToCMBW? row.productionTransferToCMBW.whiskeyStrong : null}</td>
                        <td>{row.productionTransferToCMBW? row.productionTransferToCMBW.BrandyWeak : null}</td>
                        <td>{row.productionTransferToCMBW? row.productionTransferToCMBW.BrandyStrong : null}</td>
                        <td>{row.productionTransferToCMBW? row.productionTransferToCMBW.rum : null}</td>
                        <td>{row.productionTransferToCMBW? row.productionTransferToCMBW.gin : null}</td>
                        <td>{row.productionTransferToCMBW? row.productionTransferToCMBW.vodka : null}</td>
                        <td>{row.productionTransferToCMBW? row.productionTransferToCMBW.neutral : null}</td>
                        <td>{row.productionTransferToCMBW? row.productionTransferToCMBW.neutralLow : null}</td>
                        <td>{row.productionTransferToCMBW? row.productionTransferToCMBW.other : null}</td>
                        <td>{row.productionTransferToCMBW? row.productionTransferToCMBW.total : null}</td>
                    </tr>
                    <tr>
                        <th>7. Use as Supplies on<br/>Vessels or Aircraft</th>
                        <td>{row.productionUseOnVessels? row.productionUseOnVessels.whiskeyWeak : null}</td>
                        <td>{row.productionUseOnVessels? row.productionUseOnVessels.whiskeyStrong : null}</td>
                        <td>{row.productionUseOnVessels? row.productionUseOnVessels.BrandyWeak : null}</td>
                        <td>{row.productionUseOnVessels? row.productionUseOnVessels.BrandyStrong : null}</td>
                        <td>{row.productionUseOnVessels? row.productionUseOnVessels.rum : null}</td>
                        <td>{row.productionUseOnVessels? row.productionUseOnVessels.gin : null}</td>
                        <td>{row.productionUseOnVessels? row.productionUseOnVessels.vodka : null}</td>
                        <td>{row.productionUseOnVessels? row.productionUseOnVessels.neutral : null}</td>
                        <td>{row.productionUseOnVessels? row.productionUseOnVessels.neutralLow : null}</td>
                        <td>{row.productionUseOnVessels? row.productionUseOnVessels.other : null}</td>
                        <td>{row.productionUseOnVessels? row.productionUseOnVessels.total : null}</td>
                    </tr>
                    <tr>
                        <th>8. Use in Wine<br/>Production</th>
                        <td>{row.productionUseInWineProduction? row.productionUseInWineProduction.whiskeyWeak : null}</td>
                        <td>{row.productionUseInWineProduction? row.productionUseInWineProduction.whiskeyStrong : null}</td>
                        <td>{row.productionUseInWineProduction? row.productionUseInWineProduction.BrandyWeak : null}</td>
                        <td>{row.productionUseInWineProduction? row.productionUseInWineProduction.BrandyStrong : null}</td>
                        <td>{row.productionUseInWineProduction? row.productionUseInWineProduction.rum : null}</td>
                        <td>{row.productionUseInWineProduction? row.productionUseInWineProduction.gin : null}</td>
                        <td>{row.productionUseInWineProduction? row.productionUseInWineProduction.vodka : null}</td>
                        <td>{row.productionUseInWineProduction? row.productionUseInWineProduction.neutral : null}</td>
                        <td>{row.productionUseInWineProduction? row.productionUseInWineProduction.neutralLow : null}</td>
                        <td>{row.productionUseInWineProduction? row.productionUseInWineProduction.other : null}</td>
                        <td>{row.productionUseInWineProduction? row.productionUseInWineProduction.total : null}</td>
                    </tr>
                    <tr>
                        <th>9. Entered into<br/>Processing Account</th>
                        <td>{row.productionToProcessing? row.productionToProcessing.whiskeyWeak : null}</td>
                        <td>{row.productionToProcessing? row.productionToProcessing.whiskeyStrong : null}</td>
                        <td>{row.productionToProcessing? row.productionToProcessing.BrandyWeak : null}</td>
                        <td>{row.productionToProcessing? row.productionToProcessing.BrandyStrong : null}</td>
                        <td>{row.productionToProcessing? row.productionToProcessing.rum : null}</td>
                        <td>{row.productionToProcessing? row.productionToProcessing.gin : null}</td>
                        <td>{row.productionToProcessing? row.productionToProcessing.vodka : null}</td>
                        <td>{row.productionToProcessing? row.productionToProcessing.neutral : null}</td>
                        <td>{row.productionToProcessing? row.productionToProcessing.neutralLow : null}</td>
                        <td>{row.productionToProcessing? row.productionToProcessing.other : null}</td>
                        <td>{row.productionToProcessing? row.productionToProcessing.total : null}</td>
                    </tr>
                    <tr>
                      <th>10. Entered for<br/>Transfer in Bond</th>
                        <td>{row.productionForTIB? row.productionForTIB.whiskeyWeak : null}</td>
                        <td>{row.productionForTIB? row.productionForTIB.whiskeyStrong : null}</td>
                        <td>{row.productionForTIB? row.productionForTIB.BrandyWeak : null}</td>
                        <td>{row.productionForTIB? row.productionForTIB.BrandyStrong : null}</td>
                        <td>{row.productionForTIB? row.productionForTIB.rum : null}</td>
                        <td>{row.productionForTIB? row.productionForTIB.gin : null}</td>
                        <td>{row.productionForTIB? row.productionForTIB.vodka : null}</td>
                        <td>{row.productionForTIB? row.productionForTIB.neutral : null}</td>
                        <td>{row.productionForTIB? row.productionForTIB.neutralLow : null}</td>
                        <td>{row.productionForTIB? row.productionForTIB.other : null}</td>
                        <td>{row.productionForTIB? row.productionForTIB.total : null}</td>
                    </tr>
                    <tr>
                        <th>11. Entered into Storage<br/>Account</th>
                        <td>{row.productionToStorage? row.productionToStorage.whiskeyWeak : null}</td>
                        <td>{row.productionToStorage? row.productionToStorage.whiskeyStrong : null}</td>
                        <td>{row.productionToStorage? row.productionToStorage.BrandyWeak : null}</td>
                        <td>{row.productionToStorage? row.productionToStorage.BrandyStrong : null}</td>
                        <td>{row.productionToStorage? row.productionToStorage.rum : null}</td>
                        <td>{row.productionToStorage? row.productionToStorage.gin : null}</td>
                        <td>{row.productionToStorage? row.productionToStorage.vodka : null}</td>
                        <td>{row.productionToStorage? row.productionToStorage.neutral : null}</td>
                        <td>{row.productionToStorage? row.productionToStorage.neutralLow : null}</td>
                        <td>{row.productionToStorage? row.productionToStorage.other : null}</td>
                        <td>{row.productionToStorage? row.productionToStorage.total : null}</td>
                    </tr>
                    <tr>
                        <th>12. Withdrawn for Research,<br/>Development, or Testing</th>
                        <td>{row.productionToResearch? row.productionToResearch.whiskeyWeak : null}</td>
                        <td>{row.productionToResearch? row.productionToResearch.whiskeyStront : null}</td>
                        <td>{row.productionToResearch? row.productionToResearch.BrandyWeak : null}</td>
                        <td>{row.productionToResearch? row.productionToResearch.BrandyStrong : null}</td>
                        <td>{row.productionToResearch? row.productionToResearch.rum : null}</td>
                        <td>{row.productionToResearch? row.productionToResearch.gin : null}</td>
                        <td>{row.productionToResearch? row.productionToResearch.vodka : null}</td>
                        <td>{row.productionToResearch? row.productionToResearch.neutral : null}</td>
                        <td>{row.productionToResearch? row.productionToResearch.neutralLow : null}</td>
                        <td>{row.productionToResearch? row.productionToResearch.other : null}</td>
                        <td>{row.productionToResearch? row.productionToResearch.total : null}</td>
                    </tr>
                    <tr>
                        <th>Produced (Total, lines 9-12)</th>
                        <td>{row.productionTotals? row.productionTotals.whiskeyWeak : null}</td>
                        <td>{row.productionTotals? row.productionTotals.whiskeyStrong : null}</td>
                        <td>{row.productionTotals? row.productionTotals.BrandyWeak : null}</td>
                        <td>{row.productionTotals? row.productionTotals.BrandyStrong : null}</td>
                        <td>{row.productionTotals? row.productionTotals.rum : null}</td>
                        <td>{row.productionTotals? row.productionTotals.gin : null}</td>
                        <td>{row.productionTotals? row.productionTotals.vodka : null}</td>
                        <td>{row.productionTotals? row.productionTotals.neutral : null}</td>
                        <td>{row.productionTotals? row.productionTotals.neutralLow : null}</td>
                        <td>{row.productionTotals? row.productionTotals.other : null}</td>
                        <td>{row.productionTotals? row.productionTotals.total : null}</td>
                    </tr>
                    <tr>
                        <th>15. Received for Redistillation</th>
                        <td>{row.productionReceived? row.productionReceived.whiskeyWeak : null}</td>
                        <td>{row.productionReceived? row.productionReceived.whiskeyStront : null}</td>
                        <td>{row.productionReceived? row.productionReceived.BrandyWeak : null}</td>
                        <td>{row.productionReceived? row.productionReceived.BrandyStrong : null}</td>
                        <td>{row.productionReceived? row.productionReceived.rum : null}</td>
                        <td>{row.productionReceived? row.productionReceived.gin : null}</td>
                        <td>{row.productionReceived? row.productionReceived.vodka : null}</td>
                        <td>{row.productionReceived? row.productionReceived.neutral : null}</td>
                        <td>{row.productionReceived? row.productionReceived.neutralLow : null}</td>
                        <td>{row.productionReceived? row.productionReceived.other : null}</td>
                        <td>{row.productionReceived? row.productionReceived.total : null}</td>
                    </tr>
                </tbody>
            </table>
            <div className="divider">PART II: PRODUCTION OF ALCOHOL AND SPIRITS OF 190˚ OR MORE</div>
            <table>
              <thead>
                <tr>
                  <th>Kind of Material (a)</th>
                  <th>Proof Gallons (b)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1. Grain</th>
                  <td>{row.productionPartII? row.productionPartII.grain: null}</td>
                </tr>
                <tr>
                  <th>2. Fruit</th>
                  <td>{row.productionPartII? row.productionPartII.fruit: null}</td>
                </tr>
                <tr>
                  <th>3. Molasses</th>
                  <td>{row.productionPartII? row.productionPartII.molasses: null}</td>
                </tr>
              </tbody>
            </table>
            <div className="divider">PART III: PRODUCTION OF WHISKEY BY KIND AND COOPERAGE USED</div>
            <table>
              <thead>
              <tr><th colSpan={4} >Proof Gallons</th></tr>
                <tr>
                  <th>Kind of Material (a)</th>
                  <th>New Cooperage (b)</th>
                  <th>Used Cooperage (c)</th>
                  <th>Deposited in Tanks (d)</th>
                </tr>
              </thead>
              <tbody>
                {row.productionPartIII? row.productionPartIII.map((x,i) => (
                  <tr key={x._id}>
                    <th>{i + 1}. {x.grainType}</th>
                    <td>{x.newCoop}</td>
                    <td>{x.usedCoop}</td>
                    <td>{x.tanks}</td>
                  </tr>
                ))
                :null}{/* 
                <tr>
                  <td>1. Bourbon</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2. Corn</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>3. Rye</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>4. Light</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr> */}
              </tbody>
            </table>
            <div className="divider">PART IV: PRODUCTION OF BRANDY</div>
            <table>
              <thead>
                <tr>
                  <th>Kind (a)</th>
                  <th>Proof Gallons (b)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1. Grape Brandy</th>
                  <td>{row.productionPartIV? row.productionPartIV.grapeWeak: null}</td>
                </tr>
                <tr>
                  <th>2. All Other Brandy</th>
                  <td>{row.productionPartIV? row.productionPartIV.grapeStrong: null}</td>
                </tr>
                <tr>
                  <th>3. Grape Neutral Brandy</th>
                  <td>{row.productionPartIV? row.productionPartIV.noGrapeWeak: null}</td>
                </tr>
                <tr>
                  <th>4. All Other Neutral Brandy</th>
                  <td>{row.productionPartIV? row.productionPartIV.noGrapeStrong: null}</td>
                </tr>
              </tbody>
            </table>
            <div className="divider">PART V: USED IN REDISTILLATION</div>
            <table>
              <thead>
                <tr>
                  <th>Kind of Spirits (a)</th>
                  <th>Proof Gallons (b)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Whiskey (less than or equal to 160˚) (b)</th>
                  <td>{row.productionReceived? row.productionReceived.whiskeyWeak : null}</td>
                </tr>
                <tr>
                  <th>Whiskey (greater than 160˚) (c)</th>
                  <td>{row.productionReceived? row.productionReceived.whiskeyStront : null}</td>
                </tr>
                <tr>
                  <th>Brandy (less than or equal to 170˚) (d)</th>
                  <td>{row.productionReceived? row.productionReceived.BrandyWeak : null}</td>
                </tr>
                <tr>
                  <th>Brandy (greater than 170˚) (e)</th>
                  <td>{row.productionReceived? row.productionReceived.BrandyStrong : null}</td>
                </tr>
                <tr>
                  <th>Rum (f)</th>
                  <td>{row.productionReceived? row.productionReceived.rum : null}</td>
                </tr>
                <tr>
                  <th>Gin (g)</th>
                  <td>{row.productionReceived? row.productionReceived.gin : null}</td>
                </tr>
                <tr>
                  <th>Vodka (h)</th>
                  <td>{row.productionReceived? row.productionReceived.vodka : null}</td>
                </tr>
                <tr>
                  <th>Alc & Spirits (greater than or equal to 190˚) (i)</th>
                  <td>{row.productionReceived? row.productionReceived.neutral : null}</td>
                </tr>
                <tr>
                  <th>Alc & Spirits (less than 190˚) (j)</th>
                  <td>{row.productionReceived? row.productionReceived.neutralLow : null}</td>
                </tr>
                <tr>
                  <th>Other (k)</th>
                  <td>{row.productionReceived? row.productionReceived.other : null}</td>
                </tr>
              </tbody>
            </table>
            <div className="divider">PART VI: MATERIALS USED</div>
            <table>
              <thead>
                <tr>
                  <th>Kind (a)</th>
                  <th>Used in Distilled Spirits (lbs) (b)</th>
                  <th>Used in Distilled Spirits (gal) (c)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td colSpan={3}>Grain and Grain Products</td></tr>
                  {row.productionPartVI? row.productionPartVI.map((x,i) => x.uom === 'lbs'?
                    (<tr key={x._id}>
                      <th>{i + 1}. {x.kind}</th>
                      <td>{x.quantity}</td>
                      <td></td>
                    </tr>):
                    (<tr key={x._id}>
                      <th>{i + 1}. {x.kind}</th>
                      <td></td>
                      <td>{x.quantity}</td>
                    </tr>)) :null}
              </tbody>
            </table>
        </>
    )
}

export default ProductionOperationsTable
