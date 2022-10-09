import React, { useEffect, useState } from 'react'
import api from '../api'
import { Footer, NavBar, Tabs } from '../common'
import  { AddMaterialForm, RawMaterialsTable } from '.'
import useAuth from '../api/useAuth';

function RawMaterialss() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const { token } = useAuth();
  
    useEffect(() => {
        getData();
    });
  
    const getData = async () => {
        try {
            const res = await api.getRawMaterials(token);
            setData(res.data.data);
            setLoading(false);
        } catch (e) {
            console.error();
        }
    };
  
  return (
    <>
      <NavBar/>
      <div className="flex flex-col w-full border-opacity-50">
        <div className="grid card bg-base-300 p-5 overflow-y-scroll overflow-x-scroll rounded-none">
          <Tabs tabSize="tab-lg">
            <div label="Raw Materials Inventory">
              <RawMaterialsTable
                reloadData={getData}
                data={data}
                loading={loading}
              />
            </div>
            <div label="Add New Material">
              <AddMaterialForm reloadData={getData}/>
            </div>
          </Tabs>
        </div>
      </div>
      <Footer/>
    </>
      
  );
}
  
export default RawMaterialss