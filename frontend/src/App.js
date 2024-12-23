import logo from './logo.svg';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function App() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [clas, setClas] = useState('');
  const [msj, setMsj] = useState('');
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('https://saini-academy.onrender.com/user/contact', { name, email, clas, msj });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setClas('');
        setEmail('');
        setMsj('');
        setName('');
      }
      else {
        toast.error(res?.data?.error);
      }
    } catch (error) {
      console.log('while contact us', error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header>
        <nav>
          <div className="logo" >Saini Academy</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Excellence in Education</h1>
          <p>Empowering students from grades 1 to 10 with quality education</p>
          <button className="cta-button"><a href="#courses">Join Now</a></button>
        </div>
      </section>

      <section id="courses" className="courses">
        <h2>Our Courses</h2>
        <div className="course-grid">
          <div className="course-card" onClick={() => navigate('/Admissions')}>
            <h3>Primary Classes</h3>
            <p>Grades 1-5</p>
            <ul>
              <li>Mathematics</li>
              <li>English</li>
              <li>Science</li>
              <li>Click Here 👆 </li>
            </ul>
          </div>
          <div className="course-card" onClick={() => navigate('/Admissions')}>
            <h3>Middle School</h3>
            <p>Grades 6-8</p>
            <ul>
              <li>Advanced Mathematics</li>
              <li>Science & Technology</li>
              <li>Language Arts</li>
              <li>Click Here 👆 </li>
            </ul>
          </div>
          <div className="course-card" onClick={() => navigate('/Admissions')}>
            <h3>High School</h3>
            <p>Grades 9-10</p>
            <ul>
              <li>Mathematics & Science</li>
              <li>Social Studies</li>
              <li>Test Preparation</li>
              <li>Click Here 👆 </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Expert Teachers</h3>
            <p>Learn from experienced educators</p>
          </div>
          <div className="feature">
            <h3>Small Batches</h3>
            <p>Personalized attention to each student</p>
          </div>
          <div className="feature">
            <h3>Regular Tests</h3>
            <p>Track progress with periodic assessments</p>
          </div>
          <div className="feature">
            <h3>Study Material</h3>
            <p>Comprehensive study resources provided</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>📍 123 Education Street, Learning City</p>
            <p>📞 (123) 456-7890</p>
            <p>✉️ info@successacademy.com</p>
          </div>
          <form className="contact-form" onSubmit={onFormSubmit} >
            <input type="text" placeholder="Your Name" onChange={(e) => setName(e.target.value)} value={name} required />
            <input type="email" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
            <select required onChange={(e) => setClas(e.target.value)}>
              <option value=""  >Select Class</option>
              <option value="1-5">Grades 1-5</option>
              <option value="6-8">Grades 6-8</option>
              <option value="9-10">Grades 9-10</option>
            </select>
            <textarea placeholder="Your Message" value={msj} onChange={(e) => setMsj(e.target.value)} required></textarea>
            {
              loading ? <button>
                <img src="/img/loader.png" className='Loader' alt="loader" />
              </button>
                :
                <button type="submit">Send Message</button>
            }
          </form>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Saini Academy. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
