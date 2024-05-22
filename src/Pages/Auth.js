//Auth.js
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authorisation/AuthContext';

const Auth = () => {
    const { auth, setAuth, users, setUsers, registeredCourses, setRegisteredCourses, tempCourse, setTempCourse } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuth && tempCourse) {
            registerCourse(tempCourse);
            setTempCourse(null); 
            navigate('/cabinet');
        }
       
    }, [auth.isAuth, tempCourse, navigate, setTempCourse]);

    const handleLogin = (e) => {
        e.preventDefault();
        const { username, password } = e.target.elements;
        const user = users.find(user => user.name === username.value && user.password === password.value);
        if (user) {
            setAuth({ isAuth: true, user });
        } else {
            alert('Невірно введені дані або акаунт не існує');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const { username, password } = e.target.elements;

        const isExistingUser = users.some(user => user.name === username.value);

        if (isExistingUser) {
            alert('Користувач з такою поштою вже зареєстрований.');
        } else {
            const user = { name: username.value, password: password.value, nickname: nickname };
            setUsers([...users, user]);
            setName(username.value);
            setIsLogin(true);
        }
    };

    const handleLogout = () => {
        setAuth({ isAuth: false, user: null });
        navigate('/');
    };
    
    const registerCourse = (course) => {
        const userCourses = registeredCourses[auth.user.name] || [];
        const isAlreadyRegistered = userCourses.some(c => c.id === course.id);
        if (!isAlreadyRegistered) {
            setRegisteredCourses(prev => ({
                ...prev,
                [auth.user.name]: [...userCourses, course]
            }));
        }
    };

    const handleRemoveCourse = (courseId) => {
        setRegisteredCourses(prev => ({
            ...prev,
            [auth.user.name]: prev[auth.user.name].filter(course => course.id !== courseId)
        }));
    };

    const hasActiveCourses = auth.isAuth && registeredCourses[auth.user.name] && registeredCourses[auth.user.name].length > 0;

    return (
        <div>
            <div className="head">
                <h1>{isLogin ? 'Вхід' : 'Реєстрація'}</h1>
                <div className='buttons-on-head'>
                    <Link to="/">
                        <button>На головну</button>
                    </Link>
                </div>
            </div>
            <div className="content content-auth" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {auth.isAuth ? (
                    <div className="info">
                        <div className="greetings">
                            <h2>Привіт, {auth.user && auth.user.nickname}!</h2>
                            <p>E-Mail: {auth.user && auth.user.name}</p>
                            <button className="red_button" onClick={handleLogout}>Вийти</button>
                        </div>
                        {hasActiveCourses ? (
                            <>
                                <h3>Твої курси:</h3>
                                <ul className="content_ul">
                                    {(registeredCourses[auth.user.name] || []).map((course, index) => (
                                        <li key={index} className="course">
                                            <img className="course-image-auth" src={course.cover} alt={`${course.name} cover`} />
                                             <div className="course-details">
                                                <h4>{course.name}</h4>
                                                <p>{course.description}</p>
                                                <button className="red_button" onClick={() => handleRemoveCourse(course.id)}>Видалити курс</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : <p>Ще немає активних курсів &#x1F61E;</p>}
                    </div>
                ) : isLogin ? (
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <input name="username" type="text" placeholder="E-Mail" required />
                        <input name="password" type="password" placeholder="Пароль" required />
                        <button type="submit">Увійти</button>
                        <p>Перший раз у нас? 
                        <button type="button" onClick={() => setIsLogin(false)}>Зареєструйся зараз!</button></p>
                    </form>
                ) : (
                    <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <input name="username" type="text" placeholder="E-Mail" required />
                        <input name="password" type="password" placeholder="Пароль" required />
                        <input name="nickname" type="text" placeholder="Нікнейм" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
                        <button type="submit">Зареєструватися</button>
                    </form>
                )}
                {!isLogin && (
                    <p style={{ marginTop: '10px' }}>Вже маєш акаунт? <button onClick={() => setIsLogin(true)}>Заходь!</button></p>
                )}
            </div>
        </div>
    );
};

export default Auth;
