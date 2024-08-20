import  express  from "express";
import { createdata, getdata } from "../controllers/Upload.js";


// import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();


router.post('/datas', createdata);


router.get('/datas', getdata);




export default router; 

