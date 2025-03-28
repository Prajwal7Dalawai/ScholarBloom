import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const scholarships = [
    {
        id: 1,
        collegeName: 'Harvard University',
        image: 'https://source.unsplash.com/400x300/?university',
        link: '/university/harvard'
    },
    {
        id: 2,
        collegeName: 'Stanford University',
        image: 'https://source.unsplash.com/400x300/?college',
        link: '/university/stanford'
    },
    {
        id: 3,
        collegeName: 'MIT',
        image: 'https://source.unsplash.com/400x300/?campus',
        link: '/university/mit'
    }
];

const ScholarshipPage = () => {
    const navigate = useNavigate();

    const handleKnowMore = (link) => {
        navigate(link);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Scholarships Offered by Universities</h2>
            <div className="row">
                {scholarships.map((college) => (
                    <div className="col-md-4" key={college.id}>
                        <div className="card">
                            <img src={college.image} className="card-img-top" alt={college.collegeName} />
                            <div className="card-body text-center">
                                <h5 className="card-title">{college.collegeName}</h5>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => handleKnowMore(college.link)}
                                >
                                    Know More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScholarshipPage;
