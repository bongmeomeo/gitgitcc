import itemsRouter from './product.router'

export default function route(app:any){
    app.use('/items', itemsRouter);
}