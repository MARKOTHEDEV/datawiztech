import { useMemo } from 'react';

const useIsUser = (currentUser) => {
    return useMemo(() => {
        return !!currentUser;
    }, [currentUser]);
};

export default useIsUser
