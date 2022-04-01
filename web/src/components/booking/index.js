import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

function Booking(props){
    const [state, setState] =  useState({
        startDate:"",
        endDate:"",
        startTime:"",
        endTime
    })

    return(
        <div><br />
        <div className="jumbotron">
            <div className="container">
            <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)}/>
                 <p>You have selected <strong>{this.state.name}</strong> whose id is <strong>{this.state.id}</strong></p>

                start date 
                end date
                check avail room

                slot time 
                recurring 
                recurring end date


                speciality 
                provider 
                location 
                room type
                description 
                submit


               
            </div >
        </div >
        </div>
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