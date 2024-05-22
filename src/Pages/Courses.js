//Courses.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authorisation/AuthContext';

const Courses = ({ data }) => {
    const { auth, setTempCourse, registeredCourses, setRegisteredCourses } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value.length >= 3) {
            searchCourses(event.target.value);
        } else {
            setSearchResults([]);
        }
    };

    const searchCourses = (searchTerm) => {
        const filteredCourses = data.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredCourses);
    };

    const filteredCourses = searchTerm.length >= 3 ? searchResults : data;

    const handleRegisterClick = (courseId) => {
        if (!auth.isAuth) {
            const course = data.find((item) => item.id === courseId);
            setTempCourse(course); 
            navigate('/auth');
        } else {
            registerCourse(courseId);
        }
    };

    const registerCourse = (courseId) => {
        const course = data.find((item) => item.id === courseId);
        const userCourses = registeredCourses[auth.user.name] || [];
        const isAlreadyRegistered = userCourses.some(c => c.id === courseId);
        if (isAlreadyRegistered) {
            alert('Ви вже зареєстровані на цей курс.');
        } else {
            setRegisteredCourses(prev => ({
                ...prev,
                [auth.user.name]: [...userCourses, course]
            }));
            alert('Ви успішно зареєструвалися на курс.');
        }
    };

    return (
        <div>
            <div className="head">
                <h1>Наші курси - твої успіхи</h1>
                <div className='buttons-on-head'>
                    <Link to="/">
                        <button>На головну</button>
                    </Link>
                    <input
                        type="text"
                        placeholder="Шукаєш щось конкретне?"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                </div>
            </div>
            <div className="content">
                {filteredCourses.map((item) => (
                    <div key={item.id} className="course">
                        <img className="course-image" src={item.cover} alt={`${item.name} cover`} />
                        <div className="course-details">
                            <h1>{item.name}</h1>
                            <p>{item.description}</p>
                            <ul>
                                {item.benefits.map((benefit, i) => (
                                    <li key={i}>{benefit}</li>
                                ))}
                            </ul>
                            <p>Тривалість: {item.duration}</p>
                            <button onClick={() => handleRegisterClick(item.id)}>Зареєструватися на курс</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { Courses };
