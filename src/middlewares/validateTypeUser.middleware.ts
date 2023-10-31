import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuarios } from "../entities/usuarios.entity";

const validateTypeUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  const usuariosRepository = AppDataSource.getRepository(Usuarios);

  if (!!token) {
    if (req.usuario.perfil.toLowerCase() == "admin") return next();

    if (req.method == "DELETE") {
      const { id } = req.params;
      const userDeleting = await usuariosRepository.findOneBy({
        id: Number(id),
      });

      if (
        userDeleting?.perfil.toLowerCase() == "admin" ||
        userDeleting?.perfil.toLowerCase() == "useradm"
      ) {
        return res.status(401).json({
          message: "Usuário sem permissão para esta ação!",
        });
      }
      return next();
    }

    if (req.usuario.perfil.toLowerCase() == "useradm") {
      if (
        req.body.perfil.toLowerCase() == "admin" ||
        req.body.perfil.toLowerCase() == "useradm"
      ) {
        return res.status(401).json({
          message: "Usuário sem permissão para esta ação!",
        });
      }
      return next();
    } else
      return res.status(401).json({
        message: "Usuário sem permissão para esta ação!",
      });
  } else {
    return res.status(401).json({
      message: "É necessario ter autorização de token",
    });
  }
};

export default validateTypeUserMiddleware;
