// import React, { forwardRef, useImperativeHandle, useRef } from "react";
// const ResultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
//     return (
//         // dialog is a built-in element in HTML5 that is used to create a dialog box that can be used to display messages to the user.
//         // give open attribute to dialog element to open the dialog box
//         <dialog ref={ref} className="result-modal">
//             <h2>You {result}</h2>
//             <p>
//                 The target time was<strong>{targetTime} seconds.</strong>
//             </p>
//             <p>
//                 You stopped the timer with <strong>X seconds left</strong>
//             </p>
//             <form method="dialog">
//                 <button>Close</button>
//             </form>
//         </dialog>
//     );
// })
// export default ResultModal;

import React, { forwardRef, useRef, useImperativeHandle } from 'react';

const ResultModal = forwardRef(({ result }, ref) => {
    const dialog = useRef();
    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal();
        },
        close() {
            dialog.current.close();
        }
    }));

    return (
        <dialog ref={dialog} >
            <p>{result}</p>
            <button onClick={() => dialog.current.close()}>Close</button>
        </dialog>
    );
});

export default ResultModal;

