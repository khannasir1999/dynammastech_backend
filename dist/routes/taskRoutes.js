"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controller/taskController");
const router = (0, express_1.Router)();
router.get('/tasks', taskController_1.getTasks);
router.post('/tasks', taskController_1.createTask);
router.put('/tasks/:id', taskController_1.updateTask);
router.delete('/tasks/:id', taskController_1.deleteTask);
exports.default = router;
//# sourceMappingURL=taskRoutes.js.map