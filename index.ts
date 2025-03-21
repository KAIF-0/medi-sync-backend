import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { emergencyInstance } from "./routes/emergencyRoute";
import { userInstance } from "./routes/userRoute";
import { qrInstance } from "./routes/qrRoute";
import { medicalInstance } from "./routes/medicalRoute";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

const app = new Hono().basePath("/api");
app.use(logger());
app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//routes
app.route("/user", userInstance);
app.route("/qr", qrInstance);
app.route("/medical", medicalInstance);
app.route("/emergency", emergencyInstance);

app.get("/", (c) => c.text("Hello Hono!"));

//error handling
app.onError((err, c) => {
  console.error(err.message);
  //custom error
  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        message: err.message,
        data: null,
      },
      err.status
    );
  }
  return c.json(
    {
      success: false,
      message: "Something went wrong!",
      data: null,
    },
    500
  );
});

//not found
app.notFound((c) => {
  //   console.error(c.get("message"));
  return c.json(
    {
      success: false,
      message: "Not Found!",
      data: null,
    },
    404
  );
});
export default app;
