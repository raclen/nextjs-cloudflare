
import { NextResponse } from 'next/server';
import axios from 'axios'
import moment from 'moment'


export const runtime = 'edge';





async function getStockIndexData(params: { stockCode: string, endDate: string, startDate: string, Prefix: string }) {

    const { stockCode, endDate, startDate, Prefix } = params;
    try {
        // 构造 secid 参数
        const secid = `${Prefix}.${stockCode}`; // 假设股票代码前缀为 "1."

        const response = await axios.get('http://push2his.eastmoney.com/api/qt/stock/kline/get', {
            params: {
                secid,              // 股票代码
                fields1: 'f1,f2,f3,f4,f5,f6',
                fields2: 'f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61',
                klt: '101',         // 日K线
                fqt: '1',           // 前复权
                beg: startDate,    // 开始日期
                end: endDate,    // 结束日期
                lmt: '1000000',     // 最大条数
                _: Date.now()
            },
            headers: {
                'Referer': 'http://quote.eastmoney.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.data || !response.data.data || !response.data.data.klines) {
            throw new Error('数据格式错误');
        }

        // console.log(response.data.data);
        

        const klineData = response.data.data.klines;

        const stockData: any[] = [];

        klineData.forEach((line:string) => {
            const [dateStr, open, close, high, low, volume,tradingVolume, amplitude, riseandfall, riseandfallamount, turnoverrate] = line.split(',');
            const date = moment(dateStr).format('YYYY-MM-DD')
            stockData.push({
                date,
                open,
                close,
                high,
                low,
                volume,
                tradingVolume,
                amplitude,
                riseandfall,
                riseandfallamount,
                turnoverrate
            })
            console.log(date, open, close, high, low, volume,tradingVolume, amplitude, riseandfall, riseandfallamount, turnoverrate);
          
        });
        return stockData

    } catch (error: any) {
        console.error('数据获取失败：', error.message);
        if (error.response) {
            console.error('错误详情：', error.response.data);
        }
    }
}



// 处理 GET 请求
export async function POST(req: Request) {
    const body = await req.json()
    // 获取请求参数
    const { stockId,endDate,startDate} = body
    const data = await getStockIndexData({
        stockCode: stockId,
        endDate,
        startDate,
        Prefix: '1'
    })
    // console.log(data);
    
    return NextResponse.json(data);
}