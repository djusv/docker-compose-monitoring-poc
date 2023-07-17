import {
  Color,
  ConsoleTransport,
  Format,
  Houston,
  LogLevel,
  LogLevelDisplay,
  TimePrefix,
} from "https://deno.land/x/houston/mod.ts";

export const Logger = new Houston([
  new ConsoleTransport(),
], {
  format: Format.text,
  prefix: new TimePrefix(),
  logLevelDisplay: LogLevelDisplay.Text,
  logColors: {
    [LogLevel.Info]: Color.White,
    [LogLevel.Success]: Color.Green,
    [LogLevel.Warning]: Color.Yellow,
    [LogLevel.Error]: Color.Red,
  },
});
