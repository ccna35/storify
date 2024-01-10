import { Request, Response } from "express";
import { pool } from "../db/db";
import { ResultSetHeader } from "mysql2";

const createProduct = async (req: Request, res: Response) => {
  const {
    product_name,
    description,
    price,
    stock_quantity,
    manufacturer,
    category,
    is_featured,
  } = req.body;

  const product_details = [
    [
      product_name,
      description,
      price,
      stock_quantity,
      manufacturer,
      category,
      is_featured,
    ],
  ];

  try {
    // Insert a new product
    const newProductQuery =
      "INSERT INTO products(product_name, description, price, stock_quantity, manufacturer, category, is_featured) VALUES ?";
    await pool.query<ResultSetHeader>(newProductQuery, [product_details]);

    return res
      .status(201)
      .json({ message: "Product was created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

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

const getOneProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const query = "SELECT * FROM products WHERE id = ?";

  try {
    const result = await pool.query<ResultSetHeader>(query, [id]);

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Delete a product
    const query = "DELETE FROM products WHERE id = ?";
    await pool.query<ResultSetHeader>(query, [id]);

    return res
      .status(201)
      .json({ message: "Product was deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const {
    product_name,
    description,
    price,
    stock_quantity,
    manufacturer,
    category,
    is_featured,
  } = req.body;

  const product_details = {
    product_name,
    description,
    price,
    stock_quantity,
    manufacturer,
    category,
    is_featured,
  };
  try {
    // Update a product
    const newProductQuery = "UPDATE products SET ? WHERE id = ?";
    await pool.query<ResultSetHeader>(newProductQuery, [product_details, id]);

    return res
      .status(201)
      .json({ message: "Product was updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export {
  getAllProducts,
  createProduct,
  deleteProduct,
  getOneProduct,
  updateProduct,
};
