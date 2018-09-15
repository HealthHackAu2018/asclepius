'use strict';

const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(Promise);
AWS.config.update({region:'us-east-1'});

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
};

module.exports.pushDeviceData = async (event, context) => {
  const body = JSON.parse(event.body || {});

  const item = Object.assign({
    type: body.type || 'device-data',
    timestamp: (new Date()).getTime()
  }, body);

  await dynamodb.put({
    TableName: process.env.DEVICE_DATA_TABLE,
    Item: item
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Ok',
    }),
  };
};
