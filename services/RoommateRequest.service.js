const RoommateRequest = require("../models/RoommateRequest");
const { get_query } = require("../utils/mongooseUtils");

const RoommateRequestService = {
    create: async (data) => {
        const result = await RoommateRequest.create(data);
        return result;
    },

    getAll: async (query) => {
        const { data, meta, page, pageSize } = get_query(
            RoommateRequest,
            query
        );

        const [singlePageData, totalDocs] = await Promise.all([data, meta]);

        return {
            data: singlePageData,
            metaData: {
                page,
                totalPages: Math.ceil(totalDocs[0]?.count / pageSize),
                perPage: pageSize,
                total: totalDocs[0]?.count,
            },
        };
    },

    getById: async (requestId) => {
        const result = await RoommateRequest.findOne({ _id: requestId });
        return result;
    },

    update: async (requestId, data) => {
        const result = await RoommateRequest.findOneAndUpdate(
            { _id: requestId },
            data,
            {
                returnNewDocument: true,
            }
        );

        return result;
    },

    delete: async (requestId) => {
        const result = await RoommateRequest.deleteOne({ _id: requestId });
        return result;
    },
};

module.exports = RoommateRequestService;
