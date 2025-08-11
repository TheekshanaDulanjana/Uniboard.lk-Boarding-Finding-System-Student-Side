import express from 'express'; 
import { getListings, getListing, bookListing, getListingCount } from '../controllers/listing.controller.js'; 
const router = express.Router(); 

router.get('/get/:id', getListing);
router.get('/get', getListings);
router.get('/count', getListingCount);
router.put('/book/:id', bookListing);

export default router;