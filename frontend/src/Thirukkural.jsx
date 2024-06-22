// Thirukkural.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import './quiz';

const Thirukkural = () => {
    const [thirukkurals, setThirukkurals] = useState([]);
    const [showQuiz, setShowQuiz] = useState(false);

    useEffect(() => {
        axios.get('https://thirukkural-api-dycp.onrender.com')
            .then(results => {
                const sortedData = results.data.sort((a, b) => parseInt(a.KuralEn) - parseInt(b.KuralEn));
                setThirukkurals(sortedData);
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://thirukkural-api-dycp.onrender.com/deletethirukkural/${id}`)
            .then(results => {
                console.log(results);
                setThirukkurals(thirukkurals.filter(kural => kural._id !== id));
            })
            .catch(err => console.log(err));
    };

    const handleSpeak = (kural, vilakkam) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(`குறள்: ${kural}. குறள் விளக்கம்: ${vilakkam}`);
        utterance.lang = 'ta-IN';  // Set the language to Tamil
        synth.speak(utterance);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center" href="/">
                        <img src="https://th.bing.com/th/id/R.8835ec03fb6010c826d5677a99cd308f?rik=WaxPJxNhAFnbKA&riu=http%3a%2f%2f2.bp.blogspot.com%2f-EbEroAerHQk%2fVIDvegvdw6I%2fAAAAAAAAAHo%2fjZjsn1jkGBI%2fs1600%2fthiruvalluvar.jpg&ehk=Uc4hzpw%2bdMn%2bHxQfZSa01H8mhE6Xr3YB2wB3yu%2fLTo4%3d&risl=&pid=ImgRaw&r=0" width="70" height="70" className="d-inline-block align-top mr-3" alt="Thiruvalluvar" />
                        <h1 className="mb-0">&nbsp;&nbsp;&nbsp;&nbsp;திருக்குறள்</h1>
                    </a>
                </div>
            </nav>
            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to='/create' className="btn btn-success">குறளை சேர்க்க + </Link>
                </div>
                <div className="row">
                    {thirukkurals.map((thirukkural) => (
                        <div key={thirukkural._id} className="col-md-4 mb-4 d-flex align-items-stretch">
                            <div className="card-container shadow-sm w-100">
                                <div className="card-body">
                                    <h5 className="card-title"><b>குறள் எண்:</b> {thirukkural.KuralEn}</h5>
                                    <p className="card-subtitle mb-2"><b>குறள்:</b></p>
                                    <p className="card-text">{thirukkural.Kural.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}<br />
                                        </span>
                                    ))}</p>
                                    <p className="card-text"><b>குறள் விளக்கம்:</b> {thirukkural.KuralVilakkam}</p>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/update/${thirukkural._id}`} className="btn btn-primary">தரவை புதுபிக்க</Link>
                                        <button className="btn btn-danger" onClick={() => handleDelete(thirukkural._id)}>குறளை நீக்க</button><br></br>
                                        <button className="btn btn-secondary" onClick={() => handleSpeak(thirukkural.Kural, thirukkural.KuralVilakkam)}>🔊</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Thirukkural;
