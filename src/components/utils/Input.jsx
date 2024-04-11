import { useId } from 'react';
import propTypes from 'prop-types';

function Input({
    label,
    type="text",
    className = "",
    calssForLabel= "",
    ...props   
}) {
    const id = useId()
    return (
        <>
            {label && <label
            className= {`mb-1 inline-block ${calssForLabel}`}
            htmlFor= {id}>
                {label}
            </label>
            }

            <input
            type= { type }
            className= {`border bg-transparent ${className}`}
            {...props}
            id= {id}
            />
        </>
    );
}

Input.propTypes = {
    label: propTypes.string,
    type: propTypes.string,
    className: propTypes.string,
    calssForLabel: propTypes.string
};

export default Input;