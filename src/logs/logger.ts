import { colors } from "./logger-colors";

export const LogSuccess = (message: string) => {
     console.log(colors.bright, colors.fg.green, `Success: ${message}`);
     console.log(colors.reset);
};

export const LogError = (message: string) => {
     console.log(colors.reverse, colors.fg.red, `Error: ${message}`);
     console.log(colors.reset);
};

export const LogInfo = (message: string) => {
     console.log(colors.bright, colors.fg.magenta, `Info: ${message}`);
     console.log(colors.reset);
};

export const LogWarning = (message: string) => {
     console.log(colors.bright, colors.fg.yellow, `Warning: ${message}`);
     console.log(colors.reset);
};
