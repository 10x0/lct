class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            // MONGODB REGEX OPERATOR
            $regex: this.queryString.keyword,
            $options: "i", // case-insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryString };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Price and Ratings
    let queryString = JSON.stringify(queryCopy);
    // Replacing gt -> $gt [FOR MONGODB OPERATION]
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `${$key}`
    );
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = this.queryString.page || 1;
    const skip = resultsPerPage * (currentPage - 1);
    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
