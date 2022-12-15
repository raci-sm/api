/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Logger Class
class Logger {
  public static getTime = (): string => new Date().toLocaleTimeString();

  public static log = (str: string): void => 
    console.log(`\x1b[96m>.< \x1b[0m| \x1b[92m${this.getTime()} \x1b[0m| ${str}`);
  
  public static warn = (str: string): void => 
    console.log(`\x1b[96m>.< \x1b[0m| \x1b[93m${this.getTime()} \x1b[0m| ${str}`);
  
  public static error = (str: string): void =>
    console.log(`\x1b[96m>.< \x1b[0m| \x1b[91m${this.getTime()} \x1b[0m| ${str}`);
}

export default Logger;