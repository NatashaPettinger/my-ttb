import React, { useEffect } from 'react'
import api from '../api'
import { PostForm } from '../common'
import useAuth from '../api/useAuth'


function ProcessingForm({ data, reloadData }){

    const formEntries = [
        {
            dbKey: "bottleDate",
            label: "Processing Date:",
            type: 'date',
        },{
            dbKey: 'id',
            label: "Select Tank to Process:",
            type: 'select',
            select: data.map(tank => (
                {'dbEntry': tank._id, 
                'label': `${tank.tankInfo.tankType[0].toUpperCase() + tank.tankInfo.tankType.slice(1)} ${tank.tankInfo.tankNumber} | Tank Contents: ${tank.currentFill.contents}`}
            )),
        },{
            dbKey: "batchType",
            label: "Batch Type:",
            type: 'text'
        },{
            dbKey: 'spiritType',
            label: "Spirit Type:",
            type: 'select',
            select: [
                {dbEntry: "neutral", label: "ALCOHOL AND NEUTRAL SPIRITS (Other than vodka)"},
                {dbEntry: "blendedStraight", label: "BLENDED STRAIGHT WHISKEY (no neutral spirits, no light whiskey)"},
                {dbEntry: "blendedNeutral", label: "BLENDED WHISKEY (a. With neutral spirits)"},
                {dbEntry: "blendedWLight", label: "BLENDED WHISKEY (b. With light whiskey)"},
                {dbEntry: "blendedLight", label: "BLENDED LIGHT WHISKEY"},
                {dbEntry: "otherBlended", label: "ANY OTHER BLENDS OF 100% WHISKEY"},
                {dbEntry: "importedScotch", label: "IMPORTED WHISKEY (a. Scotch)"},
                {dbEntry: "importedCanadian", label: "IMPORTED WHISKEY (b. Canadian)"},
                {dbEntry: "importedIrish&others", label: "IMPORTED WHISKEY (c. Irish and Others)"},
                {dbEntry: "whiskeyWeak", label: "DOMESTIC WHISKEY DISTILLED AT 160° AND UNDER"},
                {dbEntry: "whiskeyStrong", label: "DOMESTIC WHISKEY DISTILLED AT OVER 160°"},
                {dbEntry: "brandyWeak", label: "BRANDY DISTILLED AT 170° AND UNDER"},
                {dbEntry: "brandyStrong", label: "BRANDY DISTILLED AT OVER 170°"},
                {dbEntry: "rum", label: "RUM (a. Domestic)"},
                {dbEntry: "gin", label: "GIN"},
                {dbEntry: "vodka", label: "VODKA"},
                {dbEntry: "liqueur", label: "CORDIALS, LIQUEURS, AND SPECIALTIES9"},
                {dbEntry: "cocktail", label: "COCKTAILS AND MIXED DRINKS"},
                {dbEntry: "tequila", label: "TEQUILA"},
            ] 
        },{
          dbKey: 'description',
          label: "Process Description:",
          type: 'select',
          select: [
              {dbEntry: 'processingWineGalBottled', label: "BOTTLED (EXCLUDING BOTTLED IN BOND AND FOR EXPORT)"},
              {dbEntry: 'processingWineGalBottledInBond', label: "BOTTLED IN BOND (EXCLUED EXPORT)"},
              {dbEntry: 'processingBottledForExport', label: "BOTTLED FOR EXPORT"},
          ] 
        },{
            dbKey: "batchNumber",
            label: "Batch Number:",
            type: 'number',
            step: "1",
            min: "1"
        },{
            dbKey: "finalProof",
            label: "Bottling Proof:",
            type: 'number',
            step: "0.1",
            min: "40",
            max: "195"
        },{
            dbKey: "count750mLBottles",
            label: "Number of 750 mL bottles:",
            type: 'number',
            step: "1",
            min: "0"
        },{
            dbKey: "count375mLBottles",
            label: "Number of 375 mL bottles:",
            type: 'number',
            step: "1",
            min: "0"
        },{
            dbKey: "notes",
            label: "Notes:",
            type: 'text'
        },
    ]


    return (
        <PostForm 
        reloadData={reloadData} 
        formAction="processNewBatch" 
        buttonLabel="Process Batch" 
        formEntries={formEntries} 
        instructions='Process new batch'/>
        
      );
}


function DataLoading({ data, loading, reloadData }) {
    if (loading) {
      return (
            <p>Loading...</p>
      );
    }
    // error handling here :)
  
    return (
    <>
        <ProcessingForm
            data={data}
            reloadData={reloadData}/>
    </>
    );
}


function NewBatchForm({ reloadData }){
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const { token } = useAuth();
  
    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      try {
        const res = await api.getTanks(token)
        setData(res.data.data);
        setLoading(false);
      } catch (e) {
        console.error(new Error(`seems your fetch didn't work`))
      }
    };
  
    return (
      <DataLoading
        data={data}
        loading={loading}
        reloadData={reloadData}
      />
    );
}

export default NewBatchForm