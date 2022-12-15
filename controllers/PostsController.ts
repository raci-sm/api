/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 * 
 * TODO: Add increments for views
 */

// Dependencies
import { BaseController, Controller, Get } from "@deps";

// Database
import Database from "@database";

// Types
import type { RequestEvent, TResponse } from "@types";

@Controller("/posts")
class PostsController extends BaseController {
  @Get("/:slug")
  async index({ response: res, params }: RequestEvent): Promise<void | Response> {
    const post = await Database.getPost(params.slug);

    if(!post || !post.title || typeof post.views == "undefined" || !post.content)
      return res.status(404).json({
        status: 400,
        message: `Unable to find any posts for: "${params.slug}"`,
        data: { }
      } as TResponse);

    return res.status(200).json({
      status: 200,
      data: {
        post: {
          title: post.title,
          views: post.views,
          content: post.content
        }
      }
    } as TResponse);
  }
}

export default PostsController;