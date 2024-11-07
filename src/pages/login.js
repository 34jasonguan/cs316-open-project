import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './style'

// Define the Username and Password map
const UsernamePwdMap = {
    "admin": "admin",
    "kj240": "kj240",
    "rt341": "rt341",
    "mm442": "mm442",
    "pa543": "pa543",
    "hl644": "hl644"
};

export default function LoginForm() {
    const [userIDInput, setUserIDInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const router = useRouter();

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        
        const response1 = await fetch(`/api/getPassword?netID=${userIDInput}`);
        const response2 = await fetch(`/api/getAccessLevel?netID=${userIDInput}`);

        if (response1.ok && response2.ok) {
            const returnedJSON1 = await response1.json();
            const returnedJSON2 = await response2.json();
            const passwordTrue = returnedJSON1['password'];
            const hasStaffAccess = (returnedJSON2['class'] && returnedJSON2['class'] in ['RA', 'RC']) || false;

            // Check if the userID exists and the password is correct
            if (passwordTrue && passwordInput && passwordTrue == passwordInput) {
                localStorage.setItem('userID', userIDInput);
                localStorage.setItem('hasStaffAccess', hasStaffAccess);
                console.log(hasStaffAccess);
                router.push('/'); // Redirect to the dashboard page
            } else {
                window.alert('Invalid NetID or password!'); // Show error message if credentials are incorrect
            }
        }
    };

    return (
        <div>
            <h1 style = {styles.heading}>Login Page</h1>
            <form onSubmit={handleLogin}>
                <div class="container">
                    <label for="uname"><b>NetID</b></label>
                    <input type="text" placeholder="Enter NetID" name="userid" id="userid" value={userIDInput} onChange={(e) => setUserIDInput(e.target.value)} required/>
                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" id="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required/>
                    <button class="login" type="submit">Login</button>
                    <label>
                    <input type="checkbox" name="remember"/> Remember me
                    </label>
                </div>

            </form>
        </div>
    );
}