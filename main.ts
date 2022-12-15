/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Config
import { Config, Logger } from "@utils";
await Config.load("config.toml");

// Dependencies
import { addControllers, NHttp } from "@deps";

// Database
import Database from "@database";

// Controllers
import { RootController } from "@controllers";

await Database.init(Config.get("database", "uri"), Config.get("database", "database"));

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

    /* Controllers */
    this.use("/", addControllers([
      RootController
    ]));
  }
}

new Application().listen(Config.get("app", "port"), (error: Error | undefined) => {
  if(error)
    return Logger.error(error.message || error.toString());

  Logger.log("Listening!");
})