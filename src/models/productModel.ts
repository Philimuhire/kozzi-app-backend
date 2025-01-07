import db from '../config/db';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; 
  qty: number;   
  image_url: string;
  created_at: Date;
}

export const createProduct = async (product: Omit<Product, 'id' | 'created_at'>): Promise<Product> => {
  const query = `
    INSERT INTO products (name, description, price, qty, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [product.name, product.description, product.price, product.qty, product.image_url];
  const { rows } = await db.query(query, values);
  return rows[0];
};

export const getAllProducts = async (): Promise<Product[]> => {
  const query = `SELECT * FROM products ORDER BY created_at DESC;`;
  const { rows } = await db.query(query);
  return rows;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const query = `SELECT * FROM products WHERE id = $1;`;
  const { rows } = await db.query(query, [id]);
  return rows[0] || null;
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
  const query = `
    UPDATE products
    SET name = COALESCE($1, name),
        description = COALESCE($2, description),
        price = COALESCE($3, price),
        qty = COALESCE($4, qty),
        image_url = COALESCE($5, image_url)
    WHERE id = $6
    RETURNING *;
  `;
  const values = [updates.name, updates.description, updates.price, updates.qty, updates.image_url, id];
  const { rows } = await db.query(query, values);
  return rows[0] || null;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const query = `DELETE FROM products WHERE id = $1;`;
  await db.query(query, [id]);
};
