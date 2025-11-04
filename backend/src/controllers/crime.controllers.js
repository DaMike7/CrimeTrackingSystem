import { AnonymousReport } from "../models/crimerecords.models.js";

// Generate unique reference number
const generateReferenceNumber = async () => {
    const year = new Date().getFullYear();
    const prefix = `RPT-${year}-`;
    
    // Find the latest report for this year
    const latestReport = await AnonymousReport.findOne({
        referenceNumber: new RegExp(`^${prefix}`)
    }).sort({ createdAt: -1 });
    
    let nextNumber = 1;
    if (latestReport) {
        const lastNumber = parseInt(latestReport.referenceNumber.split('-')[2]);
        nextNumber = lastNumber + 1;
    }
    
    // Pad with zeros (6 digits)
    const referenceNumber = `${prefix}${String(nextNumber).padStart(6, '0')}`;
    return referenceNumber;
};

export const createReport = async (req, res) => {
    try {
        const { crimeType, location, incidentDate, description } = req.body;

        // Validation
        if (!crimeType || !location || !incidentDate || !description) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: crimeType, location, incidentDate, description'
            });
        }

        // Validate crime type
        const validCrimeTypes = ['theft', 'assault', 'drugs', 'vandalism', 'suspicious', 'other'];
        if (!validCrimeTypes.includes(crimeType)) {
            return res.status(400).json({
                success: false,
                message: `Invalid crime type. Must be one of: ${validCrimeTypes.join(', ')}`
            });
        }

        // Validate incident date
        const incidentDateObj = new Date(incidentDate);
        if (isNaN(incidentDateObj.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid incident date format'
            });
        }

        // Check if incident date is not in the future
        if (incidentDateObj > new Date()) {
            return res.status(400).json({
                success: false,
                message: 'Incident date cannot be in the future'
            });
        }

        // Generate unique reference number
        const referenceNumber = await generateReferenceNumber();

        // Create report
        const report = await AnonymousReport.create({
            referenceNumber,
            crimeType,
            location,
            incidentDate: incidentDateObj,
            description,
            status: 'pending'
        });

        res.status(201).json({
            success: true,
            message: 'Crime report submitted successfully',
            data: {
                referenceNumber: report.referenceNumber,
                report
            }
        });

    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create report',
            error: error.message
        });
    }
};

export const getAllReports = async (req, res) => {
    try {
        const {
            status,
            crimeType,
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

        if (crimeType) {
            filter.crimeType = crimeType;
        }

        if (search) {
            filter.$or = [
                { referenceNumber: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

        // Get reports with pagination
        const reports = await AnonymousReport.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const totalReports = await AnonymousReport.countDocuments(filter);

        // Get statistics
        const stats = await AnonymousReport.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Format stats
        const statsFormatted = {
            total: totalReports,
            pending: stats.find(s => s._id === 'pending')?.count || 0,
            investigating: stats.find(s => s._id === 'investigating')?.count || 0,
            resolved: stats.find(s => s._id === 'resolved')?.count || 0,
            closed: stats.find(s => s._id === 'closed')?.count || 0
        };

        res.status(200).json({
            success: true,
            data: reports,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalReports / parseInt(limit)),
                totalReports,
                limit: parseInt(limit),
                hasNextPage: skip + reports.length < totalReports,
                hasPrevPage: parseInt(page) > 1
            },
            stats: statsFormatted
        });

    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reports',
            error: error.message
        });
    }
};

export const getReportByReference = async (req, res) => {
    try {
        const { referenceNumber } = req.params;

        const report = await AnonymousReport.findOne({ referenceNumber });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        res.status(200).json({
            success: true,
            data: report
        });

    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch report',
            error: error.message
        });
    }
};


export const getReportsStats = async (req, res) => {
    try {
        // Status distribution
        const statusStats = await AnonymousReport.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Crime type distribution
        const crimeTypeStats = await AnonymousReport.aggregate([
            {
                $group: {
                    _id: '$crimeType',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Recent reports (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const recentReportsCount = await AnonymousReport.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        // Total reports
        const totalReports = await AnonymousReport.countDocuments();

        res.status(200).json({
            success: true,
            data: {
                total: totalReports,
                recentReports: recentReportsCount,
                statusDistribution: statusStats,
                crimeTypeDistribution: crimeTypeStats
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
