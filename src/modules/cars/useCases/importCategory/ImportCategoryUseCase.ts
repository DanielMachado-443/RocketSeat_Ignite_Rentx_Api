import { parse } from "csv-parse";
import fs from "fs"; //<< It's Node's native module
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory{
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}  
    
    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject)  => {
        const stream = fs.createReadStream(file.path);
        const categories: IImportCategory[] = [];

        const parseFile = parse();
        
        stream.pipe(parseFile);

        parseFile.on("data", async(line) => {
            const [name, description] = line;
            categories.push({
                name, 
                description,
            });
          })
          .on("end", () => {        //<< Making the promising work
              fs.promises.unlink(file.path);
              resolve(categories);
          })
          .on("error", (err) => {
              reject(err);
          })
        });        
    }

    async execute(file: Express.Multer.File): Promise<void> {  
        const categories = await this.loadCategories(file);           
        
        categories.map(async category => { //<< It iterates through categories array
            const { name, description } = category;

            const existCategory = await this.categoriesRepository.findByName(name);
            
            if(!existCategory){
                await this.categoriesRepository.create({ 
                   name, 
                   description, 
                });
            }
        })
    }
}

export { ImportCategoryUseCase };