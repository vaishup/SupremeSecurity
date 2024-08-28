import React, { useState, useEffect, useRef } from "react";

const IncidentDetail = () => {

<div className="lead-container">
    <div className="breadcrumb">
        <a href="#">Leads</a> &gt; <span>Mathew Davis</span>
    </div>

    <div className="lead-header">
        <div className="lead-info">
            <img src="mathew-davis.jpg" alt="Mathew Davis" className="lead-avatar" />
            <div>
                <h2>Mathew Davis</h2>
                <div className="tags">
                    <span className="tag hot-lead">Hot Lead</span>
                    <span className="tag company">Unilever</span>
                    <span className="tag country">United Kingdom</span>
                </div>
            </div>
        </div>
        <div className="lead-actions">
            <button className="btn">Send Mail</button>
            <button className="btn primary">Convert Lead</button>
        </div>
    </div>

    <div className="lead-details">
        <div className="info-cards">
            <div className="info-card">
                <p>Last Contacted</p>
                <strong>10-May-2020</strong>
            </div>
            <div className="info-card">
                <p>Next Appointment</p>
                <strong>10-May-2020</strong>
            </div>
        </div>
        <div className="tab-container">
            <div className="tabs">
                <a href="#" className="tab active">Basic Info</a>
                <a href="#" className="tab">Company Info</a>
                <a href="#" className="tab">Deal Info</a>
            </div>
            <div className="tab-content">
                <div className="info-row">
                    <div className="info-column">
                        <p>Name</p>
                        <strong>Mathew Davis</strong>
                    </div>
                    <div className="info-column">
                        <p>Mobile</p>
                        <strong>+44 7911 123456</strong>
                    </div>
                    <div className="info-column">
                        <p>Email</p>
                        <strong>mathew@unilever.com</strong>
                    </div>
                </div>
                <div className="info-row">
                    <div className="info-column">
                        <p>Company</p>
                        <strong>Unilever</strong>
                    </div>
                    <div className="info-column">
                        <p>Country</p>
                        <strong>United Kingdom</strong>
                    </div>
                    <div className="info-column">
                        <p>Sales Owner</p>
                        <strong>Hendry James</strong>
                    </div>
                </div>
                <div className="info-row">
                    <div className="info-column">
                        <p>Region</p>
                        <strong>Europe</strong>
                    </div>
                    <div className="info-column">
                        <p>Time Zone</p>
                        <strong>CEST</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

}
export default IncidentDetail;
