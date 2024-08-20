import  express  from "express";
import { createdata, deleteData, getdata, updateData } from "../controllers/User.js";


// import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
const router = express.Router();


router.post('/data', createdata);
router.get('/data', getdata);
router.delete('/data/:uuid', deleteData);
router.put('/data/:uuid', updateData);




export default router; 

