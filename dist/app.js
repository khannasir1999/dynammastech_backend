"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
// Create Express app
const app = (0, express_1.default)();
// Middleware
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, Postman, etc.)
        if (!origin) {
            return callback(null, true);
        }
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:4173',
            'http://localhost:4174',
            'https://dynammastech-frontend-ew2g.vercel.app',
        ];
        // Check if origin is in allowed list or is a Vercel deployment
        if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// Regular JSON parsing for other routes
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
// Health check endpoint (doesn't require DB connection)
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});
// Root endpoint for basic health checks
app.get('/', (_req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is running' });
});
app.use('/api', taskRoutes_1.default);
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            message: 'File size exceeded. Maximum allowed size is 10 MB.',
        });
    }
    _next(err);
});
exports.default = app;
//# sourceMappingURL=app.js.map