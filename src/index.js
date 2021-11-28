import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter as Router,
   Routes, 
   Route, 
   Navigate,
   Link,
   Outlet,
   useParams,
   NavLink,
   useNavigate,
   useLocation} from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/myapps" element={<Navigate replace to="/learn" />} />
      <Route path="/learn" element={<Learn />} >
        <Route path="courses" element={<Courses />} >
          <Route path=":courseid" element={<CourseId />} />
        </Route>
        <Route path="bundles" element={<Bundles />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

function Learn(){
  return (
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here</h4>
      <Link className="btn btn-success" to="/learn/courses">courses</Link> | 
      <Link className="btn btn-primary" to="/learn/bundles">bundle</Link>
      <Outlet />
    </div>
  );
}

function Courses(){
  const courseList = ["React", "Angular", "Vue", "NodeJs"]
  const randomCourseName = courseList[Math.floor(Math.random() * courseList.length)];
  return (
    <div>
      <h1>Course List</h1>
      <h4>Courses Card</h4>

      <NavLink to={`/learn/courses/${randomCourseName}`} style={({isActive})=>{
        return isActive ? {backgroundColor:'yellow'} : {backgroundColor:'pink'}
      }}>
        {randomCourseName}
      </NavLink>

      <NavLink className="btn btn-light" to={`/learn/courses/tests`} >test</NavLink>


      <Outlet />
    </div>
  );
}


function CourseId(){
  const navigate = useNavigate();
  const {courseid} = useParams();
  return (
    <div>
      <h1>URL Params is : _____{courseid}</h1>
      <button 
      onClick={()=>{
       navigate("/dashboard", {state: "399"}) 
      }}
      className="btn btn-warning">Price</button>
    </div>
  );
}

function Bundles(){
  return (
    <div>
      <h1>BUndle Route</h1>
    </div>
  );
}

function Home(){
  return (
    <div>
      <h1>Home Route</h1>
    </div>
  );
}

function Dashboard(){
  const location = useLocation()
  return (
    <div>
      <h1>Info that I got here is {location.state}</h1>
    </div>
  );
}

reportWebVitals();
