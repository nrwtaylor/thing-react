// REACT_APP_DEBUG

export const debugFlag =
  (process.env.REACT_APP_DEBUG && process.env.REACT_APP_DEBUG === "on")
    ? true
    : false;

export const devFlag =
  process.env.REACT_APP_ENGINE_STATE &&
  process.env.REACT_APP_ENGINE_STATE === "dev"
    ? true
    : false;

export function debugConsole(text) {
  if (!debugFlag) {
    return;
  }
  console.log(text);
}
