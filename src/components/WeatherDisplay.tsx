"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useWeatherStore } from "@/lib/store";
import WeatherCharts from "./WeatherCharts";

export default function WeatherDisplay() {
    const { weatherData, coordinates } = useWeatherStore();

    if (!weatherData) {
        return (
            <div>
                <h2 className="text-center text-xl m-4">
                    Enter a city name to fetch weather data.
                </h2>
                <p className="text-center">
                    {coordinates && ` Using coordinates: ${coordinates.lat}, ${coordinates.lng}`}
                </p>
            </div>
        );
    }

    const { periods } = weatherData.properties;

    interface Period {
        name: string;
        temperature: number;
        precipitation?: number;
        humidity?: number;
        windSpeed: number;
        windDirection: string;
    }

    const formattedData = periods.map((period: Period) => ({
        name: period.name,
        temperature: period.temperature,
        precipitation: period.precipitation ?? 0,
        humidity: period.humidity ?? 0,
        windSpeed: period.windSpeed,
        windDirection: period.windDirection,
    }));

    return (
        <div className="space-y-8 p-8">
            {/* Main Weather Data Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Temperature", "Precipitation", "Humidity"].map((key, index) => (
                    <Card key={index} className="text-white" style={{
                        backgroundColor: "hsl(222.2, 84%, 4.9%)",
                        borderRadius: "8px",
                        borderColor: "hsl(217.2, 32.6%, 17.5%)",
                    }}>
                        <CardHeader>
                            <CardTitle>{key}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {formattedData[0][key.toLowerCase()]}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Weather Charts */}
            <WeatherCharts data={formattedData} />
        </div>
    );
}
