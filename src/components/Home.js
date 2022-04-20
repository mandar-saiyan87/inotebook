import React from 'react';
import Notes from './Notes';

function Home() {

    return (
        <>
            <div className="container my-4">
                <h3>Add Note</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" aria-describedby="emailHelp" placeholder='Enter Title' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Enter Description'></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Tag" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <Notes />
        </>
    );
}

export default Home;
