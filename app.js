const express = require('express');
const sequelize = require('./config/database');

const app = express();
const PORT = 3000;

sequelize.authenticate()
    .then(() => {console.log('✅ Database connected successfully.');
        app.listen(PORT, () => {console.log(`🚀 Server running on http://localhost:${PORT}`);        
        });
    })
    .catch((err) => {console.error('❌ Unable to connect to the database:', err);
    });