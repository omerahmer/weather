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
        windSpeed: string; // Adjusted to match the API's format
        windDirection: string;
    }

    const formattedData = periods.map((period: Period) => ({
        name: period.name,
        temperature: period.temperature,
        precipitation: period.precipitation ?? 0,
        humidity: period.humidity ?? 0,
        windSpeed: parseInt(period.windSpeed) || 0, // Extracting numerical value from "X mph"
        windDirection: period.windDirection,
    }));

    return (
        <div className="space-y-8 p-8">
            {/* Main Weather Data Points */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="text-white" style={{
                    backgroundColor: "hsl(222.2, 84%, 4.9%)",
                    borderRadius: "8px",
                    borderColor: "hsl(217.2, 32.6%, 17.5%)",
                }}>
                    <CardHeader>
                        <CardTitle>Temperature</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {formattedData[0].temperature}° Fahrenheit
                        </p>
                    </CardContent>
                </Card>
                <Card className="text-white" style={{
                    backgroundColor: "hsl(222.2, 84%, 4.9%)",
                    borderRadius: "8px",
                    borderColor: "hsl(217.2, 32.6%, 17.5%)",
                }}>
                    <CardHeader>
                        <CardTitle>Precipitation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {formattedData[0].precipitation}%
                        </p>
                    </CardContent>
                </Card>
                <Card className="text-white" style={{
                    backgroundColor: "hsl(222.2, 84%, 4.9%)",
                    borderRadius: "8px",
                    borderColor: "hsl(217.2, 32.6%, 17.5%)",
                }}>
                    <CardHeader>
                        <CardTitle>Humidity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {formattedData[0].humidity}%
                        </p>
                    </CardContent>
                </Card>
                <Card className="text-white" style={{
                    backgroundColor: "hsl(222.2, 84%, 4.9%)",
                    borderRadius: "8px",
                    borderColor: "hsl(217.2, 32.6%, 17.5%)",
                }}>
                    <CardHeader>
                        <CardTitle>Wind Speed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {formattedData[0].windSpeed} mph
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Weather Charts */}
            <WeatherCharts data={formattedData} />
        </div>
    );
}
