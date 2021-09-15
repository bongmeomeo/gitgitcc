import express from 'express';
import itemController from '../controller/product.controller';
const itemsRouter = express.Router();

itemsRouter.get('/', itemController.getAllItem);
itemsRouter.get('/id=:id', itemController.getById);
itemsRouter.get('/name=:name',itemController.getByName);
itemsRouter.post('/', itemController.createItem);
itemsRouter.put('/:id', itemController.updateById);
itemsRouter.delete('/:id', itemController.deleteById);

export = itemsRouter;