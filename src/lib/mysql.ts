
import mysql from 'mysql2/promise';

// MySQL connection configuration
const mysqlConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'your_database',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
};

export const createMySQLConnection = async () => {
  try {
    const connection = await mysql.createConnection(mysqlConfig);
    return connection;
  } catch (error) {
    console.error('MySQL connection failed:', error);
    throw error;
  }
};

export interface MySQLProduct {
  id?: number;
  name: string;
  description?: string;
  category: string;
  price?: number;
  image_url?: string;
  features?: string;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export const syncProductToMySQL = async (product: MySQLProduct) => {
  const connection = await createMySQLConnection();
  
  try {
    const query = `
      INSERT INTO products (name, description, category, price, image_url, features, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      description = VALUES(description),
      category = VALUES(category),
      price = VALUES(price),
      image_url = VALUES(image_url),
      features = VALUES(features),
      is_active = VALUES(is_active),
      updated_at = NOW()
    `;
    
    const [result] = await connection.execute(query, [
      product.name,
      product.description || null,
      product.category,
      product.price || null,
      product.image_url || null,
      product.features ? JSON.stringify(product.features) : null,
      product.is_active
    ]);
    
    return result;
  } finally {
    await connection.end();
  }
};

export const getProductsFromMySQL = async () => {
  const connection = await createMySQLConnection();
  
  try {
    const [rows] = await connection.execute('SELECT * FROM products ORDER BY created_at DESC');
    return rows as MySQLProduct[];
  } finally {
    await connection.end();
  }
};

export const deleteProductFromMySQL = async (productId: number) => {
  const connection = await createMySQLConnection();
  
  try {
    const [result] = await connection.execute('DELETE FROM products WHERE id = ?', [productId]);
    return result;
  } finally {
    await connection.end();
  }
};
