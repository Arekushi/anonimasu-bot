import { Router } from 'express';


const routes = (): Router => {
    const router = Router();

    router.get('/ping', (req, res) => {
        return res.json({
            result: 'pong'
        });
    });

    return router;
};

export default routes;
