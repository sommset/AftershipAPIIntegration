import { Request, Response, NextFunction } from "express";

import { AFTERSHIP_API_KEY } from "../util/secrets";
import { AfterShip } from "AfterShip";
import { body, check, validationResult } from "express-validator";

/**
 * Get all Couriers
 * @param req
 * @param res
 * @param next
 */
export const getAllCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
          const aftership = new AfterShip(AFTERSHIP_API_KEY)

           aftership.courier.listAllCouriers()
                .then(result =>  res.json({
                    message: result
                }))
                .catch(err => res.json({
                    message: err
                }
                ));
   
  } catch (error) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * Get  user activated couriers
 * @param req
 * @param res
 * @param next
 */
 export const getCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
          const aftership = new AfterShip(AFTERSHIP_API_KEY)

           aftership.courier.listCouriers()
                .then(result =>  res.json({
                    message: result
                }))
                .catch(err => res.json({
                    message: err
                }
                ));
   
  } catch (error) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};

/**
 * Detect  Courier
 * @param req
 * @param res
 * @param next
 */
 export const detectCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    body('tracking.tracking_number').not().isEmpty().trim()
    body('tracking.tracking_postal_code').not().isEmpty().trim()
    body('tracking.tracking_ship_date').not().isEmpty().trim()
    body('tracking.tracking_account_number').not().isEmpty().trim()
    body('tracking.slug').not().isEmpty().trim()
  
    const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        res.status(400).json({
          message: "Invalid details provided.",
        })
      }
    const payload = {
      'tracking': {
        'tracking_number': req.body.tracking_number,
        'tracking_postal_code': req.body.tracking_postal_code,
        'tracking_ship_date': req.body.tracking_ship_date,
        'tracking_account_number': req.body.tracking_account_number,
        'slug': req.body.slug,
      }
    };
          const aftership = new AfterShip(AFTERSHIP_API_KEY)

          aftership.courier.detectCouriers(payload)
                .then(result =>  res.json({
                    message: result
                }))
                .catch(err => res.json({
                    message: err
                }
                ));
   
  } catch (error) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};