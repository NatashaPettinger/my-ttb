import React from 'react';
import {PostForm} from '../common';


const CreateMash = ({ reloadData }) => {
    
    const formEntries = [
        {label: "Mash Date:", 
        dbKey: "mashDate", 
        type: "date",},
        {label: "Mash Bill:", 
        dbKey: "mashBill", 
        type: "text"},
    ]
    
    return (
        <PostForm 
        reloadData={reloadData} 
        formAction="createMash" 
        buttonLabel="Start New Mash" 
        formEntries={formEntries} 
        instructions="Do not use this form for an already existing mash. To add data points to existing ferment, 
        expand the ferment row and fill in the correct form"/>
    )
}

    
export default CreateMash




