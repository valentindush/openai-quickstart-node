import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    
    const {prompt} = req.body;

    if(!prompt) return res.status(400).json({error: 'No prompt provided'})
    const model = 'image-alpha-001'
    const openai = new OpenAIApi(configuration);

    try {
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        model: model,
        size: "1024x1024",
      });
      res.status(200).json({ imageURL: response.data.data[0].url })

    } catch (err) {
      res.status(500).json({error: err})
    }


}