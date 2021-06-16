import CategoriesDB from '../src/server/api/lib/CategoriesDb.js';
import ProductsDB from '../src/server/api/lib/ProductsDb.js';
import UsersDB from '../src/server/api/lib/UsersDb.js';

const categoryDb = new CategoriesDB();
const productsDb = new ProductsDB();
const usersDb = new UsersDB();

describe('Database Categories test sqlite3', () => {

  it('should test category database', async() => {
    const categories = await categoryDb.getAll();
    const products = await categoryDb.getCategory(1);
    const all_products = await categoryDb.getCategoryAllProducts(2); 
    expect(Array.isArray(categories)).toBe(true);
    expect(Array.isArray(products.products)).toBe(true);
    expect(Array.isArray(all_products.products)).toBe(true);
    expect(categories.length).toBeGreaterThan(9);
    expect(all_products.products.length).toBeGreaterThan(5);
    expect(products.products.length).toBeGreaterThan(3);
  })

  it('should test products database', async() => {
  
    const products = await productsDb.getAll();
    const products_promo = await productsDb.getAllProductsWithPromo();
    const one_product = await productsDb.getProduct(1);
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(50);
    expect(Array.isArray(products_promo)).toBe(true);
    expect(products_promo.length).toBeGreaterThan(8);
    expect(Array.isArray(one_product.reviews)).toBe(true);
    expect(Array.isArray(one_product.tags)).toBe(true);
  })

  it('should test users database', async() => {
    const users = await usersDb.get();
    const profile = await usersDb.getProfile();
    expect(Array.isArray(users)).toBe(true);
    expect(Array.isArray(profile)).toBe(true);
  })
});
