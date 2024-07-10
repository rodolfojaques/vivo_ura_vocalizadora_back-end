import { Request, Response } from "express";
import awaitAndPersistenceSevice from "../../services/tems-tools/awaitAndPersistence.service";

const awaitAndPersistenceController = async (req: Request, res: Response) => {
    const data = req.body;
    const response = await awaitAndPersistenceSevice(data);
    return res.json(response);
}

export default awaitAndPersistenceController;