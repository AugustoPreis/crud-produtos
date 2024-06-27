import { NextFunction, Request, Response, Router } from 'express';

type RequestFunction = (req: Request, res: Response, next?: NextFunction) => Promise<void>;

export class DefaultRouter {
  public readonly router = Router();

  normalizePath(dirtPath: string) {
    if (dirtPath?.charAt(dirtPath.length - 1) === '/') {
      return dirtPath;
    }

    return `/${dirtPath || ''}`;
  }

  get(path: string, method: RequestFunction) {
    this.router.get(this.normalizePath(path), method);
  }

  post(path: string, method: RequestFunction) {
    this.router.post(this.normalizePath(path), method);
  }

  put(path: string, method: RequestFunction) {
    this.router.put(this.normalizePath(path), method);
  }

  delete(path: string, method: RequestFunction) {
    this.router.delete(this.normalizePath(path), method);
  }
}