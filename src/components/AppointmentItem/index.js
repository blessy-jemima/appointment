import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, isFav} = props
  const {title, appointmentDate, isStarred, id} = appointmentDetails

  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const isStarredClicked = () => {
    isFav(id)
  }
  return (
    <li className="list-container">
      <div>
        <p className="list-title">{title}</p>
        <p className="list-para">Date: {appointmentDate}</p>
      </div>
      <div>
        <button
          className="list-button"
          type="button"
          onClick={isStarredClicked}
          data-testid="star"
        >
          <img src={starImg} alt="star" className="star-image" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
