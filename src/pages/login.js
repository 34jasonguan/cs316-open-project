import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from './Context';
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
    const { setUserID } = useUser(); // Get setUserID from context
    const [userIDInput, setUserIDInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const router = useRouter();

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        
        const response = await fetch(`/api/getPassword?netID=${userIDInput}`);

        if (response.ok) {
            const returnedJSON = await response.json();
            const passwordTrue = returnedJSON['password'];

            // Check if the userID exists and the password is correct
            if (passwordTrue && passwordInput && passwordTrue == passwordInput) {
                setUserID(userIDInput); // Set the userID using the context's handler
                localStorage.setItem('userID', userIDInput);
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