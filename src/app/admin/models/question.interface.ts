import { Option } from "./option.interface";

export interface Question {
    id: number,
    question: string,
    options?: Option[]
}