import express, { Request, Response} from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

const router = express.Router();
dotenv.config();

//This API will fetch the news data from the newsapi 
// and return general data the first time the user logs in

router.get('/news', async (_req: Request, res: Response) => {
    try {
        const API_KEY = process.env.API_KEY;
        const baseUrl = `https://newsapi.org/v2/everything?q=general&apiKey=${API_KEY}`

        const response = await axios.get(baseUrl);

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'})
    }
})

export default router;