import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

const CreateThirukkural = () => {
    const [KuralEn, setKuralEn] = useState('');
    const [Kural, setKural] = useState('');
    const [KuralVilakkam, setKuralVilakkam] = useState('');
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate();

    const validateKural = (kural) => {
        const lines = kural.split('\n');
        if (lines.length !== 2) {
            return "குறளில் 2 வரிகள் இருக்க வேண்டும்.";
        }
        const wordsLine1 = lines[0].split(' ').filter(word => word !== '');
        const wordsLine2 = lines[1].split(' ').filter(word => word !== '');
        if (wordsLine1.length !== 4 || wordsLine2.length !== 3) {
            return "குறளில் முதல் வரியில் 4 வார்த்தைகளும், இரண்டாவது வரியில் 3 வார்த்தைகளும் இருக்க வேண்டும்.";
        }
        return '';
    };

    const Submit = (e) => {
        e.preventDefault();
        const error = validateKural(Kural);
        if (error) {
            setValidationError(error);
            return;
        }
        if (!KuralVilakkam) {
            setValidationError("குறள் விளக்கம் தருக.");
            return;
        }
        setValidationError('');
        axios.post("https://thirukkural-api-dycp.onrender.com/createthirukkural", { KuralEn, Kural, KuralVilakkam })
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="custom-container">
            <div className="my-auto custom-form">
                <h1 className="text-center mb-4">குறளை சேர்க்க</h1>
                <form onSubmit={Submit}>
                    <div className="form-group">
                        <label><b>குறள் எண்</b></label>
                        <input type="text" className="form-control" 
                            onChange={(e) => setKuralEn(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label><b>குறள்</b></label>
                        <textarea className="form-control" rows="2"
                            onChange={(e) => setKural(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label><b>குறள் விளக்கம்</b></label>
                        <input type="text" className="form-control"
                            onChange={(e) => setKuralVilakkam(e.target.value)} />
                    </div>
                    {validationError && (
                        <div className="alert alert-danger mt-2">
                            {validationError}
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary mt-2">சமர்ப்பிக்க</button>
                </form>
            </div>
        </div>
    );
};

export default CreateThirukkural;
