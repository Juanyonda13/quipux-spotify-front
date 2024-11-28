import { load } from 'react-cookies'

const useAuth = () => {
    const token =  load('token')

    return Boolean(token);
};

export default useAuth;
