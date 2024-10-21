import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from './Context';

// Define the Username and Password map
const UsernamePwdMap = {
    "u1": "p1",
    "u2": "p2",
    "u3": "p3",
};

export default function LoginForm() {
    const { setUsername } = useUser(); // Get setUsername from context
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const router = useRouter();

    // Handle login form submission
    const handleLogin = (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        // Check if the username exists and the password is correct
        if (UsernamePwdMap[usernameInput] && UsernamePwdMap[usernameInput] === passwordInput) {
            setUsername(usernameInput); // Set the username using the context's handler
            router.push('/'); // Redirect to the dashboard page
        } else {
            window.alert('Invalid username or password!'); // Show error message if credentials are incorrect
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <div class="container">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" id="username" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} required/>
                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" id="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required/>
                    <button type="submit">Login</button>
                    <label>
                    <input type="checkbox" checked="checked" name="remember"/> Remember me
                    </label>
                </div>

                <div class="container" style="background-color:#f1f1f1">
                    <button type="button" class="cancelbtn">Cancel</button>
                    <span class="psw">Forgot <a href="#">password?</a></span>
                </div>
            </form>
        </div>
    );
}