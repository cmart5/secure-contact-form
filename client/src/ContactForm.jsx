import { useState } from 'react';

function ContactForm({ token }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    function validateInputs() {
        if (!name.trim()) return 'Name is required';
        if (!email.includes('@')) return 'Invalid email'; 
        if (!message.trim()) return 'Message cannot be empty';
        return null; // No errors
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        const error = validateInputs();
        if (error) {
            setStatus(error);
            return; // Stop submission if validation fails
        }
        console.log('Sending Form...');
        console.log({name, email, message});
        console.log('Sending token:', token);

        const contactData = {
            name,
            email,
            message,
        };

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(contactData)
            });
            // Check if the response is ok (status in the range 200-299)
            const data = await response.json();
            if(response.ok) {
                console.log('*PASS* Message Sent');
                setStatus('Message sent successfully!');
            } else {
                console.error('*FAIL* Server error:', data.message);
                setStatus(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('*FAIL* Network error:', error);
            setStatus('Network error, please try again later.');
        }
    }

    // Render the form
    return (
        <div style={{ marginBottom: '1rem' }}>
            <h2>Contact Form</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <textarea
                        rows="4"
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button type="submit">Send</button>
                <p>{status}</p>
            </form>
        </div>
    );
}

export default ContactForm;