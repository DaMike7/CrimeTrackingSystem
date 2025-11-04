import client from './api.js'

const CaseService = {
    createCase: async (caseData) => {
        try {
            const response = await client.post('/case/new', caseData, {
                withCredentials: true
            });

            return {
                success: true,
                data: response.data.data,
                message: response.data.message || 'Case created successfully'
            };

        } catch (error) {
            console.error('Error creating case:', error);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to create case',
                data: null
            };
        }
    },

    // Get all cases with filters and pagination
    getAllCases: async (params = {}) => {
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
            } = params;

            // Build query string
            const queryParams = new URLSearchParams();
            
            if (status) queryParams.append('status', status);
            if (caseType) queryParams.append('caseType', caseType);
            if (assignedOfficer) queryParams.append('assignedOfficer', assignedOfficer);
            if (search) queryParams.append('search', search);
            queryParams.append('page', page);
            queryParams.append('limit', limit);
            queryParams.append('sortBy', sortBy);
            queryParams.append('sortOrder', sortOrder);

            const response = await client.get(`/case/all?${queryParams.toString()}`, {
                withCredentials: true
            });

            return {
                success: true,
                data: response.data.data,
                pagination: response.data.pagination,
                stats: response.data.stats,
                message: 'Cases fetched successfully'
            };

        } catch (error) {
            console.error('Error fetching cases:', error);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to fetch cases',
                data: [],
                pagination: null,
                stats: null
            };
        }
    },

    // Get single case by case number
    getCaseByCaseNumber: async (caseNumber) => {
        try {
            const response = await client.get(`/case/${caseNumber}`, {
                withCredentials: true
            });

            return {
                success: true,
                data: response.data.data,
                message: 'Case fetched successfully'
            };

        } catch (error) {
            console.error('Error fetching case:', error);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to fetch case',
                data: null
            };
        }
    },

    // Update case
    updateCase: async (caseNumber, updateData) => {
        try {
            const response = await client.patch(
                `/case/${caseNumber}`,
                updateData,
                { withCredentials: true }
            );

            return {
                success: true,
                data: response.data.data,
                message: response.data.message || 'Case updated successfully'
            };

        } catch (error) {
            console.error('Error updating case:', error);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to update case',
                data: null
            };
        }
    },

    // Update case status
    updateCaseStatus: async (caseNumber, status) => {
        try {
            const response = await client.patch(
                `/case/${caseNumber}/status`,
                { status },
                { withCredentials: true }
            );

            return {
                success: true,
                data: response.data.data,
                message: response.data.message || 'Status updated successfully'
            };

        } catch (error) {
            console.error('Error updating case status:', error);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to update status',
                data: null
            };
        }
    },

    // Get case statistics
    getCaseStats: async () => {
        try {
            const response = await client.get('/cases/stats', {
                withCredentials: true
            });

            return {
                success: true,
                data: response.data.data,
                message: 'Statistics fetched successfully'
            };

        } catch (error) {
            console.error('Error fetching statistics:', error);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to fetch statistics',
                data: null
            };
        }
    },

};

export default CaseService;