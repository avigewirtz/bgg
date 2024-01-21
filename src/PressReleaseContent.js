import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DatePicker, Form, Button, Input, Row, Col, Select } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updatePage } from './Upload';

import {

    generate_ipo_html,
    generate_class_period_html,
    generate_class_period_and_ipo_html,
   
} from './generate';

const { TextArea } = Input;
const { Option } = Select;

function PressReleaseContent() {
    const location = useLocation();
    const pressRelease = location.state || {};
    const [form] = Form.useForm();
    const [caseType, setCaseType] = useState(pressRelease.caseType || '');
    const [content, setContent] = useState(pressRelease.content || '');

    const { ipoDate, classPeriodStartDate, classPeriodEndDate, caseDetails, leadPlaintiffDeadline } = form.getFieldsValue([
        'ipoDate', 
        'classPeriodStartDate', 
        'classPeriodEndDate', 
        'caseDetails', 
        'leadPlaintiffDeadline'
    ]);


    const handleSubmit = async () => {
        const formValues = await form.validateFields();
        let updatedContent = '';
        

        switch (caseType) {
            case 'Class period and IPO':
                updatedContent = generate_class_period_and_ipo_html(
                    pressRelease.fullName,
                    pressRelease.ticker,
                    pressRelease.shortName,
                    pressRelease.exchange,
                    formValues.ipoDate ? formValues.ipoDate.format('YYYY-MM-DD') : null,
                    formValues.classPeriodStartDate ? formValues.classPeriodStartDate.format('YYYY-MM-DD') : null,
                    formValues.classPeriodEndDate ? formValues.classPeriodEndDate.format('YYYY-MM-DD') : null,
                    formValues.caseDetails,
                    formValues.leadPlaintiffDeadline ? formValues.leadPlaintiffDeadline.format('YYYY-MM-DD') : null
                );
                break;
            case 'IPO':
                updatedContent = generate_ipo_html(
                    pressRelease.fullName,
                    pressRelease.ticker,
                    pressRelease.shortName,
                    pressRelease.exchange,
                    formValues.ipoDate ? formValues.ipoDate.format('YYYY-MM-DD') : null,
                    formValues.caseDetails,
                    formValues.leadPlaintiffDeadline ? formValues.leadPlaintiffDeadline.format('YYYY-MM-DD') : null
                );
                break;
            case 'Class period':
                updatedContent = generate_class_period_html(
                    pressRelease.fullName,
                    pressRelease.ticker,
                    pressRelease.shortName,
                    pressRelease.exchange,
                    formValues.classPeriodStartDate ? formValues.classPeriodStartDate.format('YYYY-MM-DD') : null,
                    formValues.classPeriodEndDate ? formValues.classPeriodEndDate.format('YYYY-MM-DD') : null,
                    formValues.caseDetails,
                    formValues.leadPlaintiffDeadline ? formValues.leadPlaintiffDeadline.format('YYYY-MM-DD') : null
                );
                break;
            // ... other case types ...
            default:
                updatedContent = ''; // default case
                break;
        }

        setContent(updatedContent); // Update the content state with the new content
    };

    const handleUpdateSite = async () => {
        try {
            // Validate and get the current values from the form fields
            const formValues = await form.validateFields();
            
            // Extract the necessary data from formValues
            const updatedIpoDate = formValues.ipoDate ? formValues.ipoDate.format('YYYY-MM-DD') : null;
            const updatedClassPeriodStartDate = formValues.classPeriodStartDate ? formValues.classPeriodStartDate.format('YYYY-MM-DD') : null;
            const updatedClassPeriodEndDate = formValues.classPeriodEndDate ? formValues.classPeriodEndDate.format('YYYY-MM-DD') : null;
            const updatedLeadPlaintiffDeadline = formValues.leadPlaintiffDeadline ? formValues.leadPlaintiffDeadline.format('YYYY-MM-DD') : null;
            const updatedCaseDetails = formValues.caseDetails;
    
            // Assuming content from the rich text editor is the updated content
            const updatedContent = content; 
    
            // Call the updatePage function with the necessary arguments
            await updatePage(
                pressRelease.wordpressPageId, // WordPress page ID
                pressRelease.ticker, // Ticker
                pressRelease.fullName, // Full Name
                caseType, // Updated case type
                updatedLeadPlaintiffDeadline,
                updatedClassPeriodStartDate,
                updatedClassPeriodEndDate,
                updatedCaseDetails,
                updatedIpoDate,
                updatedContent, // Updated content from rich text editor
                // ... (any other fields needed for the update)
            );
    
            // Handle success - display a success message or perform other actions as needed
            console.log('Page updated successfully.');
    
        } catch (error) {
            // Handle errors - display error messages or perform other error handling
            console.error('Error updating page:', error);
        }
    };
    
    const handleCaseTypeChange = (value) => {
        setCaseType(value);
    };

    const handleContentChange = (value) => {
        setContent(value);
    };




    const renderFormFields = () => {
        switch (caseType) {
            case 'IPO':
                return (
                    <>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="IPO Date" name="ipoDate">
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Lead Plaintiff Deadline" name="leadPlaintiffDeadline">
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Case Details" name="caseDetails">
                            <TextArea />
                        </Form.Item>
                    </>
                );
            case 'Class period':
                return (
                    <>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Class Period Start Date" name="classPeriodStartDate">
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Class Period End Date" name="classPeriodEndDate">
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Case Details" name="caseDetails">
                            <TextArea />
                        </Form.Item>
                    </>
                );
            case 'Class period and IPO':
                return (
                    <>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="IPO Date" name="ipoDate">
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Class Period Start Date" name="classPeriodStartDate">
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Class Period End Date" name="classPeriodEndDate">
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Lead Plaintiff Deadline" name="leadPlaintiffDeadline">
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Case Details" name="caseDetails">
                            <TextArea />
                        </Form.Item>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <Form form={form} layout="vertical">
                <Form.Item label="Case Type" name="caseType">
                    <Select defaultValue={caseType} onChange={handleCaseTypeChange}>
                        <Option value="Class period">Class period</Option>
                        <Option value="IPO">IPO</Option>
                        <Option value="Class period and IPO">Class period and IPO</Option>
                    </Select>
                </Form.Item>
                {renderFormFields()}
                <Button type="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
                    Update Release
                </Button>
            </Form>

            <h2>Content</h2>
            <ReactQuill value={content} onChange={handleContentChange} theme="snow" />
            <Button type="primary" onClick={handleUpdateSite} style={{ marginTop: '20px' }}>
                Update Site
            </Button>
        </div>
    );
}

export default PressReleaseContent;
