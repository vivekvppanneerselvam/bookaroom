import React from 'react'
import moment from 'moment'
import ColumnCell from './ColumnCell'

const BookingFormTable = props => (
  <table className="table--booking">
    <thead>
      <tr className="table__row table__row--header">
        <th colSpan="2" className="table__cell--header table__cell--level header__heading header__heading--column">{moment(props.date).format('MMMM Do YYYY')}</th>
      </tr>
      <tr scope="col" className="table__row table__row--subheader">
        <th className="table__cell--header">Time</th>
        <th className="table__cell--header">Bookings</th>
      </tr>
    </thead>
   
    <tbody className="table__body--booking">
      <tr className="table__row--full">
        <th scope="row">00:00AM - 06:00AM (Early Morning)</th>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            start={0}
            hour={6}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">06:00AM - 12:00AM(Morning)</th>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            start={7}
            hour={12}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">12:00PM - 16:00PM(Noon)</th>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            start={13}
            hour={18}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">16:00PM - 24:00PM(Evening)</th>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            start={19}
            hour={24}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      {/* <tr className="table__row--full">
        <th scope="row">10am</th>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={10}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">11am</th>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={11}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">12pm</th>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={12}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">1pm</th>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={13}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">2pm</th>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={14}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">3pm</th>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={15}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">4pm</th>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={16}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">5pm</th>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={17}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">6pm</th>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={18}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">7pm</th>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={19}
            onShowBooking={props.onShowBooking}
          />
      </tr>
      <tr className="table__row--full">
        <th scope="row">8pm</th>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={20}
            onShowBooking={props.onShowBooking}
          />
      </tr> */}
    </tbody>
  </table>
)

export default BookingFormTable
