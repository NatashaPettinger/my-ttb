import React, { useEffect, useState } from 'react'
import api from '../api'
import { FermentTable, NewMashForm, NewStillRunFormTransfer, NewStillRunFormProduction, TransferFromProductionForm } from '.';
import { Footer, NavBar, Tabs } from '../common'



const Production = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      try {
        const res = await api.getFerments()
        setData(res.data.data);
        setLoading(false);
      } catch (e) {
        console.error(e)
      }
    };
  
    return (
      <div>
        <NavBar/>
        <div className="flex flex-col w-full border-opacity-50">
          <div className="grid card bg-base-300 p-5 overflow-y-scroll overflow-x-scroll rounded-none">
            <Tabs tabSize="tab-lg">
              <div label="Ferment Information">
                <FermentTable 
                  data={data} 
                  loading={loading}
                  reloadData={getData} />
              </div>
              <div label="Start New Mash">
                <NewMashForm reloadData={getData}/>
                <div className="divider">OR</div>
                <NewStillRunFormTransfer reloadData={getData}/>
                <div className="divider">OR</div>
                <NewStillRunFormProduction reloadData={getData}/>
              </div>
              <div label="Transfer Spirits out of Production">
                <TransferFromProductionForm 
                  data={data} 
                  loading={loading}
                  reloadData={getData}/>
              </div>
            </Tabs>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

export default Production