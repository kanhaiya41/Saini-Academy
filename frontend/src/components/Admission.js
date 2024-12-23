import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

const Admission = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: '',
        email: '',
        number1: '',
        number2: '',
        clas: '',
        address: ''
    });

    const [gred, setGred] = useState('');
    const [pic, setPic] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        })
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = new FormData();
            data.append('name', input?.name);
            data.append('email', input?.email);
            data.append('number1', input?.number1);
            data.append('number2', input?.number2);
            data?.append('clas', input?.clas);
            data?.append('address', input?.address);
            data?.append('gred', gred);
            data.append('pic', pic);
            const res = await axios.post('http://localhost:8000/user/admission', data);
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                setInput({
                    name: '',
                    email: '',
                    number1: '',
                    number2: '',
                    clas: '',
                    address: ''
                });
                setPic(null);
            }
            else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            console.log('while admission form', error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <header>
                <nav>
                    <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} >Saini Academy</div>
                    <ul className="nav-links">
                        <li><a href="#admissionform">Admission Form</a></li>
                        <li><a href="#fee-Structure">Fee Structure</a></li>
                        <li><a href="#Admission-Rules">Admission-Rules</a></li>
                        <li><a href="#decipline-Rules">Decipline-Rules</a></li>
                    </ul>
                </nav>
            </header>
            <div className='admissionform' id='admissionform'>
                <div className='admission'>
                    <form className="contact-form" onSubmit={onFormSubmit}>
                        <h2>Admission Form</h2>
                        <input type="text" name='name' placeholder="Your Name" value={input?.name} onChange={handleInput} required />
                        <input type="email" name='email' placeholder="Your Email" value={input?.email} onChange={handleInput} required />
                        <input type="number" name='number1' placeholder="Your Contact number" value={input?.number1} onChange={handleInput} required />
                        <input type="number" name='number2' placeholder="Alternate Mobile number" value={input?.number2} onChange={handleInput} required />
                        <input type="text" name='clas' placeholder="In which class are you" value={input?.clas} onChange={handleInput} required />
                        <input type="text" name='address' placeholder="Address" value={input?.address} onChange={handleInput} required />
                        <label htmlFor="photo" className='photo'>{pic ? pic?.name : 'Attach your Photo'}</label>
                        <input type="file" id='photo' onChange={(e) => setPic(e.target.files[0])} style={{ display: 'none' }} />
                        <select required onChange={(e) => setGred(e.target.value)}>
                            <option value="" disabled>Select Class</option>
                            <option value="1-5">Grades 1-5</option>
                            <option value="6-8">Grades 6-8</option>
                            <option value="9-10">Grades 9-10</option>
                        </select>
                        {/* <textarea placeholder="Your Message" required></textarea> */}
                        {
                            loading ? <button>
                                <img src="/img/loader.png" className='Loader' alt="loader" />
                            </button>
                                :
                                <button type="submit">Submit</button>
                        }
                    </form>
                </div>
            </div>
            <div id='fee-Structure'>
                <h2>Fee Structure</h2>
                <div className="course-grid">
                    <div className="course-card">
                        <h3>Primary Classes</h3>
                        <ul>
                            <p>Installments</p>
                            <li>2,500 rs.</li>
                            <li>2,500 rs.</li>
                            <li>Total : 5,000 rs.</li>
                        </ul>
                        <ul>
                            <p>Fixed Ammount together</p>
                            <li>4,000 rs.</li>
                        </ul>
                    </div>
                    <div className="course-card">
                        <h3>Middle School</h3>
                        <ul>
                            <p>Installments</p>
                            <li>5,000 rs.</li>
                            <li>5,000 rs.</li>
                            <li>Total : 10,000 rs.</li>
                        </ul>
                        <ul>
                            <p>Fixed Ammount together</p>
                            <li>9,000 rs.</li>
                        </ul>
                    </div>
                    <div className="course-card">
                        <h3>High School</h3>
                        <ul>
                            <p>Installments</p>
                            <li>5,000 rs.</li>
                            <li>5,000 rs.</li>
                            <li>5,000 rs.</li>
                            <li>Total : 15,000 rs.</li>
                        </ul>
                        <ul>
                            <p>Fixed Ammount together</p>
                            <li>13,000 rs.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="Admission-Rules">
                <h2>Admission Rules</h2>
                <img src="/img/admissionRule.png" alt="" />
            </div>
            <div id="decipline-Rules">
                <h2>Genral Decipline Rules</h2>
                <ul>
                    <li>All students should reach the classroom on time and shall not leave the class without the permission of the teacher.</li>
                    <li>All students should wear proper uniform with College ID.</li>
                    <li>Minimum 75% of attendance is must for students for appearing semester examination.</li>
                    <li>The behavior of the students, both within and outside the college premises should be decent and befitting to a professional institution.</li>
                    <li>Students found guilty of ragging will be dismissed from the college as per the Supreme Court ruling.</li>
                    <li>Students are prohibited to bring or use mobile phones within the campus.</li>
                    <li>This, being an eco–friendly campus, plastic or other trash should not be thrown inside the college or in the premises..</li>
                    <li>Students shall keep themselves informed of the instructions issued to them from time to time orally or through notices/ circulars and emails.</li>
                    <li>Students are expected to contribute towards the academic/ social/environmental initiatives that the Institute may undertake.</li>
                    <li>Participation in intercollegiate programmes, within the city or outside, is subject to permission of the Principal.</li>
                    <li>For outstation programmes including study tour, the students are required to submit a permission letter from their parents.
                    </li>
                    <li>Students are required to keep safe custody of their valuables. They should maintain decency and decorum during cultural events, be it inside the campus or outside..</li>
                    <li>The College campus is a no–smoking/ alcohol-free zone.
                    </li>
                    <li>Every student should carry his/ her identity card and produce it on demand by the authorities.
                    </li>
                    <li>Students are prohibited from organizing or attending meetings in the college, distributing notices, collecting money and exhibiting banners, flags, posters etc. without the permission of the Principal.</li>
                    <li>All expressions or activities which are immoral, antisocial, communal and anti-national are strictly prohibited in the College campus.
                    </li>
                    <li>The Principal shall be the final authority in the interpretation of the College rules. Matters not covered by these rules are left to the discretion of the Principal and his decision shall be final.</li>
                </ul>
            </div>
            <div className='goback'>
                <button className='cta-button' onClick={() => navigate('/')} >Go back</button>
            </div>  <br />
            <footer>
                <p>&copy; 2024 Saini Academy. All rights reserved.</p>
            </footer>
        </>
    )
}

export default Admission
