require('dotenv').config('.env');

export const CLIENT_ID = process.env.CLIENT_ID as string;
export const CLIENT_SECRET = process.env.CLIENT_SECRET as string;
export const SECRET = process.env.SECRET as string;
export const PORT = process.env.PORT as string;
