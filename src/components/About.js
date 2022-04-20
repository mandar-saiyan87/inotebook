import React, { useContext, useEffect } from 'react';
import { NoteContext } from '../context/notes/NoteContext';


function About() {
    const context = useContext(NoteContext);

    useEffect(() => {
        context.update();
    }, []);
    return (
        <>
            <div>Hi, This is {context.state.name} and I am {context.state.occupation}</div>
        </>
    );
}

export default About;
