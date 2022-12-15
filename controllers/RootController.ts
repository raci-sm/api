/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Dependencies
import { BaseController, Controller, Get } from "@deps";

// Database
import Database from "@database";

// Types
import type { RequestEvent, TResponse, SettingsSchema } from "@types";

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

  @Get("/settings")
  async settings({ response: res }: RequestEvent): Promise<void | Response> {
    const { motd }: SettingsSchema = await Database.getSettings();

    return res.status(200).json({
      status: 200,
      message: "Succesfully fetched settings",
      data: {
        motd
      }
    } as TResponse);
  }
}

export default RootController;