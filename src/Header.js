// Header.js

import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import './Header.css';

const { Header: AntHeader } = Layout;

const Header = () => {
    return (
        <AntHeader className="custom-header">
            <div className="header-content">
                <Link to="/" className="header-title">Press Release Generator</Link>
                <Link to="/history" className="history-link">Press Release History</Link>
            </div>
        </AntHeader>
    );
};

export default Header;
