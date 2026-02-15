"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
// Start the server immediately (health checks need it to be available)
app_1.default.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
// Connect to MongoDB in the background (non-blocking)
(0, database_1.default)().catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    // Don't exit - allow server to run even if DB connection fails initially
    // The server can retry or handle DB errors gracefully
});
//# sourceMappingURL=index.js.map