import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from './Context'; // Adjust the path as needed

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
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)} // Update the username input state
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)} // Update the password input state
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}