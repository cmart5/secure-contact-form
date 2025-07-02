import { useState } from 'react';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        console.log('Sending Form...');
        console.log({name, email, message});

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
                    'Authorization': 'Bearer $(token)'
                },
                body: JSON.stringify(contactData)
            });
            // Check if the response is ok (status in the range 200-299)
            const data = await response.json();
            if(response.ok) {
                console.log('*PASS* Message Sent');
            } else {
                console.error('*FAIL* Server error:', data.message);
            }
        } catch (error) {
            console.error('*FAIL* Network error:', error);
        }
    };
    // Render the form
    return (
        <div>
            <h2>Contact Form</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={(name)}
                    onChange={(e) => setName(e.target.value)}
                    />
                    <p>Live name: {name}</p>
                <input
                    type="text"
                    placeholder="Email"
                    value={(email)}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <p>Live Email: {email}</p>
                <textarea
                    rows="4"
                    placeholder="Your Message"
                    value={(message)}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                    <p>Live name: {message}</p>

                <button type="submit">Send</button>
            </form>
            
        </div>
    );
}

export default ContactForm;