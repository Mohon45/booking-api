
const User = require('../models/user');
const { get_query } = require("../utils/mongooseUtils");

const UserService = {
    create: async (data) => {
        const user = new User(data);
        await user.save();
        return user;
    },

    getAll: async (query) => {
        const { data, meta, page, pageSize } = get_query(User, query);

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
  
    getById: async (userId) => {
        const user = await User.findOne({ _id: userId });
        return user;
    },
  
    update: async (userId, data) => {
        const result = await User.findOneAndUpdate({ _id: userId }, data, {
            returnNewDocument: true,
    });
    
        return result;
    },
  
    delete: async (userId) => {
        const result = await User.deleteOne({ _id: userId });
        return result;
    }
};

module.exports = UserService;
