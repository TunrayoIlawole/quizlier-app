import { Option } from "./option.interface";

export interface Question {
    id: number,
    question: string,
    categoryId: number,
    options?: Option[]
}