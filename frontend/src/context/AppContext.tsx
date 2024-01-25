import { ReactNode, createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { validateToken } from '../api/auth';

interface User {
    userId: string;
}

type ToastMessage = {
    message: string;
    type: 'SUCCESS' | 'ERROR';
};

type AppContextType = {
    showToast: (toastMessage: ToastMessage) => void;
    loggedInUser: User | null;
    onLogout: () => void;
    validateUser: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

type AppContextProviderType = {
    children: ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderType) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const showToast = (toastMessage: ToastMessage) => {
        if (toastMessage.type === 'SUCCESS') {
            toast.success(toastMessage.message);
        } else if (toastMessage.type === 'ERROR') {
            toast.error(toastMessage.message);
        }
    };

    const onLogout = () => {
        setLoggedInUser(null);
    };

    const validateUser = async () => {
        const response = await validateToken();
        if ('error' in response) {
            console.log(response.error);
            setLoggedInUser(null);
        } else {
            console.log(response.data);
            setLoggedInUser(response.data);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            await validateUser();
        };

        fetchUser();
    }, []);

    return (
        <AppContext.Provider
            value={{ showToast, loggedInUser, onLogout, validateUser }}
        >
            {children}
        </AppContext.Provider>
    );
};
