import React, { useEffect, useState } from 'react'
import api from '../api'
import { ProcessingTable, NewBatchForm, ProcessingTransferForm } from '.'
import { Footer, NavBar, Tabs } from '../common'
import useAuth from '../api/useAuth';


const Processing = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await api.getProcessing(token)
      console.log(res)
      setData(res.data.data);
      setLoading(false);
    } catch (e) {
      setError(e)
      console.error(new Error(`seems your processing fetch didn't work`))
    }
  };


  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <>
      <NavBar />
      <div className="flex flex-col w-full border-opacity-50">
        <div className="grid card bg-base-300 p-5 overflow-y-scroll overflow-x-scroll rounded-none">
          <Tabs tabSize="tab-lg">
            <div label="Processing">
              <ProcessingTable 
                data={data} 
                hiddenColumns={[]}
                reloadData={getData} />
            </div>
            <div label="Process New Batch">
              <NewBatchForm reloadData={getData}/>
            </div>
            <div label="Transfer Spirits out of Processing">
              <ProcessingTransferForm reloadData={getData}/>
            </div>
          </Tabs>
      </div> 
      </div>
      <Footer/>
    </>
  )
}

export default Processing