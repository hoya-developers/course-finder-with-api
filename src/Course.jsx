function Course({courseNumber, courseTitle, subject, seatsAvailable}) {
    return (
        <div className="course">
            <h2>{courseNumber}</h2>
            <h3>{courseTitle}</h3>
            <h4>{subject}</h4>
            <p>Seats Available: {seatsAvailable}</p>    
        </div>
    )
}

export default Course;