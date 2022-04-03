import React, { Fragment, useState, useEffect } from 'react'
import BookingFormTable from './BookingFormTable'
import Datetime from 'react-datetime'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Button from './Button'
import { formatTime, startTimeSelectOptions, endTimeSelectOptions, slotTimeSelectOptions } from '../helpers/bookingForm'
import { fetchInstitutes, getProviders } from '../api/rooms'


function BookingForm({ onMakeBooking, user, roomData, date, updateCalendar, onShowBooking, disableRecurring, onToggleRecurring }) {
  // Disable sunday (day 0) on the calendar as an booking option
  const valid = function (current) {
    return current.day() !== 0
  }

  const handleEndDate = (dateArray) => {
    let recurringEndDate = []
    dateArray.forEach(item => {
      recurringEndDate.push(parseInt(item))
    })
    return recurringEndDate
  }

  // Format the recurring data into an array
  const handleRecurringData = (type, date) => {
    let recurringData = []
    if (type !== "none") {
      recurringData = [date, type]
      recurringData[0][1] = recurringData[0][1] - 1
    } else {
      recurringData = []
    }
    return recurringData
  }

  // Array used for handleData function
  let dateArray = []

  // Update the current date in the application state
  const handleDate = event => {
    updateCalendar(moment(event)._i)
  }

  const getTimeBySlot = (value, type) => {

    if (type == "start") {
      if (value.includes("00.00am")) return "00:00"
      else if (value.includes("06.00am")) return "06:00"
      else if (value.includes("12:00pm")) return "12:00"
      else return "18:00"
    }
    if (type == "end") {
      if (value.includes("06.00am")) return "06:00"
      else if (value.includes("11:59am")) return "11:59"
      else if (value.includes("18:00pm")) return "18:00"
      else return "24:00"
    }

  }
  const [insOptions, setInsOptions] = useState([])
  const [provOptions, setProvOptions] = useState([])
  const [dropDown, setDropDown] = useState({
    institute:'',
    provider:"",
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
  },[])

  function dropDownChange(e){
    let id = e.target.id, value = e.target.value
    setDropDown(prev=>{
      prev[id] = value
      return({...prev})
    })
  }

  return (
    <Fragment>
      <div className="header__page">
        <h2 className="header__heading header__heading--sub">Level {roomData.floor} | {roomData.name}</h2>
      </div>
      <form className="" onSubmit={event => {
        event.preventDefault()
        // Extract date array from current date in state
        const dateArray = moment(date)
          .format('Y M D')
          .split(' ')
          .map(item => parseInt(item, 10))
        dateArray[1] = dateArray[1] - 1
        // Data from input
        const formData = event.target.elements
        const roomId = roomData._id
        // startDate data
        const startTime = formatTime(getTimeBySlot(formData.startTime.value, "start"))
        const startDate = [...dateArray, ...startTime]
        // endDate data
        const endTime = formatTime(getTimeBySlot(formData.startTime.value, "end"))
        const endDate = [...dateArray, ...endTime]
        // Booking specifics
        const businessUnit = formData.business.value
        let recurringEnd = handleEndDate(formData.recurringEndDate.value.split('-'))
        const recurringType = formData.recurring.value
        let recurringData = handleRecurringData(recurringType, recurringEnd)
        const purpose = formData.purpose.value
        const description = formData.description.value
        const specialtyDepC = formData.specialty.value
        let obj = insOptions.find((o, i) => {
          if (o.specialtyDepC === specialtyDepC) {
            return true; // stop searching
          }
        })
        const spectialyNdGroup = Object.keys(obj).length !== 0 ? obj.instituteGroupName +"|"+ obj.specialty:''
        const provId = formData.provider.value
        let obj1 = provOptions.find((o, i) => {
          if (o.provId === provId) {
            return true; // stop searching
          }
        })
        const provName = Object.keys(obj1).length !== 0 ?  obj['provName']: ''

          onMakeBooking({ startDate, endDate, businessUnit, purpose, roomId, recurringData })
      }}>
        <div className="row">
          <div className="col-md-4">
            <Datetime
              dateFormat="YYYY-MM-DD"
              timeFormat={false}
              input={false}
              utc={true}
              isValidDate={valid}
              onChange={event => handleDate(event._d)}
            />
          </div>
          <div className="col-md-4">
            <BookingFormTable roomData={roomData} date={date} onShowBooking={onShowBooking} />
          </div>
          <div className="col-md-4" style={{ background: "lightgray" }}>
            <h3 className="header__heading header__heading--column">Make a Booking</h3>
            <div className="form__group">
              <span>Start Date: {moment(date).format('MMMM Do YYYY')}</span>
              <label className="form__label form__label--booking">
                {'Slot time'}
                <select name="startTime" className="form__input form__input--select">
                  {slotTimeSelectOptions.map(option => {
                    return option
                  })}
                </select>
              </label>
            </div>
            {/* <div className="form__group">
            <label className="form__label form__label--booking">
              {'End time'}
              <select name="endTime" className="form__input form__input--select">
                {endTimeSelectOptions.map(option => {
                  return option
                })}
              </select>
            </label>
          </div> */}
            <div className="form__group">
              <label className="form__label form__label--booking">
                {'Recurring'}
                <span>
                  <select name="recurring" defaultValue="none" onChange={(event) => onToggleRecurring(event.target.value)} className="form__input form__input--select">
                    <option value="none">Non recurring</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </span>
              </label>
            </div>
            <label className="form__label form__label--booking">
              {'Recurring end date'}
              <input type="date" name="recurringEndDate" disabled={disableRecurring} className="form__input--date" />
            </label>
            {/* <div className="form__group">
              <label className="form__label form__label--booking">
                {'Purpose'}
                <select name="purpose" defaultValue="Scheduled class" className="form__input form__input--select">
                  <option value="Scheduled Class">Scheduled class</option>
                  <option value="Special Event">Special event</option>
                  <option value="Ad-hoc Event">Ad-hoc event</option>
                </select>
              </label>
            </div> */}
            <div className="form__group">
              <label className="form__label form__label--booking">{'Select Speciality'}</label>
              <select id="specialty" name={'specialty'} value={dropDown.specialty} onChange={dropDownChange} >
                  <option value="">Select</option>
                  {insOptions.map(item => {
                    return <option value={item.specialtyDepC} > {item.instituteGroupName} | {item.specialty}</option>
                  })
                  }
                </select>
            </div>

            <div className="form__group">
              <label className="form__label form__label--booking">{'Select Provider'}</label>
              <select value={dropDown.provider} id="provider" name={'provider'} onChange={dropDownChange} >
                  <option value="">Select</option>
                  {provOptions.map(item => {
                    if (item.specialtyDepC == dropDown.specialty )
                      return <option value={item.provId} > {item.provName} | {item.provType}</option>
                  })
                  }
                </select>
            </div>
{/* 
            <div className="form__group">
              <label className="form__label form__label--booking">
                {'Select Suite Type'}
                <select name="business" defaultValue="General Suite With AC" className="form__input form__input--select">
                  <option value="General Suite With AC">General Suite With AC</option>
                  <option value="ICU">ICU</option>
                  <option value="Surgical">Surgical</option>
                  <option value="General Suite With NON-AC">General Suite With NON-AC</option>
                </select>
              </label>
            </div> */}
            <div className="form__group">
              <label className="form__label form__label--booking">
                {'Description'}
                <textarea type="textarea" name="description" className="form__input--textarea"></textarea>
              </label>
            </div>
            <div className="form__group--button">
              <Button className="button button__form--booking" text={'Submit'} />
              <Link to="/bookings" className="button button--alternative button__form--booking" >View availability</Link>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  )
}

export default BookingForm
