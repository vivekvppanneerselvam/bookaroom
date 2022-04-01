import React, { useState, useEffect } from 'react'
import Button from './Button'
import moment from 'moment'
import { formatTime, startTimeSelectOptions, endTimeSelectOptions } from '../helpers/bookingForm'
import { fetchLoction } from '../api/rooms'

function FilterElement({
  onSetFloorParam,
  onToggleFeature,
  onToggleCapacity,
  onSetAvailabilityParam,
  floorParam,
  filterParams,
  capacityParams,
  availabilityParam,
  date
}) {

  const [locOptions, setLocOptions] = useState([])

  useEffect(() => {
    fetchLoction().then(resp => {
      setLocOptions(resp)
    }).catch(error => {
      console.error('Error loading location data', error)
    })
  }, [])

  return (
    <div className="sidebar__box--filter filter">
      <h3 className="header__heading header__heading--sidebar">Filter</h3>
      <form className="form form--filter">
        <h4 className="form__heading form__heading--filter">Level</h4>
        <div className="form__group" onChange={(event) => onSetFloorParam(event.target.value)}>

          {locOptions.map(item =>  <div className="form_group">
            <input type="radio" value={item.locId} name="floor-select" className="form__input--radio" checked={floorParam === item.locId ? true : false} />
            <label for={item.locName} className="form__label form__label--inline"> {item.locName} | {item.suite}</label>
          </div>)}
          <div className="form_group">
            <input type="radio" value="8" name="floor-select" className="form__input--radio" checked={floorParam === '8' ? true : false} />
            <label for="floor8" className="form__label form__label--inline">Level 8</label>
          </div>
          <div className="form_group">
            <input type="radio" value="13" name="floor-select" className="form__input--radio" checked={floorParam === '13' ? true : false} />
            <label for="floor13" className="form__label form__label--inline">Level 13</label>
          </div>
          <div className="form_group">
            <input type="radio" value="all" name="floor-select" className="form__input--radio" checked={floorParam === 'all' ? true : false} />
            <label for="all" className="form__label form__label--inline">All Levels</label>
          </div>
        </div>
       
        <h4 className="form__heading form__heading--filter">Availability</h4>
        <div onChange={(event) => onSetAvailabilityParam(event.target.value)} >
          <div className="form_group">
            <input type="radio" id="fullyAvailable" value="fullyAvail" name="availability" className="form__input--radio" checked={availabilityParam === 'fullyAvail' ? true : false} />
            <label for="fullyAvailable" className="form__label form__label--inline">Fully Available</label>
          </div>
          <div className="form_group">
            <input type="radio" id="partialAvailable" value="partAvail" name="availability" className="form__input--radio" checked={availabilityParam === 'partAvail' ? true : false} />
            <label for="partialAvailable" className="form__label form__label--inline">Partially Available</label>
          </div>
          <div className="form_group">
            <input type="radio" id="fullyBooked" value="fullBooked" name="availability" className="form__input--radio" checked={availabilityParam === 'fullBooked' ? true : false} />
            <label for="fullyBooked" className="form__label form__label--inline">Fully Booked</label>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FilterElement