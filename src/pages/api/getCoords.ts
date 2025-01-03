import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const getCityCoordinates = async (city: string): Promise<{ lat: number; lng: number } | null> => {
  const apiKey = '55f1eed0f6b740e19fd0f385a28ec82c';
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = (await response.json()) as { results: { geometry: { lat: number; lng: number } }[] };
    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { lat, lng };
    } else {
      console.error('No results found for the city');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { city } = req.query;

    if (!city || typeof city !== 'string') {
      return res.status(400).json({ error: 'City is required' });
    }

    const coordinates = await getCityCoordinates(city);
    if (coordinates) {
      return res.status(200).json(coordinates);
    } else {
      return res.status(404).json({ error: 'Coordinates not found' });
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
