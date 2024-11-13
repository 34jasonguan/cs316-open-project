import { useState } from 'react';
import { useRouter } from 'next/router';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import AsyncSelect from 'react-select/async';

import styles from './style'

export default function RegisterForm() {
    const [idInput, setIDInput] = useState('');
    const [firstnameInput, setFirstnameInput] = useState('');
    const [lastnameInput, setLastnameInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [classInput, setClassInput] = useState('');
    const [yearInput, setYearInput] = useState('');
    const [stuInput, setStuInput] = useState([]);
    const [raInput, setRAInput] = useState([]);
    const [rcInput, setRCInput] = useState([]);
    const [passwordInput, setPasswordInput] = useState('');
    const router = useRouter();

    // Handle create account form submission
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        const userInsertedData = {
            'netID': idInput,
            'firstname': firstnameInput,
            'lastname': lastnameInput,
            'phone': phoneInput,
            'email': emailInput, 
            'class': classInput,
            'year': yearInput,
            'student': stuInput,
            'RA': raInput,
            'RC': rcInput,
            'password': passwordInput
        };
        
        const response = await fetch(`/api/insertUser`, {
            method: 'POST',
            body: JSON.stringify(userInsertedData)
        });

        if (response.ok) {
            window.alert('Account created successfully!');
            router.push('/login');
        }
    };

    const promiseOptions = async (inputValue, searchedClass) => {
        let options = [];

        if (inputValue.length > 0) {
            try {
                const response = await fetch(`/api/getUsersByClassNetID?searchedClass=${searchedClass}&inputValue=${inputValue}`);
                
                if (response.ok) {
                    const selectedUsers = await response.json();
                    options = (selectedUsers.length > 0) ? selectedUsers.map(user => {return {value: user.netID, label: user.firstname + ' ' + user.lastname};}) : [];
                } else {
                const errorData = await response.json();
                // generatedOutput = errorData.message || 'An error occurred';
                }
            } catch (error) {
                console.error('Error fetching availability:', error);
                // generatedOutput = 'Failed to fetch availability.';
            }
        }

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(options);
          }, 1000);
        })
    };

    return (
        <div>
            <h1 style = {styles.heading}>Create an Account</h1>
            <form onSubmit={handleRegister}>
                <div type="container">
                    <label><b>NetID</b></label>
                    <input type="text" placeholder="Enter NetID" name="userid" id="userid" value={idInput} onChange={(e) => setIDInput(e.target.value)} required/>
                    <label><b>First name</b></label>
                    <input type="text" placeholder="Enter first name" name="fname" id="firstname" value={firstnameInput} onChange={(e) => setFirstnameInput(e.target.value)} required/>
                    <label><b>Last name</b></label>
                    <input type="text" placeholder="Enter last name" name="lname" id="lastname" value={lastnameInput} onChange={(e) => setLastnameInput(e.target.value)} required/>
                    <label><b>Phone number</b></label>
                    <input type="text" placeholder="Enter phone number" name="phone" id="phone" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} required/>
                    <label><b>Email address</b></label>
                    <input type="text" placeholder="Enter email address" name="email" id="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required/>
                    <label><b>Role Type:</b>
                        <select
                            value={classInput}
                            onChange={(e) => setClassInput(e.target.value)}
                            style={styles.select}
                            required
                        >
                            <option value=""></option>
                            <option value="student">Student</option>
                            <option value="RA">RA</option>
                            <option value="RC">RC</option>
                        </select>
                    </label>
                    {(classInput === 'student' || classInput === 'RA') && (
                        <label htmlFor="year"><b>Year:</b>
                            <select
                                value={yearInput}
                                onChange={(e) => setYearInput(e.target.value)}
                                style={styles.select}
                                required
                            >
                                <option value=""></option>
                                <option value="freshman">Freshman</option>
                                <option value="sophomore">Sophomore</option>
                                <option value="junior">Junior</option>
                                <option value="senior">Senior</option>
                            </select>
                        </label>
                    )}
                    {(classInput === 'RA') && (
                        <label htmlFor="year"><b>Resident:</b>
                            <AsyncSelect
                                isMulti
                                cacheOptions
                                defaultOptions
                                loadOptions={(inputValue) => promiseOptions(inputValue, 'student')}
                                value={stuInput}
                                onChange={(e) => setStuInput(e)}
                            />
                        </label>
                    )}
                    {(classInput === 'student' || classInput === 'RC') && (
                        <label htmlFor="ra"><b>RA:</b>
                            <AsyncSelect
                                isMulti
                                cacheOptions
                                defaultOptions
                                loadOptions={(inputValue) => promiseOptions(inputValue, 'RA')}
                                value={raInput}
                                onChange={(e) => setRAInput(e)}
                            />
                        </label>
                    )}
                    {(classInput === 'RA') && (
                        <label htmlFor="rc"><b>RC:</b>
                            <AsyncSelect
                                isMulti
                                cacheOptions
                                defaultOptions
                                loadOptions={(inputValue) => promiseOptions(inputValue, 'RC')}
                                value={rcInput}
                                onChange={(e) => setRCInput(e)}
                            />
                        </label>
                    )}
                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter password" name="pwd" id="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required/>
                    <button type="login">Create!</button>
                </div>

            </form>
        </div>
    );
}



// CAVEATS:
//   1. Database too redundant. (hasRA & hasRC)
//   2. One student may have multiple RAs, and one RA may have multiple RCs
//   3. Phone number / Email might be invalid
//   4. Mallicious inputs to break url passing e.g., '&' to retrieve all resident/RA/RC information