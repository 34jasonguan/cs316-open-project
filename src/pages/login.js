import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './style'

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
            const hasStaffAccess = (['RA', 'RC'].includes(returnedJSON2['class'])) || false;
            //const hasStaffAccess = (returnedJSON2['class'] && returnedJSON2['class'] in ['RA', 'RC']) || false; -- this always evals to false

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
                <div type="container">
                    <label><b>NetID</b></label>
                    <input type="text" placeholder="Enter NetID" name="userid" id="userid" value={userIDInput} onChange={(e) => setUserIDInput(e.target.value)} required/>
                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" id="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required/>
                    <button type="login">Login</button>
                    <label>
                    <input type="checkbox" name="remember"/> Remember me
                    </label>
                </div>

            </form>
        </div>
    );
}