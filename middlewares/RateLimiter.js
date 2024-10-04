import rateLimit from 'express-rate-limit';


const checkoutLimiter = rateLimit({
    windowMs: 60 * 1000,  // 1 minute
    max: 10,
    message: 'Too many requests for checkout, please try again later.',
});


const returnLimiter = rateLimit({
    windowMs: 60 * 1000,  // 1 minute
    max: 30,
    message: 'Too many return requests, please try again later.',
});


export default { checkoutLimiter, returnLimiter };