import React, { useState, useEffect } from 'react'

import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import { fetchInstitutes, getProviders, fetchLoction } from '../../api/rooms'
import BookingGrid from './bookinggrid'


function Booking(props) {
  const [state, setState] = useState({
    startDate: "",
    endDate: "",
    floor: "",
    endTime: "",
  })

  const [insOptions, setInsOptions] = useState([])
  const [provOptions, setProvOptions] = useState([])
  const [locOptions, setLocOptions] = useState([])

  const [dropDown, setDropDown] = useState({
    institute: '',
    provider: "",
  })
  useEffect(() => {
    fetchInstitutes().then(resp => {
      setInsOptions(resp)
    }).catch(error => {
      console.error('Error loading location data', error)
    })

    getProviders().then(resp => {
      setProvOptions(resp)
    }).catch(error => {
      console.error('Error loading location data', error)
    })

    fetchLoction().then(resp => {
      setLocOptions(resp)
    }).catch(error => {
      console.error('Error loading location data', error)
    })
  }, [])

  function dropDownChange(e) {
    let id = e.target.id, value = e.target.value
    setDropDown(prev => {
      prev[id] = value
      return ({ ...prev })
    })
  }

  function onChangeHandler(e) {
    let id = e.target.id, value = e.target.value
  }


  return (
    <div><br />
      <div className="row">
        <div className="col-md-4">
          <div className="form__group">
            <label className="form__label form__label--booking">{'Start Date'}</label>
            <input type="date" name="startDate" className="" />
          </div>
          <div className="form__group">
            <label className="form__label form__label--booking">{'End Date'}</label>
            <input type="date" name="endDate" className="" />
          </div>
          <div className="form__group">
            <label className="form__label form__label--booking">{'Location'}</label>
            <select value={state.floor} onChange={dropDownChange} >  <option value=""></option>
              {locOptions.map(item => {
                return <option id={item.locId} value={item.locId} > {item.locName} | {item.suite}</option>
              })
              }
            </select>
          </div>
          <div className="from__group">
            <label className={'form__label form__label--booking'}>Wing Name/ Suite#</label>
            <input type="text" id={'wingName'} disabled value={state.wingName} onChange={(e) => onChangeHandler(e)} />
          </div>
          <div className="form__group">
            <label className="form__label form__label--booking">{'Room'}</label>
            <input type="date" name="startDate" className="" />
          </div>
          <div className="form__group">
            <label className="form__label form__label--booking">
              {'Select Speciality'}
            </label>
            <select id="specialty" name={'specialty'} value={dropDown.specialty} onChange={dropDownChange} >
              <option value="">Select</option>
              {insOptions.map(item => {
                return <option value={item.specialtyDepC} > {item.instituteGroupName} | {item.specialty}</option>
              })
              }
            </select>
          </div>
          <div className="form__group">
            <label className="form__label form__label--booking">
              {'Select Provider'}
            </label>
            <select value={dropDown.provider} id="provider" name={'provider'} onChange={dropDownChange} >
              <option value="">Select</option>
              {provOptions.map(item => {
                if (item.specialtyDepC == dropDown.specialty)
                  return <option value={item.provId} > {item.provName} | {item.provType}</option>
              })
              }
            </select>
          </div>
          <br/>
          <button className={'btn btn-lg btn-primary'} > Apply Filter  </button>
          <button className={'btn btn-lg btn-secondary'}>Clear</button> 
          <button className={'btn btn-lg btn-danger'} disabled> Make a Booking </button>
        </div>
        <div className="col-md-8">
          <BookingGrid />
        </div>
      </div >
    </div >

  )
}

export default Booking


class MyDTPicker extends React.Component {
  render() {
    return <Datetime renderInput={this.renderInput} />;
  }
  renderInput(props, openCalendar, closeCalendar) {
    function clear() {
      props.onChange({ target: { value: "" } });
    }
    return (
      <div>
        <input {...props} />
        <button onClick={openCalendar}>open calendar</button>
        <button onClick={closeCalendar}>close calendar</button>
        <button onClick={clear}>clear</button>
      </div>
    );
  }
}