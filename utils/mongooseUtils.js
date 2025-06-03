const ObjectId = require("mongoose").Types.ObjectId;
const { default: mongoose } = require("mongoose");
const get_query = (collection, query, projection = {}, options = {}) => {
  //query = {filter_name: ivet, filter_gender: male }
  let all = false;
  if (query?.all) {
    all = true;
  }
  let filters = {};
  let queryFilters = Object.keys(query).filter((x) => x.includes("filter_"));
  if (queryFilters.length) {
    queryFilters.reduce((a, b) => {
      let filterKey = b.split("filter_")[1];
      if (ObjectId.isValid(query[b])) {
        a[filterKey] = new ObjectId(query[b]);
      } else if (b.split("_")[1] === "reference") {
        if (query[b]) {
          const field = "matched_docs" + "." + b.split("_")[3];
          const regex = new RegExp(`\\b${query[b]}\\b`, "i");
          filters[field] = { $regex: regex };
          const Model = mongoose.model(b.split("_")[2]);
          const collectionName = Model.collection.name;

          options = {
            ...options,
            $lookup: {
              from: collectionName,
              localField: `${b.split("_")[2]}`,
              foreignField: "_id",
              as: "matched_docs",
            },
          };
        }
      } else {
        a[filterKey] = new RegExp(query[b], "i");
      }
      return a;
    }, filters);
  }

  let sorts = {};
  let querySorts = Object.keys(query).filter((x) => x.includes("sort_"));
  if (querySorts.length) {
    querySorts.forEach((sortKey) => {
      let fieldName = sortKey.split("sort_")[1];
      sorts[fieldName] = query[sortKey] === "asc" ? 1 : -1;
    });
  } else {
    sorts["createdAt"] = -1; // Default sorting by createdAt field in descending order
  }

  let pageSize = query.pageSize ? parseInt(query.pageSize) : 10;
  let page = query.page ? parseInt(query.page) : 1;
  let skip = (page - 1) * pageSize;

  if (all) {
    const aggregateQuery = [{ $match: filters }, { $sort: sorts }];

    return {
      data: collection.aggregate(aggregateQuery),
      meta: collection.aggregate([{ $match: filters }, { $count: "count" }]),
      page,
      pageSize,
    };
  } else {
    const aggregateQuery = [
      { $match: filters },
      { $sort: sorts },
      { $skip: skip },
      { $limit: pageSize },
    ];
    const countQuery = [{ $match: filters }];
    if (Object.keys(options).length > 0) {
      aggregateQuery.unshift(options);
      countQuery.unshift(options);
    }
    return {
      data: collection.aggregate(aggregateQuery),
      meta: collection.aggregate([...countQuery, { $count: "count" }]),
      page,
      pageSize,
    };
  }
};

module.exports = { get_query };
