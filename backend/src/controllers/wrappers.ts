import { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

/**
 * Takes an asynchronous request handler and returns a synchronous request
 * handler that executes the provided handler and passes any caught errors to
 * the error handler.
 *
 * @export
 * @param {AsyncRequestHandler} handler some asynchronous request handler
 * @return {*}  {RequestHandler} synchronous request handler with error catching
 */
export function asyncHandler(handler: AsyncRequestHandler): RequestHandler {
  return function (req, res, next) {
    handler(req, res, next).catch(next);
  };
}
