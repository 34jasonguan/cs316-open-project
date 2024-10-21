import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from './Context';
import { userAgentFromString } from 'next/server';

// Define the UserID and Password map
const UserIDPwdMap = {
    "u1": "p1",
    "u2": "p2",
    "u3": "p3",
};

export default function RegisterForm() {
    const [idInput, setIDInput] = useState('');
    const [firstnameInput, setFirstnameInput] = useState('');
    const [lastnameInput, setLastnameInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const router = useRouter();

    // Handle login form submission
    const handleRegister = (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        router.push('/login');
    };

    return (
        <div>
            <h1>Create an Account</h1>
            <form onSubmit={handleRegister}>
                <div class="container">
                    <label for="uname"><b>NetID</b></label>
                    <input type="text" placeholder="Enter NetID" name="userid" id="userid" value={idInput} onChange={(e) => setIDInput(e.target.value)} required/>
                    <label for="uname"><b>First name</b></label>
                    <input type="text" placeholder="Enter first name" name="fname" id="firstname" value={firstnameInput} onChange={(e) => setFirstnameInput(e.target.value)} required/>
                    <label for="uname"><b>Last name</b></label>
                    <input type="text" placeholder="Enter last name" name="lname" id="lastname" value={lastnameInput} onChange={(e) => setLastnameInput(e.target.value)} required/>
                    <label for="uname"><b>Phone number</b></label>
                    <input type="text" placeholder="Enter phone number" name="phone" id="phone" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} required/>
                    <label for="uname"><b>Email address</b></label>
                    <input type="text" placeholder="Enter email address" name="email" id="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required/>
                    <label for="uname"><b>Password</b></label>
                    <input type="text" placeholder="Enter password" name="pwd" id="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required/>
                    <button class="login" type="submit">Create!</button>
                </div>

            </form>
        </div>
    );
}