import { NextApiRequest, NextApiResponse } from "next";
import opencage from "opencage-api-client";

const geocoder = opencage;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    try {
        const response = await geocoder.geocode({
            q: `${lat},${lng}`,
            key: process.env.OPENCAGE_API_KEY,
            limit: 1,
        });

        if (response.status.code !== 200) {
            throw new Error("Failed to fetch location data");
        }


        const result = response.results[0];

        console.log(result)


        if (!result || !result.components.town) {
            return res.status(404).json({ error: "City not found" });
        }

        res.status(200).json({ city: result.components.town, state: result.components.state });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
}
