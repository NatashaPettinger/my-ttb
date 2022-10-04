import React from 'react';
import { FermentData, FermentDataForm, SetFermentTank } from '.';

const FermentTab = ({ row, reloadData }) => {
    return (
        <><div className="bg-base-100">
            <FermentData 
                row={row} 
                reloadData={reloadData} 
                modal={[
                    {modal: "setFermentTankModal", modalText: "Set Ferment Tank"},
                    {modal: "reportFermentDataModal", modalText: "Report Ferment Data"}]}/>
            <SetFermentTank row={row} reloadData={reloadData} modalId="setFermentTankModal"/>
            <FermentDataForm row={row} reloadData={reloadData} modalId="reportFermentDataModal"/>
        </div></>
    )
}

export default FermentTab