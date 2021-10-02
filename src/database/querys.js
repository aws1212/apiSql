export const queries = {
    getAllProducts: "select * from Products",
    addNewProduct: 'insert into Products (name_,description_,quantity) values (@name,@description_,@quantity)',
    getProductById: 'select * from Products where id = @id',
    deleteProductById: 'delete from Products where id = @id',
    getTotalProducts: 'select count(*) from Products',
    updateProductById: 'update Products set name_ = @name, description_ = @description, quantity = @quantity where id = @id',
}

