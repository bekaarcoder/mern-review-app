import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
            <Navbar />
            <Toaster />
            <div className="container my-4">
                <Outlet />
            </div>
        </>
    );
}

export default App;
