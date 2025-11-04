import client from "../services/api"
import { create } from "zustand";

const CrimeService = create((set) =>({
    isSubmittingForm : false,
    isGettingCrimeReports : false,

    //SUBMIT FORM 
    submitForm: async (userData) => {
        set({ isSubmittingForm: true });
        try {
            const res = await client.post('/crime/reports/new', userData);
            set({ authUser: res?.data });
    
            return {
                success: res?.status === 200,
                data: res?.data,
                message: res?.data?.message,
            };
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || "Anonymous Form Submission Error";
            return {
                success: false,
                message: msg
            };
        } finally {
            set({ isSubmittingForm: false });
        }
    },
    getAllReports: async (params = {}) => {
        try {
            const {
                status,
                crimeType,
                search,
                page = 1,
                limit = 10,
                sortBy = 'createdAt',
                sortOrder = 'desc'
            } = params;

            // Build query string
            const queryParams = new URLSearchParams();
            
            if (status) queryParams.append('status', status);
            if (crimeType) queryParams.append('crimeType', crimeType);
            if (search) queryParams.append('search', search);
            queryParams.append('page', page);
            queryParams.append('limit', limit);
            queryParams.append('sortBy', sortBy);
            queryParams.append('sortOrder', sortOrder);

            const response = await client.get(`crime/all-reports?${queryParams.toString()}`, {
                withCredentials: true
            });

            return {
                success: true,
                data: response.data.data,
                pagination: response.data.pagination,
                stats: response.data.stats,
                message: 'Reports fetched successfully'
            };

        } catch (error) {
            console.error('Error fetching reports:', error);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to fetch reports',
                data: [],
                pagination: null,
                stats: null
            };
        }
    },

    // Get single report by reference number
    getReportByReference: async (referenceNumber) => {
        try {
            const response = await client.get(`/reports/${referenceNumber}`, {
                withCredentials: true
            });

            return {
                success: true,
                data: response.data.data,
                message: 'Report fetched successfully'
            };

        } catch (error) {
            console.error('Error fetching report:', error);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Failed to fetch report',
                data: null
            };
        }
    },

    // Get reports statistics
    getReportsStats: async () => {
        try {
            const response = await client.get('/reports/stats', {
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
}))
export default CrimeService