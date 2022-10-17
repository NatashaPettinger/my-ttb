import React from 'react';
import {PostForm} from '../common';


const CreateMash = ({ reloadData }) => {
    
    const formEntries = [
        {label: "Mash Date:", 
        dbKey: "mashDate", 
        type: "date",},
        {label: "Distillate type:", 
        dbKey: "distillateType", 
        type: "select", 
        select: [
            {dbEntry:"wheat", label:"Wheat Whiskey"},
            {dbEntry:"rye", label:"Rye Whiskey"},
            {dbEntry:"bourbon", label:"Bourbon Whiskey"},
            {dbEntry:"corn", label:"Corn Whiskey"},
            {dbEntry:"oat", label:"Oat Whiskey"},
            {dbEntry:"american", label:"American Whiskey"},
            {dbEntry:"malt", label:"Malt Whiskey"},
            {dbEntry:"barley", label:"Barley Whiskey"},
            {dbEntry:"cane", label:"Cane Spirits"},
            {dbEntry:"beet", label:"Beet Spirits"},
            {dbEntry:"brandy", label:"Brandy"},
        ]},
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




