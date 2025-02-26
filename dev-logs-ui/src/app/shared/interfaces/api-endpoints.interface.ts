import { CategoryDataEndpoints } from "./category-data-endpoints.interface";
import { ProjectDataEndpoints } from "./project-data-endpoints.interface";

export interface ApiEndpoints {
    categoryData: CategoryDataEndpoints;
    projectData: ProjectDataEndpoints
}