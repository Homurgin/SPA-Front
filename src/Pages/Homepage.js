//Homepage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    const [randomCourses, setRandomCourses] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                const randomIndexes = getRandomIndexes(jsonData.length, 3);
                const selectedCourses = randomIndexes.map(index => jsonData[index]);
                setRandomCourses(selectedCourses);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const getRandomIndexes = (max, count) => {
        const indexes = [];
        while (indexes.length < count) {
            const randomIndex = Math.floor(Math.random() * max);
            if (!indexes.includes(randomIndex)) {
                indexes.push(randomIndex);
            }
        }
        return indexes;
    };

    return (
        <div className='homepage'>
            <h1 className='Logo' style={{ marginTop: "100px", marginBottom: "10px"}}>В IT і вийті разом з T.A.F.M.E.</h1>
            
            <div className='slider-with-button'>
                <h2>Ознайомтесь з нашим топчиком:</h2>
                <div className="homepage-slider">
                    {randomCourses.map(course => (
                        <div key={course.id} className="homepage-slide">
                            <img className="homepage-course-image" src={course.cover} alt={course.name} />
                            <div className="homepage-slide-details">
                                <h2>{course.name}</h2>
                                <p>Тривалість: {course.duration}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Link to="/courses" className="courses-button">
                    <button>До курсів</button>
                </Link>
            </div>
            
            <h1 className='intro'>Так хто ми такі?</h1>
            <div className='slider-with-button' style={{width: "90%"}}>
                <h2>А ми це -</h2>
                <div className="homepage-slider">
                    <div className="homepage-slide">
                        <img className="homepage-course-image" style={{maxWidth: "150px" , maxHeight: "150px" , borderRadius : "90px"}} src="./photos/idea.jpg" alt="idea" />
                        <div className="homepage-slide-details">
                            <h2 style={{fontSize: "30px"}}>Ідея</h2>
                        </div>
                    </div>
                    <div className="homepage-slide">
                        <img className="homepage-course-image" style={{maxWidth: "150px" , maxHeight: "150px" , borderRadius : "90px"}} src="./photos/group.jpg" alt="group" />
                        <div className="homepage-slide-details">
                            <h2 style={{fontSize: "30px"}}>Колектив</h2>
                        </div>
                    </div>
                    <div className="homepage-slide">
                        <img className="homepage-course-image" style={{maxWidth: "150px" , maxHeight: "150px" , borderRadius : "90px"}} src="./photos/success.jpg" alt="success" />
                        <div className="homepage-slide-details">
                            <h2 style={{fontSize: "30px"}}>Успіх</h2>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className="tabs">
                    <nav className="tabs__items">
                        <div className={`tabs__item ${activeTab === 0 ? 'active' : ''}`} onClick={() => setActiveTab(0)}>
                            <span>Контакти</span>
                        </div>
                        <div className={`tabs__item ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>
                            <span>Спонсори</span>
                        </div>
                    </nav>
                    <div className="tabs__body">
                        <div className={`tabs__block ${activeTab === 0 ? 'active' : ''}`} id="tab_01">
                            <div className="footer_content">
                                <ul>
                                    <li style={{color: "white"}}><p>E-Mail: <a className="email" href="mailto:homurgin@gmail.com">homurgin@gmail.com</a></p></li>
                                    <li style={{color: "white"}}><p>Телефон: <a className="email" href="tel: +380953088207">+380 95 308 82 07</a></p></li>
                                </ul>
                            </div>
                        </div>
                        <div className={`tabs__block ${activeTab === 1 ? 'active' : ''}`} id="tab_02">
                            <p className="footer_p">АХАХАХАХАХАХ</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export { Homepage };
