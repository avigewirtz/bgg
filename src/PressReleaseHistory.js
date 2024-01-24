import React, { useEffect, useState } from 'react';
import { Table, message, Button, Popconfirm, Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import './PressReleaseHistory.css';

function PressReleaseHistory() {
    const [pressReleases, setPressReleases] = useState([]);
    const [expandedRowKey, setExpandedRowKey] = useState(null);
    const [sortedInfo, setSortedInfo] = useState({});
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
            setPressReleases(pressReleases.filter(pr => pr.ticker !== ticker));
        })
        .catch(error => {
            console.error('Error:', error);
            message.error('Error deleting press release');
        });
    };

    const CustomHeader = ({ title, dataIndex }) => {
        const handleMenuClick = (e) => {
            setSortedInfo({ field: dataIndex, order: e.key });
        };

        const menu = (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="ascend">Sort Ascending</Menu.Item>
                <Menu.Item key="descend">Sort Descending</Menu.Item>
                {/* <Menu.Item key="reset">Reset Sort</Menu.Item> */}
            </Menu>
        );

        return (
            <Dropdown overlay={menu}>
                <Button type="link" style={{ padding: 0, height: 'auto', border: 'none', boxShadow: 'none' }}>
                    {title}
                </Button>
            </Dropdown>
        );
    };

    const expandedRowRender = (record) => {
        return <div dangerouslySetInnerHTML={{ __html: record.content }} />;
    };

    const onTableRowExpand = (expanded, record) => {
        setExpandedRowKey(expanded ? record.ticker : null);
    };

    const getSortedData = () => {
        return [...pressReleases].sort((a, b) => {
            if (!sortedInfo.field || sortedInfo.order === 'reset') {
                return 0;
            }
            if (sortedInfo.field === 'createdAt') {
                const dateA = new Date(a[sortedInfo.field]);
                const dateB = new Date(b[sortedInfo.field]);
                return sortedInfo.order === 'ascend' ? dateA - dateB : dateB - dateA;
            }
            return sortedInfo.order === 'ascend' 
                ? a[sortedInfo.field].localeCompare(b[sortedInfo.field]) 
                : b[sortedInfo.field].localeCompare(a[sortedInfo.field]);
        });
    };

    const columns = [
        {
            title: <CustomHeader title="Ticker" dataIndex="ticker" />,
            dataIndex: 'ticker',
            key: 'ticker',
        },
        {
            title: <CustomHeader title="Full Name" dataIndex="fullName" />,
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: <CustomHeader title="Created on" dataIndex="createdAt" />,
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: text => new Date(text).toLocaleDateString(),
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
                <Table
                    dataSource={getSortedData()}
                    columns={columns}
                    rowKey="ticker"
                    expandedRowRender={expandedRowRender}
                    expandedRowKeys={expandedRowKey ? [expandedRowKey] : []}
                    onExpand={onTableRowExpand}
                />
            </div>
        </div>
    );
}

export default PressReleaseHistory;
