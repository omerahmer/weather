"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis } from "recharts";

interface WeatherChartProps {
    data: { name: string; temperature: number; windSpeed: number; humidity: number }[];
}

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "222.2 84% 4.9%",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
} satisfies ChartConfig


const WeatherChart = ({ data, dataKey, title, color }: {
    data: { name: string; temperature: number; windSpeed: number; humidity: number }[];
    dataKey: string;
    title: string;
    color: string;
}) => (
    <Card
        className="overflow-hidden text-white"
        style={{
            backgroundColor: "hsl(222.2, 84%, 4.9%)",
            borderRadius: "8px",
            borderColor: "hsl(217.2, 32.6%, 17.5%)",
            padding: "16px",
        }}
    >
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="h-[300px]">
                <ChartContainer config={chartConfig}>
                    <LineChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            strokeWidth={2}
                            dot={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                    </LineChart>
                </ChartContainer>
            </div>
        </CardContent>
    </Card>
);

export default function WeatherCharts({ data }: WeatherChartProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <WeatherChart
                data={data}
                dataKey="temperature"
                title="Temperature (°F)"
                color="hsl(252, 58%, 68%)"
            />
            <WeatherChart
                data={data}
                dataKey="windSpeed"
                title="Wind Speed (mph)"
                color="hsl(145, 38%, 65%)"
            />
            <WeatherChart
                data={data}
                dataKey="humidity"
                title="Humidity (%)"
                color="hsl(41, 100%, 67%)"
            />
        </div>
    );
}

// Parsing Weather Data
interface RawWeatherData {
    properties: {
        periods: {
            name: string;
            temperature: number;
            windSpeed: string;
        }[];
    };
}

export function parseWeatherData(rawWeatherData: RawWeatherData) {
    const { periods } = rawWeatherData.properties;

    return periods.map((period: { name: string; temperature: number; windSpeed: string }) => ({
        name: period.name,
        temperature: period.temperature || 0,
        windSpeed: parseInt(period.windSpeed.split(" ")[0]) || 0,
        humidity: 50, // Placeholder as the actual data lacks humidity
    }));
}
