import { useState } from 'react';

export const usePopUp = (initialValue = false) => {

    const [isOpen, setIsOpen] = useState(initialValue);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return [isOpen, open, close];


}