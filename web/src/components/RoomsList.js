import React, { useState, useEffect } from 'react'
import RoomRow from './RoomRow'
import { roomSorter } from '../helpers/sorter'
import { fetchLoction } from '../api/rooms'

const RoomsList = props => {
  const [locOptions, setLocOptions] = useState([])

  useEffect(() => {
    fetchLoction().then(resp => {
      setLocOptions(resp)
    }).catch(error => {
      console.error('Error loading location data', error)
    })
  }, [])

  function fetchRooms(locId) {
    console.log("hehehe", props.rooms)
   
     return props.rooms &&
      roomSorter(props.rooms, locId).map(room => (
        <RoomRow
          key={room._id}
          room={room}
          bookings={room.bookings}
          date={props.date === null ? new Date() : props.date}
          onShowBooking={props.onShowBooking}
          onSetRoom={props.onSetRoom}
        />
      ))
    
  }

  function arrayElements() {

    return locOptions.map(item => {
      return <table className="table">
        <tr className="table__row table__row--header">
          <th scope="colgroup" colSpan="15" className="table__cell--header table__cell--level table__cell--align-left">
            {item.locName} | {item.suite}
          </th>
        </tr>
        <tr className="table__row table__row--subheader">
          <th scope="col" className="table__cell--header table__cell--align-left">Room</th>
          <th scope="col" className="table__cell--header">AM (00:00AM - 06:00AM)</th>
          <th scope="col" className="table__cell--header">AM (06:00AM - 12:00AM)</th>
          <th scope="col" className="table__cell--header">PM (12:00PM - 16:00PM)</th>
          <th scope="col" className="table__cell--header">PM (16:00PM - 24:00PM)</th>
        </tr>
        <tbody className="table__body">
          {fetchRooms(item.locId)}
        </tbody>
      </table>
    }
    )
  }

  return (
    <div>
    {arrayElements()}
    <table className="table">
      
      <tr className="table__row table__row--header">
        <th scope="colgroup" colSpan="15" className="table__cell--header table__cell--level table__cell--align-left">
          Level Eight
        </th>
      </tr>
      <tr className="table__row table__row--subheader">
        <th scope="col" className="table__cell--header table__cell--align-left">Room</th>
        <th scope="col" className="table__cell--header">AM (00:00AM - 06:00AM)</th>
        <th scope="col" className="table__cell--header">AM (06:00AM - 12:00AM)</th>
        <th scope="col" className="table__cell--header">PM (12:00PM - 16:00PM)</th>
        <th scope="col" className="table__cell--header">PM (16:00PM - 24:00PM)</th>
      </tr>
      <tbody className="table__body">
        {props.rooms &&
          roomSorter(props.rooms, '8').map(room => (
            <RoomRow
              key={room._id}
              room={room}
              bookings={room.bookings}
              date={props.date === null ? new Date() : props.date}
              onShowBooking={props.onShowBooking}
              onSetRoom={props.onSetRoom}
            />
          ))}
      </tbody>
      <tr className="table__row table__row--header">
        <th scope="colgroup" colSpan="15" className="table__cell--header table__cell--level table__cell--align-left">
          Level Thirteen
        </th>
      </tr>
      <tr className="table__row table__row--subheader">
        <th scope="col" className="table__cell--header table__cell--width table__cell--align-left"> Room</th>
        <th scope="col" className="table__cell--header">AM (00:00AM - 06:00AM)</th>
        <th scope="col" className="table__cell--header">AM (06:00AM - 12:00AM)</th>
        <th scope="col" className="table__cell--header">PM (12:00PM - 16:00PM)</th>
        <th scope="col" className="table__cell--header"> PM (16:00PM - 24:00PM)</th>
      </tr>
      <tbody className="table__body">
        {props.rooms &&
          roomSorter(props.rooms, '13').map(room => (
            <RoomRow
              key={room._id}
              room={room}
              bookings={room.bookings}
              date={props.date === null ? new Date() : props.date}
              onShowBooking={props.onShowBooking}
              onSetRoom={props.onSetRoom}
            />
          ))
        }
      </tbody>
    </table>
    </div>
  )
}

export default RoomsList
