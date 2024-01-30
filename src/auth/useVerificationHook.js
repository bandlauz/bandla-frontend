import { useState } from 'react';

export default function useVerificationHook(codeLength) {
    const [inputStates, setInputStates] = useState(Array.from({ length: codeLength }, () => ({ digit: "" })));

    const handleChange = (e, index) => {
        const entry = e.target.value;

        setInputStates((prevInputStates) => {
            const newInputStates = [...prevInputStates];
            newInputStates[index].digit = entry;
            if (entry.length === 1 && index < codeLength - 1) {
                document.getElementById(`digit-${index + 1}`).focus();
            } else if (entry.length === 0 && index > 0) {
                document.getElementById(`digit-${index - 1}`).focus();
            }

            return newInputStates;
        });
    };


    return {inputStates, handleChange};
}
