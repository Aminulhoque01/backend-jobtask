import express, { Application, NextFunction, Request, Response } from "express";

import cors from 'cors';
import { UserRoutes } from "./app/modules/users/users.route";
import ApiError from "./error/apiError";
import router from "./Routers";

const app:Application = express();
const port = 3000;

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Application routers
app.use('/api/v1/', router)


// app.get('/', async(req:Request, res:Response, next:NextFunction) => {
//   throw new ApiError(400,'error')
//   res.send('Working successfully')
// })

export default app;