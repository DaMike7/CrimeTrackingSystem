import Case from '../models/crimerecords.models'

// Generate unique case number
const generateCaseNumber = async () => {
    const year = new Date().getFullYear();
    const prefix = `CASE-${year}-`;
    
    // Find the latest case for this year
    const latestCase = await Case.findOne({
        caseNumber: new RegExp(`^${prefix}`)
    }).sort({ createdAt: -1 });
    
    let nextNumber = 1;
    if (latestCase) {
        const lastNumber = parseInt(latestCase.caseNumber.split('-')[2]);
        nextNumber = lastNumber + 1;
    }
    
    // Pad with zeros (6 digits)
    const caseNumber = `${prefix}${String(nextNumber).padStart(6, '0')}`;
    return caseNumber;
};

// @desc    Create new case
// @route   POST /api/cases
// @access  Private (officers only)
export const createCase = async (req, res) => {
    try {
        const {
            caseTitle,
            caseType,
            description,
            location,
            incidentDate,
            suspects,
            status,
            assignedOfficer
        } = req.body;

        // Validation
        if (!caseTitle || !caseType || !description || !location || !incidentDate || !assignedOfficer) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: caseTitle, caseType, description, location, incidentDate, assignedOfficer'
            });
        }

        // Validate case type
        const validCaseTypes = ['theft', 'assault', 'homicide', 'drugs', 'fraud', 'vandalism', 'other'];
        if (!validCaseTypes.includes(caseType)) {
            return res.status(400).json({
                success: false,
                message: `Invalid case type. Must be one of: ${validCaseTypes.join(', ')}`
            });
        }

        // Validate status if provided
        if (status) {
            const validStatuses = ['open', 'investigating', 'solved', 'closed'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
                });
            }
        }

        // Validate incident date
        const incidentDateObj = new Date(incidentDate);
        if (isNaN(incidentDateObj.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid incident date format'
            });
        }

        // Generate unique case number
        const caseNumber = await generateCaseNumber();

        // Create case - createdBy is the authenticated user
        const newCase = await Case.create({
            caseNumber,
            caseTitle,
            caseType,
            description,
            location,
            incidentDate: incidentDateObj,
            suspects: suspects || '',
            status: status || 'open',
            assignedOfficer,
            createdBy: req.user._id // Assuming auth middleware sets req.user
        });

        // Populate officer details
        await newCase.populate('assignedOfficer', 'fullName email');
        await newCase.populate('createdBy', 'fullName email');

        res.status(201).json({
            success: true,
            message: 'Case created successfully',
            data: newCase
        });

    } catch (error) {
        console.error('Error creating case:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create case',
            error: error.message
        });
    }
};

// @desc    Get all cases
// @route   GET /api/cases
// @access  Private (officers only)
export const getAllCases = async (req, res) => {
    try {
        const {
            status,
            caseType,
            assignedOfficer,
            search,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        // Build filter object
        const filter = {};

        if (status) {
            filter.status = status;
        }

        if (caseType) {
            filter.caseType = caseType;
        }

        if (assignedOfficer) {
            filter.assignedOfficer = assignedOfficer;
        }

        // Search by case number, title, location, or description
        if (search) {
            filter.$or = [
                { caseNumber: { $regex: search, $options: 'i' } },
                { caseTitle: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

        // Get cases with pagination and populate officer details
        const cases = await Case.find(filter)
            .populate('assignedOfficer', 'fullName email')
            .populate('createdBy', 'fullName email')
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const totalCases = await Case.countDocuments(filter);

        // Get statistics
        const stats = await Case.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Format stats
        const statsFormatted = {
            total: totalCases,
            open: stats.find(s => s._id === 'open')?.count || 0,
            investigating: stats.find(s => s._id === 'investigating')?.count || 0,
            solved: stats.find(s => s._id === 'solved')?.count || 0,
            closed: stats.find(s => s._id === 'closed')?.count || 0
        };

        res.status(200).json({
            success: true,
            data: cases,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCases / parseInt(limit)),
                totalCases,
                limit: parseInt(limit),
                hasNextPage: skip + cases.length < totalCases,
                hasPrevPage: parseInt(page) > 1
            },
            stats: statsFormatted
        });

    } catch (error) {
        console.error('Error fetching cases:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch cases',
            error: error.message
        });
    }
};

export const getCaseByCaseNumber = async (req, res) => {
    try {
        const { caseNumber } = req.params;

        const caseData = await Case.findOne({ caseNumber })
            .populate('assignedOfficer', 'fullName email phoneNumber')
            .populate('createdBy', 'fullName email');

        if (!caseData) {
            return res.status(404).json({
                success: false,
                message: 'Case not found'
            });
        }

        res.status(200).json({
            success: true,
            data: caseData
        });

    } catch (error) {
        console.error('Error fetching case:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch case',
            error: error.message
        });
    }
};

export const updateCase = async (req, res) => {
    try {
        const { caseNumber } = req.params;
        const updateData = req.body;

        // Don't allow updating caseNumber or createdBy
        delete updateData.caseNumber;
        delete updateData.createdBy;

        const updatedCase = await Case.findOneAndUpdate(
            { caseNumber },
            updateData,
            { new: true, runValidators: true }
        )
            .populate('assignedOfficer', 'fullName email')
            .populate('createdBy', 'fullName email');

        if (!updatedCase) {
            return res.status(404).json({
                success: false,
                message: 'Case not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Case updated successfully',
            data: updatedCase
        });

    } catch (error) {
        console.error('Error updating case:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update case',
            error: error.message
        });
    }
};

export const updateCaseStatus = async (req, res) => {
    try {
        const { caseNumber } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['open', 'investigating', 'solved', 'closed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
            });
        }

        const updatedCase = await Case.findOneAndUpdate(
            { caseNumber },
            { status },
            { new: true, runValidators: true }
        )
            .populate('assignedOfficer', 'fullName email')
            .populate('createdBy', 'fullName email');

        if (!updatedCase) {
            return res.status(404).json({
                success: false,
                message: 'Case not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Case status updated successfully',
            data: updatedCase
        });

    } catch (error) {
        console.error('Error updating case status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update case status',
            error: error.message
        });
    }
};

export const deleteCase = async (req, res) => {
    try {
        const { caseNumber } = req.params;

        const deletedCase = await Case.findOneAndDelete({ caseNumber });

        if (!deletedCase) {
            return res.status(404).json({
                success: false,
                message: 'Case not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Case deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting case:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete case',
            error: error.message
        });
    }
};

export const getCaseStats = async (req, res) => {
    try {
        // Status distribution
        const statusStats = await Case.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Case type distribution
        const caseTypeStats = await Case.aggregate([
            {
                $group: {
                    _id: '$caseType',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Recent cases (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const recentCasesCount = await Case.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        // Cases by assigned officer
        const casesByOfficer = await Case.aggregate([
            {
                $group: {
                    _id: '$assignedOfficer',
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'officer'
                }
            },
            {
                $unwind: '$officer'
            },
            {
                $project: {
                    officerId: '$_id',
                    officerName: '$officer.fullName',
                    caseCount: '$count'
                }
            },
            {
                $sort: { caseCount: -1 }
            },
            {
                $limit: 10
            }
        ]);

        // Total cases
        const totalCases = await Case.countDocuments();

        res.status(200).json({
            success: true,
            data: {
                total: totalCases,
                recentCases: recentCasesCount,
                statusDistribution: statusStats,
                caseTypeDistribution: caseTypeStats,
                casesByOfficer
            }
        });

    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics',
            error: error.message
        });
    }
};