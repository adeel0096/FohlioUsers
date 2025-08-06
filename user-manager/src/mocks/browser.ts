import { setupWorker } from "msw/browser";
import { handlers } from "./userHandler";

export const worker = setupWorker(...handlers);