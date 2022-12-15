/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Dependencies
import { BaseController, Controller, Get } from "@deps";

// Types
import type { RequestEvent, TResponse } from "@types";

@Controller("/")
class RootController extends BaseController {
  @Get("/")
  index({ response: res }: RequestEvent): Promise<void> | Response {
    return res.status(200).json({
      status: 200,
      message: "Welcome to the raci.sm API!",
      data: { }
    } as TResponse);
  }

  @Get("/motd")
  motd({ response: res }: RequestEvent): Promise<void> | Response {
    // TODO: Get MOTD from MongoDB

    return res.status(200).json({
      status: 200,
      message: "Succesfully fetched MOTD",
      data: {
        motd: "Welcome to `raci.sm`"
      }
    });
  }
}

export default RootController;