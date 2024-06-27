import { Request, Response, NextFunction } from 'express';

export function errorHandler(erro: Error, _: Request, res: Response, next: NextFunction) {
  const message = formatError(erro);

  res.json({ message });

  next();
}

export function formatError(dirt: unknown): string {
  if (dirt instanceof Error) {
    return dirt.message;
  }

  if (typeof dirt === 'string') {
    return dirt.trim();
  }

  try {
    return JSON.stringify(dirt);
  } catch {
    return 'Erro desconhecido';
  }
}