import { useEffect, useRef } from 'react';
import { createChart, ColorType, AreaSeries } from 'lightweight-charts';
import { useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import TimeSeriesData from './TimeSeriesData';

const TimeSeriesChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const chartContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;
        const logo = document.getElementById('tv-attr-logo');
        if (logo) logo.remove();
    
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: colors.primary[900] },
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
        });
    
        const newSeries = chart.addSeries(AreaSeries, {
            lineColor: colors.primary[100],
            topColor: colors.blueAccent[900],
            bottomColor: colors.blueAccent[100],
        });
    
        newSeries.setData(TimeSeriesData());
    
        return () => {
            chart.remove();
        };

    }, [theme.palette.mode, colors]);

    return  <div ref={chartContainerRef} style={{ width: '100%', height: '200px' }} />;
}

export default TimeSeriesChart;
