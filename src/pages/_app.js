import "@/styles/globals.css";
import { Provider } from './Context'; // Adjust the path as needed

export default function App({ Component, pageProps }) {
    return (
        <Provider>
            <Component {...pageProps} />
        </Provider>
    );
}

