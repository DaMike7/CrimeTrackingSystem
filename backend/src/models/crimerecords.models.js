import mongoose from "mongoose";

const anonymousReportSchema = new mongoose.Schema(
    {
        referenceNumber: {
            type: String,
            required: true,
            unique: true,
        },

        crimeType: {
            type: String,
            required: true,
            enum: ['theft', 'assault', 'drugs', 'vandalism', 'suspicious', 'other'],
        },

        location: {
            type: String,
            required: true,
        },

        incidentDate: {
            type: Date,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ['pending', 'investigating', 'resolved', 'closed'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

const AnonymousReport = mongoose.model("AnonymousReport", anonymousReportSchema);


const caseSchema = new mongoose.Schema(
    {
        caseNumber: {
            type: String,
            required: true,
            unique: true,
        },

        caseTitle: {
            type: String,
            required: true,
        },

        caseType: {
            type: String,
            required: true,
            enum: ['theft', 'assault', 'homicide', 'drugs', 'fraud', 'vandalism', 'other'],
        },

        description: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            required: true,
        },

        incidentDate: {
            type: Date,
            required: true,
        },

        suspects: {
            type: String,
        },

        status: {
            type: String,
            enum: ['open', 'investigating', 'solved', 'closed'],
            default: 'open',
        },

        assignedOfficer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);


const Case = mongoose.model("Case", caseSchema);

export { AnonymousReport, Case };