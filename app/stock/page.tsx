"use client"; // 必须在文件顶部声明

import React, { useState } from 'react';
import { Form, Input, Button, Table, Card, DatePicker } from 'antd';
import axios from 'axios';
export const runtime = 'edge';

type StockData = {
    date: string;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    tradingVolume: number;
    amplitude: number;
    riseandfall: number;
    riseandfallamount: number;
    turnoverrate: number;
};
type StockQueryValues = {
    stockId: string;
    startDate?: object;
    endDate?: object;
};

export default function StockQuery() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchStockData = async (values:StockQueryValues) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/stock', {
                stockId: values.stockId,
                startDate: values.startDate?.format('YYYYMMDD'),
                endDate: values.endDate?.format('YYYYMMDD'),
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching stock data:', error);
        } finally {
            setLoading(false);
        }
    };

    const onFinish = (values:StockQueryValues) => {
        console.log('Received values:', values);
        fetchStockData(values);
    };

    // console.log('render',data);
    //  console.log(date, open, close, high, low, volume,tradingVolume, amplitude, riseandfall, riseandfallamount, turnoverrate);
    const columns = [
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: '开盘价',
          dataIndex: 'open',
          key: 'open',
        },
        {
          title: '收盘价',
          dataIndex: 'close',
          key: 'close',
        },
        {
          title: '最高价',
          dataIndex: 'high',
          key: 'high',
        },
        {
          title: '最低价',
          dataIndex: 'low',
          key: 'low',
        },
        {
          title: '成交量',
          dataIndex: 'volume',
          key: 'volume',
        },
        {
          title: '成交额',
          dataIndex: 'tradingVolume',
          key: 'tradingVolume',
        },
        {
          title: '振幅',
          dataIndex: 'amplitude',
          key: 'amplitude',
        },
        {
          title: '涨跌幅',
          dataIndex: 'riseandfall',
          key: 'riseandfall',
        },
        {
          title: '涨跌额',
          dataIndex: 'riseandfallamount',
          key: 'riseandfallamount',
        },
        {
          title: '换手率',
          dataIndex: 'turnoverrate',
          key: 'turnoverrate',
        },
      
      ];
    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
            <Card style={{ marginBottom: '20px' }}>
                <Form layout="inline" onFinish={onFinish}>
                    <Form.Item
                        name="stockId"
                        label="股票ID"
                        rules={[{ required: true, message: '请输入股票ID!' }]}
                    >
                        <Input placeholder="输入股票ID" style={{ width: '200px' }} />
                    </Form.Item>
                    <Form.Item
                        name="startDate"
                        label="开始日期"
                        rules={[{ required: false, message: '请选择开始日期!' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        name="endDate"
                        label="结束日期"
                        rules={[{ required: false, message: '请选择结束日期!' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">查询</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card>
                <Table 
                    dataSource={data} 
                    key={data.date}
                    columns={columns}
                    loading={loading} 
                    pagination={{ pageSize: 5 }}
                    bordered
                />
            </Card>
        </div>
    );
}