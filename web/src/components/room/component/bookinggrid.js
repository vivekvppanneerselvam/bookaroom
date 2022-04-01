import React, { useState, useEffect } from 'react'

import { AgGridReact } from '@ag-grid-community/react'
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css'
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css'

import Modal from '../../../components/modal'
import Confirmation from '../../../components/confirmation'
import RoomForm from './roomform'
import { listRooms, deleteRoom } from '../../../api/rooms'


function BookingGrid(props) {
    const [gridApi, setGridApi] = useState(null)
    const [rowData, setRowData] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalDeleteFlg, setModalDeleteFlg] = useState(false)
    const [popupData, setPopupData] = useState(null)
    const [isCreate, setIsCreate] = useState(false)
    let gridOptions = {
        modules: AllCommunityModules,
        columnDefs: [
            { headerName: 'id', field: '_id', width: 200, filter: false },
            { headerName: "Room No", field: "no", width: 100 },
            { headerName: "Room Name", field: "name", width: 150 },
            { headerName: "Location", field: "floor", width: 150 },
            { headerName: "wing name/ Suite#", field: "wingName", width: 100 },
            { headerName: "Start Date", field: "bookingStart", width: 150 },        
            { headerName: "End Date", field: "bookingEnd", width: 150 },     
            { headerName: "", field: "edit", filter: false, width: 70, cellRendererFramework: clickableField },
            { headerName: "", field: "delete", filter: false, width: 70, cellRendererFramework: clickableField }
        ],
        rowSelection: 'single',
        rowData: [],
        defaultColDef: {
            editable: false,
            resizable: true,
            filter: true
        },
        context: { componentParent: this }
    }

    function clickableField(gridProps) {
        let { data, colDef } = gridProps
        if (colDef.field === "edit") {
            return <button className={'btn btn-sm btn-primary rounded-0'} onClick={() => { editClickHandler(data) }}><i className={'fa fa-edit'}></i></button>
        } else if (colDef.field === "delete") {
            return <button className={'btn btn-sm btn-secondary rounded-0'} onClick={() => { deleteClickHandler(data) }}><i className={'fa fa-trash'}></i></button>
        }
    }
    const onGridReady = (params) => {
        const { api, columnApi } = params
        api.sizeColumnsToFit();
        api.refreshCells()
        setGridApi(api);
    }
    useEffect(() => {
        listRooms().then(rooms => {
            setRowData(rooms.map(item => {
                let  obj = item.bookings.map(item => item)
                if(Object.keys(obj).length !== 0 ){
                    obj['floor'] = item.floor
                    obj['name'] = item.name
                    obj['no'] = item.no
                    obj['wingName'] = item.wingName
                    return obj
                }
            }))           
        }).catch(error => {
            console.error('Error loading room data', error)        })
    }, [])  


    const editClickHandler = (data) => {
        setIsCreate(false)
        setIsModalOpen(!isModalOpen)
        setPopupData(data)
    }
    const deleteClickHandler = (data) => {
        setPopupData(data)
        setModalDeleteFlg(true)
    }
    function closeHandler() {
        setIsModalOpen(false)
        setModalDeleteFlg(false)
    }

    function confirmationHandler(value, data) {
        if (value === 'yes') {
            deleteRoom(data._id).then(rooms => {
                        alert("Successfully deleted room "+ data._id)  ;
                        setModalDeleteFlg(false)
            }).catch(error => {                
                console.error('Error deleting room data', error)        })
                alert("Error deleting room "+ data._id)  ;
                setModalDeleteFlg(false)
        } else {
            setModalDeleteFlg(false)
        }
    }
    return (
        <div onClick={e => e.stopPropagation()}>
            {isModalOpen && <Modal
                contentStyle={{ height: '65%' }}
                showModal={isModalOpen}
                handleClose={(e) => {
                    closeHandler()
                }}>
                <RoomForm type={''} isCreate={false} defaults={popupData} />
            </Modal>}
            {modalDeleteFlg && <Confirmation
                showModal={modalDeleteFlg}
                handleClose={(e) => closeHandler()}
                handleConfirmationMessage={(e) => confirmationHandler(e, popupData)}
                title={'confirmation'}
            > <span>Are you sure you want to delete the record</span>

            </Confirmation>}
            <div className="ag-theme-balham" style={{ height: '450px' }}>
                <AgGridReact
                    modules={AllCommunityModules}
                    columnDefs={gridOptions.columnDefs}
                    rowData={rowData}
                    onGridReady={onGridReady}
                    pagination={true}
                    context={gridOptions.context}
                    defaultColDef={gridOptions.defaultColDef}
                    gridOptions={gridOptions}
                    rowSelection={gridOptions.rowSelection}
                    floatingFilter={true}                >
                </AgGridReact>
            </div>
        </div>
    )
}

export default BookingGrid