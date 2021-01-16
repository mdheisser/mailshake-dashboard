import { useState } from "react";

function useToggle(initialVal = false) {
    const [state, setState] = useState(initialVal);

    const toggle = () => {
        setState(!state);
    };

    // return piece of state AND a function to toggle it
    return [state, toggle];
}

export default useToggle;
