
const ActionLog = require('../models/actionLog');
const { get_query } = require("../utils/mongooseUtils");

const ActionLogService = {
    create: async (data) => {
        const actionlog = new ActionLog(data);
        await actionlog.save();
        return actionlog;
    },

    getAll: async (query) => {
        const { data, meta, page, pageSize } = get_query(ActionLog, query);

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
  
    getById: async (actionlogId) => {
        const actionlog = await ActionLog.findOne({ _id: actionlogId });
        return actionlog;
    },
  
    update: async (actionlogId, data) => {
        const result = await ActionLog.findOneAndUpdate({ _id: actionlogId }, data, {
            returnNewDocument: true,
    });
    
        return result;
    },
  
    delete: async (actionlogId) => {
        const result = await ActionLog.deleteOne({ _id: actionlogId });
        return result;
    }
};

module.exports = ActionLogService;
