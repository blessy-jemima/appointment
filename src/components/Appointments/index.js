import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    initialList: [],
    title: '',
    appointmentDate: '',
    isStarred: false,
    isStarChange: false,
  }

  addAppointments = event => {
    event.preventDefault()
    const {title, appointmentDate} = this.state
    const inputDate = format(new Date(appointmentDate), 'dd MMMM yyyy,EEEE')

    const newObject = {
      id: uuidv4(),
      title,
      appointmentDate: inputDate,
      isStarred: false,
      isStarChange: false,
    }
    this.setState(prevState => ({
      initialList: [...prevState.initialList, newObject],
      title: '',
      appointmentDate: '',
    }))
  }

  titleChange = event => {
    this.setState({title: event.target.value})
  }

  dateChange = event => {
    this.setState({appointmentDate: event.target.value})
  }

  starChange = () => {
    this.setState(prevState => ({isStarChange: !prevState.isStarChange}))
  }

  isFav = id => {
    this.setState(prevState => ({
      initialList: prevState.initialList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  render() {
    const {title, appointmentDate, initialList, isStarChange} = this.state
    const starClassName = isStarChange ? 'starred-button' : ''
    const filteredList = initialList.filter(each => each.isStarred === true)
    return (
      <div className="app-container">
        <div className="card-container">
          <div className="input-container">
            <form onSubmit={this.addAppointments} className="form-container">
              <h1 className="app-heading">Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                value={title}
                id="title"
                onChange={this.titleChange}
                className="input"
                placeholder="Title"
              />
              <label htmlFor="date-input" className="label">
                DATE
              </label>
              <input
                value={appointmentDate}
                id="date-input"
                type="date"
                onChange={this.dateChange}
                className="input"
                placeholder="dd/mm/yyyy"
              />
              <br />
              <button type="submit" className="submit-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
              alt="appointments"
              className="app-image"
            />
          </div>
          <hr className="separator" />
          <div className="appointment-container">
            <div className="appointment-heading-container">
              <div>
                <h1 className="appointment-heading">Appointments</h1>
              </div>
              <div>
                <button
                  type="button"
                  className={`star-button ${starClassName}`}
                  onClick={this.starChange}
                >
                  Starred
                </button>
              </div>
            </div>
            <ul className="appointment-list-container">
              {isStarChange
                ? filteredList.map(each => (
                    <AppointmentItem
                      key={each.id}
                      appointmentDetails={each}
                      isFav={this.isFav}
                    />
                  ))
                : initialList.map(each => (
                    <AppointmentItem
                      key={each.id}
                      appointmentDetails={each}
                      isFav={this.isFav}
                    />
                  ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
