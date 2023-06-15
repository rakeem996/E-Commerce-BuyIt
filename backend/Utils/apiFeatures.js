class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter(){
    const queryCopy = {...this.queryStr};

    //removing fields for category
    const removeFields = ["keyword","page","limit"];
    
    removeFields.forEach(element => {
      delete queryCopy[element];
    });

    //filter for price
    let queryStr = JSON.stringify(queryCopy);
    
    queryStr = queryStr.replace(/gt|gte|lt|lte/gi, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;

  }

  pagination(resultPerPage){
    const currentPage = Number(this.queryStr.page) || 1

    const skip = resultPerPage * (currentPage-1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
