import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { User } from "./models/User.model";
import { IUser } from "./types/user.types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    const users = await User.find();

    return res.json(users);
  }
);

app.get(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    const { userId } = req.params;
    const user = await User.findById(userId);

    return res.json(user);
  }
);

app.post(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const body = req.body;
      const user = await User.create({ ...body });

      return res.status(201).json({
        message: "User created",
        data: user,
      });
    } catch (e) {
      // throw new Error(e.message);
      res.json({ message: e.message });
    }
  }
);

app.put(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    const { userId } = req.params;
    const user = req.body;
    const updatedUser = await User.updateOne({ _id: userId }, user);

    return res.status(200).json({
      message: "User updated",
      data: updatedUser,
    });
  }
);

app.delete("/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  await User.deleteOne({ _id: userId });

  res.status(200).json({
    message: "User deleted",
  });
});

app.get("/welcome", (req: Request, res: Response) => {
  res.send("welcome");
});

const PORT = 5100;

app.listen(PORT, () => {
  mongoose.connect("mongodb://127.0.0.1:27017/myDataBase");
  console.log(`Server has started on PORT ${PORT}`);
});
