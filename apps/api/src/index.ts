import express, { Application } from "express";
import sanitizedConfig from "./config";
import { errorMiddleware, isAuthenticated } from "@/middleware";
import { userRoutes, authRoutes, taskRoute } from "@/routes";
import cors from "cors";
import { createServer } from "http";
import mongoose from "mongoose";

const mountServer = async (app: Application) => {
  const server = createServer(app);
  server.listen(sanitizedConfig.PORT);
  server.on("listening", () => {
    console.log(`🚀Server runnig on http://localhost:${sanitizedConfig.PORT}`);
  });
  mongoose
    .connect(sanitizedConfig.DATABASE_URL)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      console.log(err);
    });

  /**
   *
   * System Middleware
   */

  app.use(
    cors({
      credentials: true,
      origin(requestOrigin, callback) {
        if (requestOrigin) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: "100mb" }));

  /**
   * Api Routes
   */

  app.get("/api/v1", (req, res) => {
    res.status(200).json({
      serverInfo: {
        protocol: req.protocol,
        host: req.hostname,
      },
      userInfo: {
        device: req.headers["user-agent"],
      },
    });
  });

  app.post("/api/v1", (req, res) => {
    res.status(200).json({
      error: "Post request is not allowed",
      statusCode: 404,
    });
  });

  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/tasks", isAuthenticated, taskRoute);

  /**
   * Error Handling
   */

  app.use(errorMiddleware);
};

mountServer(express());
