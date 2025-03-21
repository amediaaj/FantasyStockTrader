import { useEffect, useRef } from 'react';
import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';
import { useTheme } from '@mui/material';
import { tokens } from '../../../lib/themes/theme';
import { TimeSeriesDaily } from '../../../lib/types';

type Props = {
    timeseriesDaily: TimeSeriesDaily
}

const TimeSeriesChart = ({timeseriesDaily}: Props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const chartContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;
        const logo = document.getElementById('tv-attr-logo');
        if (logo) logo.remove();
    
        const chart = createChart(chartContainerRef.current, {
            layout: {
                textColor: colors.primary[200],
                background: { type: ColorType.Solid, color: colors.primary[900] },
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
        });

        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
            wickUpColor: '#26a69a', wickDownColor: '#ef5350',
        });

        //TODO: Refactor types so that this conversion can be avoided
        const flattenedList = Object.entries(timeseriesDaily).map(([date, data]) => ({
            time: date,
            open: Number(data['1. open']),
            high: Number(data['2. high']),
            low: Number(data['3. low']),
            close: Number(data['4. close'])
        }))
        .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

        candlestickSeries.setData(flattenedList)

        //TODO: Change to appropriate time scale
        // chart.timeScale().fitContent();
    
        return () => {
            chart.remove();
        };

    }, [theme.palette.mode, colors, timeseriesDaily]);

    return  <div ref={chartContainerRef} style={{ width: '100%', height: '200px' }} />;
}

export default TimeSeriesChart;
