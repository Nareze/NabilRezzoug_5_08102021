const uuid = require('uuid/v1');
const Furniture = require('../models/Furniture');

exports.getAllFurniture = (req, res, next) => {
  Furniture.find().then(
    (furniture) => {
      res.status(200).json(furniture);
    }
  ).catch(
    (error) => {
      res.status(400).send(error);
    }
  );
};

exports.getOneFurniture = (req, res, next) => {
  Furniture.findById(req.params.id).then(
    (furniture) => {
      if (!furniture) {
        return res.status(404).send(new Error('Furniture not found!'));
      }
      res.status(200).json(furniture);
    }
  ).catch(
    (error) => {
      res.status(500).send(error);
    }
  )
};

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */
exports.orderFurniture = (req, res, next) => {
  let queries = [];
  for (let productId of req.body.products) {
    const queryPromise = new Promise((resolve, reject) => {
      Furniture.findById(productId).then(
        (furniture) => {
          resolve(furniture);
        }
      ).catch(
        (error) => {
          reject(error);
        }
      )
    });
    queries.push(queryPromise);
  }
  Promise.all(queries).then(
    (furniture) => {
      const orderId = uuid();
      return res.status(201).json({
        contact: req.body.contact,
        products: furniture,
        orderId: orderId
      })
    }
  ).catch(
    (error) => {
      return res.status(500).json(error);
    }
  );
};