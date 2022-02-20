import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import authRoute from "./routes/auth";

const app = express();
const prisma = new PrismaClient();

async function init() {
  app.use(bodyParser.json());
  app.use(
    cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
    })
  );
  app.use(cookieParser());
  app.use("/", authRoute);
  app.get("/", (req, res) => {
    res.send("Auth");
  });
}

init()
  .catch((e) => {
    init();
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

app.listen(process.env.PORT, () => {
  console.log("Up!!!");
});
