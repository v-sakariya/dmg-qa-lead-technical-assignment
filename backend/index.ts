import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import dot from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
const dotenv = dot.config();

interface Todo {
  id: number;
  title: string;
}

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

const users : Record<string,string> = {
  "dev@dmglockchain.com": "123456"
};

// Function to sign a JWT token
const jwtSign = (email: string) => {
  return jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

// Function to verify a JWT token from a cookie
const jwtVerify = (cookies: any) => {
  try {
    const token = cookies.JWT;
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any as { email: string };
    return decoded.email in users;
  } catch (err) {
    return false;
  }
};

app.post("/login", async (req: Request, res: Response) => {
  const email : string = req.body.email;
  const password : string = req.body.password;
  if (!(email in users)) {
    res.status(200).send("Invalid email");
    return;
  }

  const isPasswordValid = (password === users[email]);
  if (isPasswordValid) {
    res.cookie("JWT", jwtSign(email));
    res.status(200).send("OK");
  } else {
    res.status(200).send("Invalid password");
  }
});

app.get("/todo", async (req: Request, res: Response) => {
  try {
    const decoded = jwtVerify(req.cookies);
    if(!decoded){
      res.status(403).send({message: "Authorization token is invalid"})
    }

    const response = await axios.get<Todo[]>("https://jsonplaceholder.typicode.com/todos");
    const todos = response.data;

    res.status(200).send({ todos });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/todo", async (req: Request, res: Response) => {
  try {
    const decoded = jwtVerify(req.cookies);
    if(!decoded){
      res.status(403).send({message: "Authorization token is invalid"})
    }

    const { title } = req.body as { title: string;};
    const response = await axios.post<Todo>(
      "https://jsonplaceholder.typicode.com/todos",
      { title }
    );

    res.status(201).send({ message: `Todo added successfully`, data: response.data });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.delete("/todo", async (req: Request, res: Response) => {
  try {
    const decoded = jwtVerify(req.cookies);;
    if(!decoded){
      res.status(403).send({message: "Authorization token is invalid"})
    }

    const { id } = req.body as { id: number };

    const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/201`);

    res.status(200).send({ message: "Todo deleted successfully", data: response.data() });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.listen(8080, () => {
  console.log(`Listening on port ${8080}`);
});