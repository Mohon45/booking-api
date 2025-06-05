const Rental = require("../models/Rental");
const { get_query } = require("../utils/mongooseUtils");

const RentalService = {
    create: async (data) => {
        const result = await Rental.create(data);
        return result;
    },

    getAll: async (query) => {
        const { data, meta, page, pageSize } = get_query(Rental, query);

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

    getById: async (rentalId) => {
        const result = await Rental.findOne({ _id: rentalId });
        return result;
    },

    update: async (rentalId, data) => {
        const result = await Rental.findOneAndUpdate({ _id: rentalId }, data, {
            returnNewDocument: true,
        });

        return result;
    },

    delete: async (rentalId) => {
        const result = await Rental.deleteOne({ _id: rentalId });
        return result;
    },
};

module.exports = RentalService;
