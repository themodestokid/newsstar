import express, { Request, Response} from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

const router = express.Router();
dotenv.config();

//This API will make requests based on the users search inputs 

router.post('/search', async (req: Request, res: Response) => {
    try {
        const { from, to, sortBy, sources, q } = req.body; 

        const API_KEY = process.env.API_KEY;
        const baseUrl = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`

        const params: { [key: string]: string } = {}; //creating an object with a key of string and values of string
        
        // Conditionally add parameters if they are provided
        if (q) params.q = q; // Required parameter
        if (from) params.from = from; // Optional parameter
        if (to) params.to = to; // Optional parameter
        if (sortBy) params.sortBy = sortBy; // Optional parameter
        if (sources) params.sources = sources; // Optional parameter

        // Make the request to the News API
        const response = await axios.get(`${baseUrl}&${new URLSearchParams(params).toString()}`);
        res.status(200).json(response.data); // Return the response data

    } catch (error) {
        
        res.status(404).json({error: 'No News Found Matching Your Search Terms Please Try Again'})
    }
})

export default router;