import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const UpdateThirukkural = () => {
    const { id } = useParams();
    const [KuralEn, setKuralEn] = useState('');
    const [Kural, setKural] = useState('');
    const [KuralVilakkam, setKuralVilakkam] = useState('');
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://thirukkural-api-dycp.onrender.com/getThirukkural/' + id)
            .then(results => {
                console.log(results);
                setKuralEn(results.data.KuralEn);
                setKural(results.data.Kural);
                setKuralVilakkam(results.data.KuralVilakkam);
            })
            .catch(err => console.log(err));
    }, [id]);

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

    const Update = (e) => {
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
        axios.put("https://thirukkural-api-dycp.onrender.com/updatethirukkural/" + id, { KuralEn, Kural, KuralVilakkam })
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="update-page">
            <div className="update-container">
                <h1>தரவை புதுபிக்க</h1>
                <form onSubmit={Update}>
                    <div className="form-group">
                        <label><b>குறள் எண்:</b></label>
                        <input type="text" className="form-control" placeholder="Enter Kural En"
                            value={KuralEn} onChange={(e) => setKuralEn(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label><b>குறள்:</b></label>
                        <textarea className="form-control" placeholder="Enter Kural" rows="2"
                            value={Kural} onChange={(e) => setKural(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label><b>குறள் விளக்கம்:</b></label>
                        <input type="text" className="form-control" placeholder="Enter Kural Vilakkam"
                            value={KuralVilakkam} onChange={(e) => setKuralVilakkam(e.target.value)} />
                    </div>
                    {validationError && (
                        <div className="alert alert-danger mt-2">
                            {validationError}
                        </div>
                    )}
                    <button type="submit" className="btn btn-dark mt-2">தரவை புதுபிக்க</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateThirukkural;
