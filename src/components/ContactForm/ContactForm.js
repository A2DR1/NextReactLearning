import { set } from 'rc-util';
import styles from './ContactForm.module.scss';
import { useState } from 'react';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');

    const handleNameChange = (e) => {
        if (e.target.value.length > 10) {
            alert('Name cannot exceed 10 characters');
            return;
        }
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const validateEmail = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (true) {
            if (emailRegex.test(e.target.value)) {
                console.log('Valid email format');
            } else {
                alert('Invalid email format');
            }
        }

    }

    const handlePhoneChange = (e) => {
        if (e.target.value.length > 10) {
            alert('Phone number cannot exceed 10 digits');
            return;
        }
        const newValue = e.target.value.replace(/\D/g, '');
        setPhone(newValue);
    }

    const handleSubjectChange = (e) => {
        if (e.target.value.length > 50) {
            alert('Subject cannot exceed 50 characters');
            return;
        }
        setSubject(e.target.value);
    }

    const handleSubmit = (e) => {
        // TODO: Add form submission logic
        console.log('Form submitted with values:', {
            name,
            email,
            phone,
            subject
        });

        fetch('http://serverlearning-1.onrender.com/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                subject
            })
        }
        ).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            console.log('Success:', data);
            setName('');
            setEmail('');
            setPhone('');
            setSubject('');
            alert('Form submitted');
        }).catch(error => {
            console.error('Error:', error);
        }
        )
    }


    return (
        <div className={styles.contactForm}>
            <div className={styles.form}>
                <div className={styles.userInfo}>
                    <input type="text" placeholder="Name" value={name}
                        onChange={handleNameChange} />
                    <input type="email" placeholder="Email" value={email}
                        onChange={handleEmailChange}
                        onBlur={validateEmail} />
                    <input type="tel" placeholder="Phone" value={phone}
                        onChange={handlePhoneChange} />
                </div>
                <div className={styles.message}>
                    <textarea placeholder="Subject" value={subject}
                        onChange={handleSubjectChange} />
                </div>

            </div>
            <button className={styles.button} onClick={handleSubmit}>Submit</button>
        </div>
    )
}
export default ContactForm;