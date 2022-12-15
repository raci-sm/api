/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Dependencies
import { MongoClient } from "@deps";

// Schemas
import type { Collection, CategorySchema, PostSchema, SettingsSchema } from "@types";

// Database Class
class Database {
  public static client = new MongoClient();

  public static categories: Collection<CategorySchema> | null = null;
  public static posts: Collection<PostSchema> | null = null;
  public static settings: Collection<SettingsSchema> | null = null;

  public static getCategories = async (): Promise<CategorySchema[]> => {
    if(!this.categories)
      throw "You may not call this function until intiialized!";

    return await this.categories.find({ }).toArray();
  }

  public static getPosts = async (): Promise<PostSchema[]> => {
    if(!this.posts)
      throw "You may not call this function until intiialized!";

    return await this.posts.find({ }).toArray();
  }

  public static getPost = async (slug: string): Promise<PostSchema> => {
    if(!this.posts)
      throw "You may not call this function until intiialized!";

    return await this.posts.findOne({ slug }) || { } as PostSchema;
  }

  public static getSettings = async (): Promise<SettingsSchema> => {
    if(!this.settings)
      throw "You may not call this function until intiialized!";

    return await this.settings.findOne({  }) || { } as SettingsSchema;
  }

  public static init = async (
    uri: string,
    database: string
  ): Promise<boolean> => {
    try {
      await this.client.connect(uri);

      const db = this.client.database(database);

      this.categories = db.collection<CategorySchema>("categories");
      this.posts = db.collection<PostSchema>("posts");
      this.settings = db.collection<SettingsSchema>("settings");

      return true;
    } catch {
      return false;
    }
  }
}

export default Database;