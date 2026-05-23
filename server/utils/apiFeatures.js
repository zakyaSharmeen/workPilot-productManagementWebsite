/**
 * APIFeatures — builds MongoDB filter / sort / skip / limit from req.query.
 *
 * Unlike the Mongoose version (which chained onto a Query object), this class
 * assembles plain objects that you pass directly to the native MongoDB driver.
 *
 * Usage in a controller:
 *
 *   import { APIFeatures } from '../utils/apiFeatures.js';
 *   import { ObjectId } from '../config/db.js';
 *
 *   const features = new APIFeatures(req.query)
 *     .search()
 *     .filter({ project: new ObjectId(projectId) })   // base filter (always applied)
 *     .sort()
 *     .paginate();
 *
 *   const taskList = await features.execute(tasks());          // run the query
 *   const total    = await tasks().countDocuments(features.criteria); // total for pagination UI
 */
export class APIFeatures {
  constructor(queryString) {
    this.queryString = queryString;

    // These are built up by the chained methods below
    this.criteria   = {};            // MongoDB filter document
    this.sortBy     = { createdAt: -1 }; // default: newest first
    this.skipCount  = 0;
    this.limitCount = 10;

    // Exposed so the controller can use them for countDocuments()
    this.page  = 1;
    this.limit = 10;
  }

  // ── search ─────────────────────────────────────────────────────────────────
  /**
   * Full-text search using MongoDB's $text operator.
   * Requires a text index on the collection (created in config/db.js).
   * Query param: ?search=login+bug
   */
  search() {
    if (this.queryString.search) {
      this.criteria.$text = { $search: this.queryString.search };
    }
    return this;
  }

  // ── filter ─────────────────────────────────────────────────────────────────
  /**
   * Apply field-level filters from req.query, merged with an optional
   * base filter (e.g. { project: new ObjectId(id) }).
   *
   * Strips pagination/sort/search params, then converts comparison operator
   * shorthand to MongoDB syntax:
   *   ?dueDate[lte]=2025-12-31  →  { dueDate: { $lte: '2025-12-31' } }
   *   ?priority=high            →  { priority: 'high' }
   *
   * @param {object} baseFilter — always-on filter (e.g. { project: ObjectId })
   */
  filter(baseFilter = {}) {
    // Start from the base filter
    this.criteria = { ...this.criteria, ...baseFilter };

    // Pull query params, remove keys that belong to other methods
    const queryObj = { ...this.queryString };
    ['page', 'limit', 'sort', 'search'].forEach((key) => delete queryObj[key]);

    // Replace gte/gt/lte/lt with $ prefix for MongoDB operators
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.criteria = { ...this.criteria, ...JSON.parse(queryStr) };
    return this;
  }

  // ── sort ───────────────────────────────────────────────────────────────────
  /**
   * Build the sort document from the ?sort query param.
   * Prefix a field name with - for descending order.
   *
   * Examples:
   *   ?sort=-dueDate          →  { dueDate: -1 }
   *   ?sort=priority,-createdAt  →  { priority: 1, createdAt: -1 }
   *
   * Default: { createdAt: -1 } (newest first)
   */
  sort() {
    if (this.queryString.sort) {
      this.sortBy = {};
      this.queryString.sort.split(',').forEach((field) => {
        if (field.startsWith('-')) {
          this.sortBy[field.slice(1)] = -1;
        } else {
          this.sortBy[field] = 1;
        }
      });
    }
    return this;
  }

  // ── paginate ───────────────────────────────────────────────────────────────
  /**
   * Calculate skip and limit from ?page and ?limit query params.
   * Defaults: page 1, 10 results per page.
   */
  paginate() {
    this.page  = parseInt(this.queryString.page,  10) || 1;
    this.limit = parseInt(this.queryString.limit, 10) || 10;
    this.skipCount  = (this.page - 1) * this.limit;
    this.limitCount = this.limit;
    return this;
  }

  // ── execute ────────────────────────────────────────────────────────────────
  /**
   * Run the assembled query against a MongoDB collection.
   * Returns an array of matching documents.
   *
   * @param {Collection} collection — e.g. tasks(), projects()
   * @param {object} projection     — optional field projection, e.g. { password: 0 }
   * @returns {Promise<Array>}
   */
  async execute(Model) {
    return Model
      .find(this.criteria)
      .sort(this.sortBy)
      .skip(this.skipCount)
      .limit(this.limitCount)
      .lean();
  }
}
