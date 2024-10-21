import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from './Context';

// Define the UserID and Password map
const UserIDPwdMap = {
    "u1": "p1",
    "u2": "p2",
    "u3": "p3",
};

export default function LoginForm() {
    const { setUserID } = useUser(); // Get setUserID from context
    const [userIDInput, setUserIDInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const router = useRouter();

    // Handle login form submission
    const handleLogin = (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        // Check if the userID exists and the password is correct
        if (UserIDPwdMap[userIDInput] && UserIDPwdMap[userIDInput] === passwordInput) {
            setUserID(userIDInput); // Set the userID using the context's handler
            router.push('/'); // Redirect to the dashboard page
        } else {
            window.alert('Invalid NetID or password!'); // Show error message if credentials are incorrect
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
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