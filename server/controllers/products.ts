import { Request, Response } from "express";
import { pool } from "../db/db";
import { ResultSetHeader } from "mysql2";

const getAllProducts = async (req: Request, res: Response) => {
  const { page } = req.query;

  const LIMIT = 100;

  const offset = (Number(page) + 1 - 1) * LIMIT;

  const query = "SELECT * FROM products LIMIT ? OFFSET ?";

  try {
    const result = await pool.query<ResultSetHeader>(query, [LIMIT, offset]);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export { getAllProducts };
