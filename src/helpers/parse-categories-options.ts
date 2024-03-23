import { Category, SelectOption } from '../interfaces';

/**
 * Parse the categories to options.
 * 
 * @param categories The categories. 
 * @returns The categories options. 
 */
export const parseCategoriesOptions = (
  categories: Category[]
): SelectOption[] => {
  return categories.map((category) => ({
    label: category.label,
    value: category.id,
  }));
};
