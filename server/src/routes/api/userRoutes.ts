import express, { Request, Response} from 'express';
import { User } from '../../models/index.js';
import { UserAttributes } from '../../models/user.js';

const router = express.Router()

//create a new user
router.post("/", async (req: Request, res: Response) => {
  try {
    const newUser: UserAttributes = req.body;
    console.log('creating new user', newUser)
    const userData = await User.create(newUser);
      res.status(200).json(userData);
  } catch (err) {
      res.status(400).json(err);
  }
}) 

// GET one user
router.get('/:id', async (req: Request, res: Response) => {
    try {
      const userData = await User.findByPk(req.params.id);
      if (!userData) {
        res.status(404).json({ message: 'No user with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
    // PUT update a user
  router.put('/:id', async (req: Request, res: Response) => {
    try {
      const userData = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
        individualHooks: true
      });
      if (!userData[0]) {
        res.status(404).json({ message: 'No user with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  

export default router;