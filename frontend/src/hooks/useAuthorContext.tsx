import { useContext } from 'react';
import { AuthorContext } from '../context/AuthorContext';

export const useAuthorContext = () => {
    const context = useContext(AuthorContext);

    if (!context) {
        throw Error(
            'useAuthorContext must be used inside AuthorContextProvider'
        );
    }

    return context;
};
