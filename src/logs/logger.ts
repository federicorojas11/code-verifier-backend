import { colors } from "./logger-colors";

export const LogSuccess = (message: string) => {
     console.log(
          colors.bright,
          colors.fg.green,
          `Success: ${message}`,
          colors.reset
     );
};

export const LogSuccessBg = (message: string) => {
     console.log(
          colors.bright,
          colors.bg.green,
          `Success: ${message}`,
          colors.reset
     );
};

export const LogError = (message: string) => {
     console.log(
          colors.reverse,
          colors.fg.red,
          `Error: ${message}`,
          colors.reset
     );
};

export const LogInfo = (message: string) => {
     console.log(
          colors.bright,
          colors.fg.magenta,
          `Info: ${message}`,
          colors.reset
     );
};

export const LogWarning = (message: string) => {
     console.log(
          colors.bright,
          colors.fg.yellow,
          `Warning: ${message}`,
          colors.reset
     );
};

export const LogDev = (message: string) => {
     console.log(colors.fg.white, `Dev: ${message}`, colors.reset);
};
