import OpenAI from "openai";

const openai = (key) =>
  new OpenAI({
    apiKey: key,
    dangerouslyAllowBrowser: true, // This is the default and can be omitted
  });

export default openai;
