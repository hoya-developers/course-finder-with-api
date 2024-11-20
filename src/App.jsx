import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Course from "./Course";

function App() {
  const [unfilteredCourses, setUnfilteredCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyAvailableCourses, setShowOnlyAvailableCourses] =
    useState(false);

  useEffect(() => {
    const results = unfilteredCourses.filter((course) => {
      if (showOnlyAvailableCourses && course.seatsAvailable === 0) {
        return false;
      }

      if (searchTerm === "") {
        return true;
      }

      if (course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }

      return false;
    });
    setCourses(results);
  }, [searchTerm, showOnlyAvailableCourses, unfilteredCourses]);



  const fetchCourses = async () => {
    const response = await fetch("https://www.hoyadevelopers.com/api/getCourseData", {
      headers: {
        "Content-Type": "text/plain",
      }
    })

    const data = await response.json();
    setUnfilteredCourses(data);
  }

  useEffect(() => {
    fetchCourses();
  }
  , []);

  return (
    <div>
      <h1>Georgetown Course Catalog</h1>
      <h3>Showing {courses.length} courses</h3>
      <div className="options">
        <input
          type="text"
          placeholder="Search for a course"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <label>
          <input
            type="checkbox"
            onChange={(event) => {
              setShowOnlyAvailableCourses(event.target.checked);
            }}
          />
          Show only available courses
        </label>
      </div>
      <div className="courses">
        {courses.map((course) => (
          <Course
            courseNumber={course.courseNumber}
            courseTitle={course.courseTitle}
            subject={course.subject}
            seatsAvailable={course.seatsAvailable}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
