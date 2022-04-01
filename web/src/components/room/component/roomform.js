import React, { useState, useEffect } from 'react'
import { editRoom, addRoom, fetchLoction } from '../../../api/rooms'
// import Select from 'react-select'

function RoomForm(props) {
    const [state, setState] = useState({
        _id: "",
        no: "",
        name: "",
        floor: "",
        wingName: "",
        capacity: "",
        assets: {
            ac: false
        }
    })

    const [locOptions, setLocOptions] = useState([])

    useEffect(() => {
        console.log("haha", props.isCreate, props.defaults)
        if (props.isCreate !== undefined) {
            if (!props.isCreate) {
                console.log("haha", props.isCreate, props.defaults)
                setState(props.defaults)
            }
        }
        fetchLoction().then(resp => {
            setLocOptions(resp)
        }).catch(error => {
            console.error('Error loading location data', error)
        })

    }, [])

    function onChangeHandler(e) {
        let key = e.target.id, value = e.target.value
        setState(prevState => {
            prevState[key] = value
            return ({ ...prevState })
        })
    }

    function dropDownChange(event) {
        let value = event.target.value
        let obj = locOptions.find((o, i) => {
            if (o.locId === value) {                   
                return true; // stop searching
            }
        })
        setState(prev => {
            prev.floor = value
            prev.wingName = Object.keys(obj).length !== 0 ? obj['suite']:''
            return ({ ...prev })
        })
    }

  

    function onSaveHandler() {
        if (!props.isCreate) {
            editRoom(state)
        } else {
            addRoom(state)
        }
    }
    return (
        <div className='container'>
            <br />
            <div className={'form-group row'}>
                <label className={'col-sm-4 col-form-label'} style={{ textAlign: 'end' }}>Room No</label>
                <div className={'col-md-4'}>
                    <input type="text" className="form-control rounded-0" id={'no'} value={state.no} maxLength={10} onChange={(e) => {
                        if (isNaN(Number(e.target.value))) {
                            return;
                        } else onChangeHandler(e)
                    }} />
                </div>
            </div>
            <div className={'form-group row'}>
                <label className={'col-sm-4 col-form-label'} style={{ textAlign: 'end' }}>Room Name</label>
                <div className={'col-md-4'}>
                    <input type="text" id={'name'} value={state.name} className={'form-control rounded-0'} onChange={(e) => onChangeHandler(e)} />
                </div>
            </div><br />

            <div className={'form-group row'}>
                <label className={'col-sm-4 col-form-label'} style={{ textAlign: 'end' }}>Floor / Location </label>
                <div className={'col-md-4'}>
                    <select value={state.floor} onChange={dropDownChange} >
                        <option value=""></option>
                        {
                            locOptions.map(item => {
                                return <option id={item.locId} value={item.locId} > {item.locName} | {item.suite}</option>
                            })
                        }
                        </select>
                    {/* <input type="text" className="form-control rounded-0" id={'floor'} value={state.floor} maxLength={10} onChange={(e) => {
                        if (isNaN(Number(e.target.value))) {
                            return;
                        } else onChangeHandler(e)
                    }} /> */}
                </div>
            </div>
            <div className={'form-group row'}>
                <label className={'col-sm-4 col-form-label'} style={{ textAlign: 'end' }}>Wing Name/ Suite#</label>
                <div className={'col-md-4'}>
                    <input type="text" id={'wingName'} disabled value={state.wingName} className={'form-control rounded-0'} onChange={(e) => onChangeHandler(e)} />
                </div>
            </div>
            <div className={'form-group row'}>
                <label className={'col-sm-4 col-form-label'} style={{ textAlign: 'end' }}>Capacity</label>
                <div className={'col-md-4'}>
                    <input type="text" className="form-control rounded-0" id={'capacity'} value={state.capacity} maxLength={10} onChange={(e) => {
                        if (isNaN(Number(e.target.value))) {
                            return;
                        } else onChangeHandler(e)
                    }} />
                </div>
            </div>
            {/* <div className={'form-group row'}>
                <label className={'col-sm-4 col-form-label'} style={{ textAlign: 'end' }}>Assets</label>
                <div className={'col-md-4'}>
                    <label for="ac"> AC</label>&nbsp;
                    <input type="checkbox" id="ac" name="ac" value="ac" />
                </div>
            </div> */}

            <button className={'btn btn-lg btn-primary rounded-0'} onClick={() => onSaveHandler()}>Save</button>
        </div>
    )
}

export default RoomForm