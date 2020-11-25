const models = require("../models/index");
const _ = require("lodash");

module.exports.simplifyCreatedSequelizeObject = async (
  createdSequelizeObject
) => {
  return JSON.parse(JSON.stringify(createdSequelizeObject));
};

module.exports.simplifySequelizeObject = async (sequelizeObject) => {
  if (!sequelizeObject) {
    return null;
  }

  return sequelizeObject.toJSON();
};

module.exports.simplifySequelizeObjectArray = async (sequelizeObjectArray) => {
  if (!sequelizeObjectArray) {
    return null;
  }

  const simpleArray = sequelizeObjectArray.map((object) => object.toJSON());
  return simpleArray;
};

module.exports.getTableColumnsByTableName = async (
  tableName,
  includeDefaultDates
) => {
  const modelName = await this.getModelNameByTableName(tableName);
  let columns = Object.keys(models[modelName].rawAttributes);

  if (!includeDefaultDates) {
    columns = _.difference(columns, ["createdAt", "updatedAt", "deletedAt"]);
  }

  return columns;
};

module.exports.getModelNameByTableName = async (tableName) => {
  for (let modelName of Object.keys(models)) {
    if (models[modelName].tableName === tableName) {
      return modelName;
    }
  }
};

module.exports.getDatabaseTablesData = async (includeDefaultDates) => {
  const tables = [];

  for (let modelName of Object.keys(models)) {
    const tableData = {
      table_name: models[modelName].tableName,
      table_columns: await this.getTableColumnsByTableName(
        models[modelName].tableName,
        includeDefaultDates
      ),
    };

    tables.push(tableData);
  }

  return tables;
};
