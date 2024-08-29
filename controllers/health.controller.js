const healthCheck =async (_req, res, _next) => {

    const healthcheck = {
        status:'success',
        uptime: process.uptime(),
        message: 'Server is healthy',
        timestamp: Date.now(),
    };
    try {
        res.status(200).send(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        res.status(503).send();
    }
};
// export router with all routes included
module.exports = healthCheck;