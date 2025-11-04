import express from 'express';
import { 
    createCase, 
    getAllCases, 
    getCaseByCaseNumber, 
    getCaseStats,
    updateCase,
    updateCaseStatus,
} from '../controllers/case.controllers.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes are protectRouteed
router.post('/new', protectRoute, createCase);
router.get('/all', protectRoute, getAllCases);
router.get('/stats', protectRoute, getCaseStats);
router.get('/:caseNumber', protectRoute, getCaseByCaseNumber);
router.patch('/:caseNumber', protectRoute, updateCase);
router.patch('/:caseNumber/status', protectRoute, updateCaseStatus);

export default router;