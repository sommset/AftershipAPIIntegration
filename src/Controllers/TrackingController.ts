import { Request, Response, NextFunction } from "express";

import { AFTERSHIP_API_KEY } from "../util/secrets";
import { AfterShip } from "AfterShip";
import { body, check, query, param, validationResult } from "express-validator";

/**
 * Get all Trackings
 * @param req
 * @param res
 * @param next
 */
export const getTrackings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    check('slug').not().isEmpty()
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        message: "Invalid details provided.",
      })
    }

    const query: any = {
      slug: req.query.slug //'dhl,ups,usps'
    };


    const aftership = new AfterShip(AFTERSHIP_API_KEY)

    aftership.tracking.listTrackings(query)
      .then(result => res.json({
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
 * Get  tracking by number
 * @param req
 * @param res
 * @param next
 */
export const getTrackingbyNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    param('slug').exists()
    param('tracking_number').exists()
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        message: "Invalid details provided.",
      })
    }
    const aftership = new AfterShip(AFTERSHIP_API_KEY)

    aftership.tracking
      .getTracking({
        slug: req.params.slug,
        tracking_number: req.params.tracking_number,
      }).then(result => res.json({
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
 * Get tracking by id
 * @param req
 * @param res
 * @param next
 */
export const getTrackingbyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    param('id').exists()
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        message: "Invalid details provided.",
      })
    }
    const aftership = new AfterShip(AFTERSHIP_API_KEY)

    aftership.tracking
      .getTracking({
        id: req.params.id,
      }).then(result => res.json({
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
 * Delete  Tracking by number
 * @param req
 * @param res
 * @param next
 */
export const deleteTrackingbyNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    param('slug').exists()
    param('tracking_number').exists()
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        message: "Invalid details provided.",
      })
    }

    const aftership = new AfterShip(AFTERSHIP_API_KEY)

    aftership.tracking
      .deleteTracking({
        slug: req.params.slug,
        tracking_number: req.params.tracking_number,
      }).then(result => res.json({
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
 * Create tracking number
 * @param req
 * @param res
 * @param next
 */
export const createTrackings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    body('tracking.slug').not().isEmpty().trim()
    body('tracking.tracking_number').not().isEmpty().trim()
    body('tracking.title').not().isEmpty().trim()
    body('tracking.smses').not().isEmpty().trim()
    body('tracking.emails').not().isEmpty().trim()
    body('tracking.order_id').not().isEmpty().trim()
    body('tracking.order_id_path').not().isEmpty().trim()
    body('tracking.custom_fields').not().isEmpty().trim()

  
    const aftership = new AfterShip(AFTERSHIP_API_KEY)

    aftership.tracking.createTracking(req.body)
      .then(result => res.json({
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
