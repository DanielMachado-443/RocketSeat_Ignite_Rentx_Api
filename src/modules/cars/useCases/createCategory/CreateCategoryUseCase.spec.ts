import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("Create Category", () => {

    let createCategoryUseCase: CreateCategoryUseCase;
    let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })

    it("should be able to create a new category", async () => {        
        const category = {
            name: "Category Test",
            description: "Category description Test",  
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name
        );

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new category with the same name", async () => {     
        expect(async () => {
            const category = {
                name: "Category Test",
                description: "Category description Test",  
            }
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);                
    });
});