import * as express from 'express'
import cors from 'cors'
import * as CourierController from "./Controllers/CourierController";
import * as TrackingController from "./Controllers/TrackingController";


class Router {

    constructor(server: express.Express) {
        const router = express.Router()
        router.get("/couriers/all", CourierController.getAllCourier);
        router.get("/couriers", CourierController.getCourier);
        router.post("/couriers/detect", CourierController.detectCourier);

        router.get("/trackings", TrackingController.getTrackings);
        router.get("/trackings/:slug/:tracking_number", TrackingController.getTrackingbyNumber);
        router.delete("/trackings/:slug/:tracking_number", TrackingController.deleteTrackingbyNumber);
        router.get("/trackings/:id", TrackingController.getTrackingbyId);
        router.post("/trackings", TrackingController.createTrackings);
        // router.put("/trackings/:slug/:tracking_number", TrackingController.updateTrackingByNumber);
        // router.post("/trackings/:slug/:tracking_number/retrack", TrackingController.createRetrack);
        // router.post("/trackings/:slug/:tracking_number/mark-as-completed", TrackingController.completeTracking);
        // router.get("/notifications/:slug/:tracking_number", TrackingController.getTrackingNotification);
        // router.post("/notifications/:slug/:tracking_number/add", TrackingController.addTrackingNotification);
        // router.post("/notifications/:slug/:tracking_number/remove", TrackingController.removeTrackingNotifications);
      
      
        router.options('*', cors());

        server.use('/', router)
    }
}

export default Router;