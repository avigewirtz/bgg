import React, { useEffect, useState } from 'react';
import { Table, message, Button, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import './PressReleaseHistory.css';

function PressReleaseHistory() {
    const [pressReleases, setPressReleases] = useState([]);
    const [expandedRowKey, setExpandedRowKey] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/.netlify/functions/getPressReleases')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setPressReleases(data))
            .catch(error => {
                console.error('Error:', error);
                message.error('Error fetching press releases');
            });
    }, []);

    const handleEdit = (pressRelease) => {
        navigate('/', { state: { pressRelease } });
    };

    const handleDelete = (ticker) => {
        fetch('/.netlify/functions/deletePressRelease', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ticker }),
        })
        .then(response => response.json())
        .then(() => {
            message.success('Press release deleted successfully');
            // Refresh the list or remove the item from the state
            setPressReleases(pressReleases.filter(pr => pr.ticker !== ticker));
        })
        .catch(error => {
            console.error('Error:', error);
            message.error('Error deleting press release');
        });
    };

    const expandedRowRender = (record) => {
        return <div dangerouslySetInnerHTML={{ __html: record.content }} />;
    };

    const onTableRowExpand = (expanded, record) => {
        setExpandedRowKey(expanded ? record.ticker : null);
    };

    const columns = [
        {
            title: 'Ticker',
            dataIndex: 'ticker',
            key: 'ticker',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Created on',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Edit',
            key: 'edit',
            render: (_, record) => (
                <Button onClick={() => handleEdit(record)}>Edit</Button>
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (_, record) => (
                <Popconfirm
                    title="Are you sure you want to delete this press release?"
                    onConfirm={() => handleDelete(record.ticker)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div className="flex-container">
        <div className="container">
            {/* <h1>Press Release History</h1> */}
            <Table
                dataSource={pressReleases}
                columns={columns}
                rowKey="ticker" // Use ticker as the unique row key
                expandedRowRender={expandedRowRender}
                expandedRowKeys={expandedRowKey ? [expandedRowKey] : []}
                onExpand={onTableRowExpand}
            />
        </div>
        </div>
    );
}

export default PressReleaseHistory;