import Category from "./category.model.js"

export const defaultCategory = async () => {
    const defaultCategory = {
        "name": "Alimentos",
        "description": "Categoria de alimentos"
    }

    const category = await Category.findOne({name: defaultCategory.name})
    if(!category){
        await Category.create(defaultCategory)
        console.log(`Categoria creada: ${defaultCategory.name}`)
    }
}