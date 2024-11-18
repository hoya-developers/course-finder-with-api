import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import courseData from "./courseData.json";
import Course from "./Course";

function App() {
  const [courses, setCourses] = useState(courseData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyAvailableCourses, setShowOnlyAvailableCourses] =
    useState(false);

  useEffect(() => {
    const results = courseData.filter((course) => {
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
  }, [searchTerm, showOnlyAvailableCourses]);

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
