const Booking = require("../models/Booking");
const { get_query } = require("../utils/mongooseUtils");

const BookingService = {
    create: async (data) => {
        const result = await Booking.create(data);
        return result;
    },

    getAll: async (query) => {
        const { data, meta, page, pageSize } = get_query(Booking, query);

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

    getById: async (bookingId) => {
        const result = await Booking.findOne({ _id: bookingId });
        return result;
    },

    update: async (bookingId, data) => {
        const result = await Booking.findOneAndUpdate(
            { _id: bookingId },
            data,
            {
                returnNewDocument: true,
            }
        );

        return result;
    },

    delete: async (bookingId) => {
        const result = await Booking.deleteOne({ _id: bookingId });
        return result;
    },
};

module.exports = BookingService;
