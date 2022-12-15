/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Dependencies
import { BaseController, Controller, Get } from "@deps";

// Database
import Database from "@database";

// Types
import type { RequestEvent, TResponse, CategorySchema } from "@types";

@Controller("/categories")
class CategoriesController extends BaseController {
  @Get("/")
  async index({ response: res }: RequestEvent): Promise<void | Response> {
    const categories = (await Database.getCategories()).map((item: CategorySchema) => {
      if(item._id) delete item._id;

      return item;
    });

    return res.status(200).json({
      status: 200,
      data: {
        categories
      }
    } as TResponse);
  }
}

export default CategoriesController;