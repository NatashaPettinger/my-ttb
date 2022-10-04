import React from 'react'
import { Table, Tabs } from '../common'
import { DistillTab, FermentTab, MashTab } from '.'


const ProductionTable = ({ data, reloadData }) => {
  
    const columns = React.useMemo(
      () => [{
              Header: 'ℹ️',
              id: 'expander', // It needs an ID
              Cell: ({ row }) => (
                <span {...row.getToggleRowExpandedProps()}>
                  {row.isExpanded ? <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>: <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg> }
                </span>
              ),
            },
            {
              Header: 'Mash Bill',
              accessor: row => row.ingredients.filter(x => x.category === 'grain' || x.category === 'yeast').map(x => x.type).join('|'),
              filterable: true,
            },
            {
              Header: 'Mash Date',
              accessor: row => (new Date(row.mashDate)).toLocaleDateString(),
              filterable: true,
            },
            {
              Header: 'Distill Date',
              accessor: row => row.distillData.distillDate? (new Date(row.distillData.distillDate)).toLocaleDateString() : 'Not distilled yet',
              filterable: true,
            },
            {
              Header: 'Pump Duration (min)',
              id: 'pumpDuration',
              accessor: row => row.distillData.pumpDuration? row.distillData.pumpDuration: 'No Data',
              filterable: true,
            },
            {
              Header: 'Dephleg On Pot Temp (˚F)',
              id: 'dephlegOnPotTemp',
              accessor: row => row.distillData.dephlegOnPotTemp? row.distillData.dephlegOnPotTemp: 'No Data',
              filterable: true,
            },
            {
              Header: 'Dephleg On Setting',
              id: 'dephlegOnSetting',
              accessor: row => row.distillData.dephlegOnSetting? row.distillData.dephlegOnSetting: 'No Data',
              filterable: true,
            },
            {
              Header: 'Foreshots Start Time',
              id: 'foreshotsStartTime',
              accessor: row => row.distillData.foreshotsData? (new Date(row.distillData.foreshotsData.startTime)).toLocaleDateString() : 'No Data',
              filterable: true,
            },
            {
              Header: 'Foreshots # of Refluxing Plates',
              id: 'foreshotsNumberOfRefluxingPlates',
              accessor: row => row.distillData.foreshotsData? row.distillData.foreshotsData.numberOfRefluxingPlates: 'No Data',
              filterable: true,
            },
            {
              Header: 'Foreshots Dephleg Setting',
              id: 'foreshotsDephlegSetting',
              accessor: row => row.distillData.foreshotsData? row.distillData.foreshotsData.dephlegSetting: 'No Data',
              filterable: true,
            },
            {
              Header: 'Foreshots Head Temp',
              id: 'foreshotsHeadTemp',
              accessor: row => row.distillData.foreshotsData? row.distillData.foreshotsData.headTemp: 'No Data',
              filterable: true,
            },
            {
              Header: 'Foreshots Pot Temp',
              id: 'foreshotsPotTemp',
              accessor: row => row.distillData.foreshotsData? row.distillData.foreshotsData.potTemp: 'No Data',
              filterable: true,
            },
            {
              Header: 'Foreshots Gallons',
              id: 'foreshotsGallons',
              accessor: row => row.distillData.foreshotsGallons? row.distillData.foreshotsGallons: 'No Data',
              filterable: true,
            },
            {
              Header: 'Heads Start Time',
              id: 'headsStartTime',
              accessor: row => row.distillData.headsData? (new Date(row.distillData.headsData.startTime)).toLocaleDateString() : 'No Data',
              filterable: true,
            },
            {
              Header: 'Heads # of Refluxing Plates',
              id: 'headsNumberOfRefluxingPlates',
              accessor: row => row.distillData.headsData? row.distillData.headsData.numberOfRefluxingPlates: 'No Data',
              filterable: true,
            },
            {
              Header: 'Heads Dephleg Setting',
              id: 'headsDephlegSetting',
              accessor: row => row.distillData.headsData? row.distillData.headsData.dephlegSetting: 'No Data',
              filterable: true,
            },
            {
              Header: 'Heads Head Temp',
              id: 'headsHeadTemp',
              accessor: row => row.distillData.headsData? row.distillData.headsData.headTemp: 'No Data',
              filterable: true,
            },
            {
              Header: 'Heads Pot Temp',
              id: 'headsPotTemp',
              accessor: row => row.distillData.headsData? row.distillData.headsData.potTemp: 'No Data',
              filterable: true,
            },
            {
              Header: 'Heads Gallons',
              id: 'headsGallons',
              accessor: row => row.distillData.headsGallons? row.distillData.headsGallons: 'No Data',
              filterable: true,
            },
            {
              Header: 'Hearts Start Time',
              id: 'heartsStartTime',
              accessor: row => row.distillData.heartsData? (new Date(row.distillData.heartsData.startTime)).toLocaleDateString() : 'No Data',
              filterable: true,
            },
            {
              Header: 'Hearts # of Refluxing Plates',
              id: 'heartsNumberOfRefluxingPlates',
              accessor: row => row.distillData.heartsData? row.distillData.heartsData.numberOfRefluxingPlates: 'No Data',
              filterable: true,
            },
            {
              Header: 'Hearts Dephleg Setting',
              id: 'heartsDephlegSetting',
              accessor: row => row.distillData.heartsData? row.distillData.heartsData.dephlegSetting: 'No Data',
              filterable: true,
            },
            {
              Header: 'Hearts Head Temp',
              id: 'heartsHeadTemp',
              accessor: row => row.distillData.heartsData? row.distillData.heartsData.headTemp: 'No Data',
              filterable: true,
            },
            {
              Header: 'Hearts Pot Temp',
              id: 'heartsPotTemp',
              accessor: row => row.distillData.heartsData? row.distillData.heartsData.potTemp: 'No Data',
              filterable: true,
            },
            {
              Header: 'Hearts Gallons',
              id: 'heartsGallons',
              accessor: row => row.distillData.heartsData? row.distillData.heartsGallons: 'No Data',
              filterable: true,
            },
            {
              Header: 'Hearts Proof',
              id: 'heartsProof',
              accessor: row => row.distillData.heartsProof? row.distillData.heartsProof: 'No Data',
              filterable: true,
            },
            {
              Header: 'Tails Start Time',
              id: 'tailsStartTime',
              accessor: row => row.distillData.tailsData? (new Date(row.distillData.tailsData.startTime)).toLocaleDateString() : 'No Data',
              filterable: true,
            },
            {
              Header: 'Tails Head Temp',
              id: 'tailsHeadTemp',
              accessor: row => row.distillData.tailsData? row.distillData.tailsData.headTemp: 'No Data',
              filterable: true,
            },
            {
              Header: 'Tails Pot Temp',
              id: 'tailsPotTemp',
              accessor: row => row.distillData.tailsData? row.distillData.tailsData.potTemp: 'No Data',
              filterable: true,
            },
            {
              Header: 'Tails Gallons',
              id: 'tailsGallons',
              accessor: row => row.distillData.tailsData? row.distillData.tailsGallons: 'No Data',
              filterable: true,
            },
            {
              Header: 'Steam On',
              id: 'steamOn',
              accessor: row => row.distillData.steamOn? (new Date(row.distillData.steamOn)).toLocaleTimeString(): 'No Data',
              filterable: true,
            },
            {
              Header: 'Steam Off',
              id: 'steamOff',
              accessor: row => row.distillData.steamOff? (new Date(row.distillData.steamOff)).toLocaleTimeString(): 'No Data',
              filterable: true,
            },
            {
              Header: 'Total Time (hrs)',
              id: 'totalTimeHours',
              accessor: row => row.distillData.totalTimeHours? row.distillData.totalTimeHours: 'No Data',
              filterable: true,
            },
          ],
      []
    )

    // Create a function that will render our row sub components
    const renderRowSubComponent = React.useCallback(
      ({ row }) => (
        <>
          <Tabs>
            <div label="Mash Data">
              <MashTab row={row.original} reloadData={reloadData}/>
            </div>
            <div label="Ferment Data">
              <FermentTab row={row.original} reloadData={reloadData}/>
            </div>
            <div label="Distill Data">
              <DistillTab row={row.original} reloadData={reloadData}/>
            </div>
          </Tabs>
          
        </>
      ),
      [reloadData]
    )
  
    return (
      <div>
          <Table 
            columns={columns} 
            data={data} 
            hiddenColumns={['pumpDuration', 'dephlegOnPotTemp', 'dephlegOnSetting', 'foreshotsGallons', 'foreshotsStartTime', 'foreshotsNumberOfRefluxingPlates','foreshotsDephlegSetting','foreshotsHeadTemp','foreshotsPotTemp','headsStartTime','headsNumberOfRefluxingPlates','headsDephlegSetting','headsHeadTemp','headsPotTemp','headsGallons','heartsStartTime','heartsNumberOfRefluxingPlates','heartsDephlegSetting','heartsHeadTemp','heartsPotTemp','heartsGallons','tailsStartTime','tailsHeadTemp','tailsPotTemp','tailsGallons','heartsProof','steamOn','steamOff','totalTimeHours',]}
            renderRowSubComponent={renderRowSubComponent} />
      </div>
    )
}

  function TableLoading({ data, loading, reloadData }) {
    if (loading) {
      return (
            <p>Loading...</p>
      );
    }
  
    return (
    <div>
        <ProductionTable
            data={data}
            reloadData={reloadData}/>
    </div>
    );
}
 
export default TableLoading