import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const UpdateThirukkural = () => {
    const { id } = useParams();
    const [KuralEn, setKuralEn] = useState();
    const [Kural, setKural] = useState();
    const [KuralVilakkam, setKuralVilakkam] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://thirukkural-api-dycp.onrender.com/getThirukkural/'+id)
        .then(results => {
            console.log(results)
            setKuralEn(results.data.KuralEn)
            setKural(results.data.Kural)
            setKuralVilakkam(results.data.KuralVilakkam) })
        .catch(err => console.log(err))
    },[]);

    const Update = (e) => {
        e.preventDefault();
        axios.put("https://thirukkural-api-dycp.onrender.com/updatethirukkural/"+id, { KuralEn, Kural, KuralVilakkam })
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
                            value={ KuralEn } onChange={(e) => setKuralEn(e.target.value)} />

                    </div>
                    <div className="form-group">
                        <label><b>குறள்:</b></label>
                        <input type="text" className="form-control" placeholder="Enter Kural"
                            value={ Kural} onChange={(e) => setKural(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label><b>குறள் விளக்கம்:</b></label>
                        <input type="text" className="form-control" placeholder="Enter Kural Vilakkam" 
                            value={ KuralVilakkam } onChange={(e) => setKuralVilakkam(e.target.value)} />

                    </div>
                    <button type="submit" className="btn btn-dark mt-2">தரவை புதுபிக்க</button>

                </form>
            </div>
        </div>
    );
}

export default UpdateThirukkural;
