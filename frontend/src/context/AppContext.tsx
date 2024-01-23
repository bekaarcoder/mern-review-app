import { ReactNode, createContext } from 'react';
import toast from 'react-hot-toast';

type ToastMessage = {
    message: string;
    type: 'SUCCESS' | 'ERROR';
};

type AppContextType = {
    showToast: (toastMessage: ToastMessage) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

type AppContextProviderType = {
    children: ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderType) => {
    const showToast = (toastMessage: ToastMessage) => {
        if (toastMessage.type === 'SUCCESS') {
            toast.success(toastMessage.message);
        } else if (toastMessage.type === 'ERROR') {
            toast.error(toastMessage.message);
        }
    };

    return (
        <AppContext.Provider value={{ showToast }}>
            {children}
        </AppContext.Provider>
    );
};
