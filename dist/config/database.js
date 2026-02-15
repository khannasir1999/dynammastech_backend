"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI;
const connectDB = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('MongoDB connected successfully');
        // Log the connection string type (local or Atlas) for debugging
        if (MONGODB_URI.includes('mongodb+srv')) {
            console.log('Connected to MongoDB Atlas');
        }
        else {
            console.log('Connected to Local MongoDB');
        }
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        console.log('Please check your MongoDB URI in the .env file');
        process.exit(1);
    }
};
exports.connectDB = connectDB;
mongoose_1.default.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('MongoDB error:', err);
});
exports.default = exports.connectDB;
//# sourceMappingURL=database.js.map