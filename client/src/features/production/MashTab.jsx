import React from 'react'
import  { ActionForm, MashData, MashIngredientForm  } from "."

const MashTab = ({ row, reloadData }) => {
    return (
        <><div>
            <MashIngredientForm row={row} reloadData={reloadData} modalId="addIngredientModal"/>
            <ActionForm row={row} reloadData={reloadData} modalId="reportMashStepModal"/>
            <MashData 
                row={row} 
                reloadData={reloadData}
                modal={[
                    { modal: "reportMashStepModal", modalText: "Report Step"}, 
                    { modal: "addIngredientModal", modalText: "Add Ingredient"}]} />
            
            {/* 
            <Collapsible label="Mash Analysis">
                <p>All done? Run analysis: finds durations for each enzyme, cooling & heating durations, stores them in new array</p>
                <p>Mash Analysis Model</p>
            </Collapsible> */}
        </div></>
    )
}

export default MashTab