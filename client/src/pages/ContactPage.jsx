import ContactForm from '../ContactForm';
import { useNavigate } from 'react-router-dom';

function ContactPage({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={styles.box}>
      <h2>Contact Us</h2>
      <ContactForm token={token} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

const styles = {
  box: {
    maxWidth: '500px',
    margin: '100px auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  }
};

export default ContactPage;
