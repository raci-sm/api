/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Config
import { Config, Logger } from "@utils";
await Config.load("config.toml");

// Database
import Database from "@database";

if(!await Database.init(Config.get("database", "uri"), Config.get("database", "database"))) {
  Logger.error("Unable to connect to MongoDB!")
  Deno.exit();
}

// Dependencies
import { addControllers, NHttp } from "@deps";

// Controllers
import { RootController, CategoriesController, PostsController } from "@controllers";

// Types
import { RequestEvent, TResponse } from "@types";

class Application extends NHttp {
  constructor() {
    super();

    /* CORS */
    this.use(({ response: res }, next) => {
      res.header({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*"
      });

      return next();
    });

    this.on404(({ response: res }: RequestEvent) => {
      return res.status(404).json({
        status: 404,
        message: `Unable to find requested resource!`,
        data: { }
      } as TResponse);
    });

    this.onError((error, { response: res }: RequestEvent) => {
      Logger.error(error.message || error.toString());

      return res.status(500).json({
        status: 500,
        message: "Internal Server Error - the code monkeys at out HQ are working vewy hard to fix this!",
        data: { }
      } as TResponse);
    })

    /* Controllers */
    this.use("/", addControllers([
      RootController,
      CategoriesController,
      PostsController
    ]));
  }
}

new Application().listen(Config.get("app", "port"), (error: Error | undefined) => {
  if(error)
    return Logger.error(error.message || error.toString());

  Logger.log("Listening!");
});