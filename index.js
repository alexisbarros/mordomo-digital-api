// Modules
const express = require('express');
require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routes modules
const usersRoutes = require('./routes/users.route');
const authRoutes = require('./routes/auth.route');
const roomTypesRoutes = require('./routes/room-types.route');
const roomTasksRoutes = require('./routes/room-tasks.route');
const roomMarketItensRoutes = require('./routes/room-market-itens.route');
const roomsRoutes = require('./routes/rooms.route');
const menuOptionsRoutes = require('./routes/menu-options.route');
const menuGroupsRoutes = require('./routes/menu-groups.route');

// Middlewares
const authMiddleware = require('./middleware/auth.middleware');

// Variables
const port = process.env.PORT || 3000;

// Start express app
const app = express();

// Enable cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Routes
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/room-types', authMiddleware, roomTypesRoutes);
app.use('/room-tasks', authMiddleware, roomTasksRoutes);
app.use('/room-market-itens', authMiddleware, roomMarketItensRoutes);
app.use('/rooms', authMiddleware, roomsRoutes);
app.use('/menu-options', authMiddleware, menuOptionsRoutes);
app.use('/menu-groups', authMiddleware, menuGroupsRoutes);

// Run server
app.listen(port, () => {
    
    console.log(`Listening on port: ${port}`);

})