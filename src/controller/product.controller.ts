import  { Request, Response } from "express";
import * as ItemService from "../service/product.service";
import {  Product } from "../models/product.interface";

// export const itemController = express.Router();

// GET items

const getAllItem= async (req: Request, res: Response) => {
    try {
      const items: Product[] = await ItemService.findAll();
  
      res.status(200).send(items);
    } catch (e) {
      res.status(500).send(e);
    }
  };
  
  // GET items/name=:name
  
  const getByName =async (req: Request, res: Response) => {
    const name: string = req.params.name;
  
    try {
      const items: Product[] = await ItemService.findByName(name);
        
      if (items.length > 0) {
        return res.status(200).send(`{
            code: 200,
            product:${JSON.stringify(items)}
        }`
        );
      }
  
      res.status(404).send("item not found");
    } catch (e) {
      res.status(500).send(e);
    }
  };
  
  // GET items/:id
  
  const getById= async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const item: Product = await ItemService.findById(id);
  
      if (item) {
        return res.status(200).send(item);
      }
  
      res.status(404).send("item not found");
    } catch (e) {
      res.status(500).send(e);
    }
  };
  
  // POST items
  
  const createItem= async (req: Request, res: Response) => {
    try {
      const item: Product = req.body;
  
      const newItem = await ItemService.create(item);
  
      res.status(201).json(newItem);
    } catch (e) {
      res.status(500).send(e);
    }
  };
  
  // PUT items/:id
  
  const updateById= async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const itemUpdate: Product = req.body;
  
      const existingItem: Product = await ItemService.findById(id);
  
      if (existingItem) {
        const updatedItem = await ItemService.update(id, itemUpdate);
        return res.status(200).json(updatedItem);
      }
  
      const newItem = await ItemService.create(itemUpdate);
  
      res.status(201).json(newItem);
    } catch (e) {
      res.status(500).send(e);
    }
  };
  
  // DELETE items/:id
  
  const deleteById =async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      const items: Product[] | null = await ItemService.remove(id);
  
      res.status(200).send(items);
    } catch (e) {
      res.status(500).send(e);
    }
  };
  
  export default {getAllItem, getById, getByName, updateById, createItem, deleteById};