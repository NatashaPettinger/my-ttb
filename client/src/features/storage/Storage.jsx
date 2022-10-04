import React, { useEffect, useState } from 'react'
import api from '../api'
import { TIBForm, TransferFromProduction, WarehousingTable } from '.';
import { Footer, NavBar, Tabs } from '../common';


//add: expanded (to show history of distillate), automatically hide id.

//initialState.hiddenColumns: Array<ColumnId: String>

const Warehousing = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await api.getTanks()
      setData(res.data.data);
      setLoading(false);
    } catch (e) {
      console.error(new Error(`seems your fetch didn't work`))
    }
  };


  return (
    <>
    <div>
      <NavBar/>
      <div className="flex flex-col w-full border-opacity-50">
        <div className="grid card bg-base-300 p-5 overflow-y-scroll overflow-x-scroll rounded-none">
          <Tabs tabSize="tab-lg">
            <div label="Warehousing">
              <WarehousingTable 
              reloadData={getData}
              data={data} 
              loading={loading} />
            </div>
            <div label="Receive Spirit">
              <TransferFromProduction reloadData={getData} data={data} loading={loading} />
              <div className="divider">OR</div>
              <TIBForm reloadData={getData}/>
            </div>
          </Tabs>
      </div> 
      </div>
    <Footer/>
    </div>
    </>
  )
}

    


export default Warehousing