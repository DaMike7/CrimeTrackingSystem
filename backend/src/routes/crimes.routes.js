import express from 'express'
const router = express.Router();
import {
    createReport,
    getAllReports,
    getReportByReference,
    getReportsStats
} from '../controllers/crime.controllers.js'

// Public route
router.post('/reports/new', createReport);
router.get('/all-reports', getAllReports);
router.get('/reports/stats', getReportsStats);
router.get('/:referenceNumber', getReportByReference);

export default router;