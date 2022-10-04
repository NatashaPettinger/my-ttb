import React, { useEffect, useState } from 'react'
import api from '../api'
import { Footer, NavBar } from '../common'
import { ProcessReports, TTBOperationsList } from '.'

const TTB = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
      getData();
  }, []);

  const getData = async () => {
      try {
          const res = await api.getTTBReports();
          console.log(res.data)
          setData(res.data.data);
          setLoading(false);
      } catch (e) {
          console.error(new Error(`seems your fetch didn't work`))
      }
  };


    return (
        <>
          <NavBar/>
          <div className="flex flex-col w-full border-opacity-50 bg-base-300">
            <div className="grid card p-5 overflow-y-scroll overflow-x-scroll rounded-none">
            <label htmlFor="processReportsModal" className="btn modal-button">Generate New Reports</label>

            <ProcessReports reloadData={getData} modalId="processReportsModal"/>

            <TTBOperationsList 
              reloadData={getData}
              data={data}
              loading={loading}/>

            </div>
          </div>
          <Footer/>
        </>
    )
}

export default TTB