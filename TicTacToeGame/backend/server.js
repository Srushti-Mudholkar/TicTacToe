import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import playerRoutes from './routes/playerRoutes.js';
import gameRoutes from './routes/gameRoutes.js';

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173' 
}));
app.use(express.json());

app.use('/api/players', playerRoutes);
app.use('/api/games', gameRoutes);

app.get('/', (req, res) => {
   res.json('Hello from Server');
})


sequelize.sync().then(() => {
  app.listen(PORT, () => 
    console.log(`Server is running on port ${PORT}`)
  );
});
