import React, { useState, useEffect } from 'react'

import { AgGridReact } from '@ag-grid-community/react'
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css'
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css'

import Modal from '../../components/modal'
import Confirmation from '../../components/confirmation'
import moment, { duration } from 'moment'
import { listRooms, deleteRoom } from '../../api/rooms'


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
            { headerName: "Start Date", field: "bookingStart", width: 150, cellRendererFramework: clickableField },
            { headerName: "End Date", field: "bookingEnd", width: 150, cellRendererFramework: clickableField },
            { headerName: "Room Name", field: "name", width: 150 },
            { headerName: "Location", field: "floor", width: 150 },
            { headerName: "Suite#", field: "wingName", width: 150 },
            { headerName: "Availability", field: "availability", width: 150 },
            { headerName: "Session", field: "session", width: 150, cellRendererFramework: clickableField },
            { headerName: "Duration", field: "duration", width: 150 },
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
            console.log(data.availability)
            if (data.availability !== undefined) {
                if (data.availability !== 'Available') {
                    //if (data.availability !== 'Available')
                    return <button className={'btn btn-sm btn-primary rounded-0'} onClick={() => { editClickHandler(data) }}><i className={'fa fa-edit'}></i></button>
                } else {
                    return <span></span>
                }
            }
            return <button className={'btn btn-sm btn-primary rounded-0'} onClick={() => { editClickHandler(data) }}><i className={'fa fa-edit'}></i></button>
        } else if (colDef.field === "delete") {
            if (data.availability !== undefined) {
                if (data.availability !== 'Available') {
                    return <button className={'btn btn-sm btn-secondary rounded-0'} onClick={() => { deleteClickHandler(data) }}><i className={'fa fa-trash'}></i></button>
                } else {
                    return <span></span>
                }
            }
            return <button className={'btn btn-sm btn-secondary rounded-0'} onClick={() => { deleteClickHandler(data) }}><i className={'fa fa-trash'}></i></button>
        } else if (colDef.field === "session") {
            console.log(moment(data.bookingStart).format('hA') )
            if (data.duration !== undefined) {
                if (data.duration > 12) {
                    return  <span>Both Session</span>
                } else if (moment(data.bookingStart).format('hA').includes('PM')) {
                    return <span>PM</span>
                } else {
                    return  <span>AM</span>
                }
            }
            return <span></span>
        } else {
            if (colDef.field === 'bookingStart') {
                return <span>{moment(data.bookingStart).format('MMMM Do YYYY')}</span>
            } else {
                return <span>{moment(data.bookingEnd).format('MMMM Do YYYY')}</span>
            }
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
            let arr = []
            for (var i = 0; i < rooms.length; i++) {
                console.log("arr", rooms)
                let bookingArr = rooms[i].bookings


                console.log(bookingArr)
                let obj = {};

                if (bookingArr.length > 0) {
                    for (var j = 0; j < bookingArr.length; j++) {
                        obj = bookingArr[j]
                        console.log(obj)
                        obj['floor'] = rooms[i].floor
                        obj['name'] = rooms[i].name
                        obj['no'] = rooms[i].no
                        obj['wingName'] = rooms[i].wingName
                        arr.push(obj);
                    }
                } else {
                    obj['floor'] = rooms[i].floor
                    obj['name'] = rooms[i].name
                    obj['no'] = rooms[i].no
                    obj['wingName'] = rooms[i].wingName
                    arr.push(obj);
                }
                if (bookingArr.length === 0) {
                    obj['availability'] = 'Available'
                } else if (bookingArr.length > 0) {
                    obj['availability'] = 'Partly Available'
                } else if (!bookingArr.length > 0 && !bookingArr.length === 0) {
                    obj['availability'] = 'Unavailable'
                }
            }
            console.log("arr", arr)
            setRowData(arr)
        }).catch(error => {
            console.error('Error loading room data', error)
        })
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
                alert("Successfully deleted room " + data._id);
                setModalDeleteFlg(false)
            }).catch(error => {
                console.error('Error deleting room data', error)
            })
            alert("Error deleting room " + data._id);
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