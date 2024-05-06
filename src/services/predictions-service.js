const Prediction = require('../../models/prediction.js');
const { DatabaseError, CustomError } = require('../utils/error-utils.js');
const { getOneUser } = require('./users-service.js');

const getAllPredictions = async () => {
  try {
    const allPredictions = await Prediction.findAll();
    return allPredictions;
  } catch (err) {
    throw DatabaseError(err);
  }
};

const getOnePrediction = async (id) => {
  try {
    const prediction = await Prediction.findByPk(id);
    return prediction;
  } catch (err) {
    throw DatabaseError(err);
  }
};

const updatePrediction = (prediction) => {
  // should find the unique prediction by Prediction,userId and matchId, because user can have only one prediction per match
  try {
    // const
  } catch (err) {
    throw DatabaseError(err);
  }
};

const createPrediction = async (userId, prediction) => {
  try {
    const newPrediction = await Prediction.create(
      {
        prediction,
        userId,
      },
      {
        returning: ['id', 'prediction', 'createdAt', 'updatedAt'],
      },
    );
    const user = await getOneUser(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    await user.addPredictions(newPrediction);

    return newPrediction;
  } catch (err) {
    console.log(err);
    throw new DatabaseError(err);
  }
};

module.exports = { createPrediction, getAllPredictions, getOnePrediction };
