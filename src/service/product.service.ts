import {  Product } from "../models/product.interface";
import {convertToSlug} from '../models/product.convert'

let products: Product[] = [
     {
        id:1,
        name: 'Nike Jordan',
        price: 1000000,
        description: 'Luxury Brand',
    },
    {
        id:2,
        name: 'Grimmdc Tee',
        price: 30000,
        description: 'Local Brand',
    },
     {
        id:3,
        name: 'Mollyclo Jeans',
        price: 50000,
        description: 'Golbal Brand',
    },
     {
        id:4,
        name: 'Riot Jacket',
        price: 20000,
        description: 'Denim Brand',
    },
     {
        id:5,
        name: 'Rain Coat',
        price: 200000,
        description: 'Ultra Brand',
    },
];

export const findAll = async (): Promise<Product[]> => Object.values(products);

export const findByName = async (name: string): Promise<Product[]> =>  products.filter(product => convertToSlug(product.name) == name);

export const findById = async (id: number): Promise<Product> =>  products.filter(product => product.id == id)[0];

export const create = async (newItem: Product): Promise<Product | null> => {

  const checkId = products.filter(product => product.id == newItem.id)[0];

  if(checkId){
    return null;
  }

  const product: Product = {
    ...newItem,
  };

  products.push(product);
  return product;
};

export const update = async (
    id: number,
    itemUpdate: Product
  ): Promise<Product | null> => {
    const product = await findById(id);
  
    if (!product) {
      return null;
    }
  
    products[id] = {  ...itemUpdate };
  
    return products[id];
  };

  export const remove = async (id: number): Promise<null | Product[]> => {
    const product = await findById(id);
    const index = await products.indexOf(product)

    if (index<= -1) {
      return null;
    }
  
    products.splice(index,1);
    return products;
  };

