import Recipe from '../entities/Recipe';
import { CardResponse, handleCard } from './cardViews';
import { handleDoctor, DoctorResponse } from './doctorsViews';
import { handleMedicine, MedicineResponse } from './medicinesViews';
import { handleImage, handleManyImages, ImageResponse } from './imagesViews';
import Card from '../entities/Card';
import Doctor from '../entities/Doctor';
import Image from '../entities/Image';
import Medicine from '../entities/Medicine';

export interface RecipeResponse {
  id: string;
  illness_name: string;
  validade: Date;
  due: boolean;
  card?: CardResponse;
  doctor?: DoctorResponse;
  medicines?: MedicineResponse[];
  images?: ImageResponse[];
  created_at?: Date;
}

export interface RecipeType {
  id: string;
  illness_name: string;
  validade: Date;
  due: boolean;
  card?: Card;
  doctor?: Doctor;
  images?: Image[];
  created_at?: Date;
  updated_at?: Date;
  medicines: Medicine[];
}

export function handleRecipe(recipe: RecipeType): RecipeResponse {
  const doctorFiltered = handleDoctor(recipe.doctor);
  const medicinesFiltered = recipe.medicines.map(m => handleMedicine(m));
  const cardFiltered = handleCard(recipe.card);
  const imagesFiltered = handleManyImages(recipe.images);

  delete doctorFiltered.recipes;

  return {
    id: recipe.id,
    illness_name: recipe.illness_name,
    validade: recipe.validade,
    due: recipe.due,
    card: cardFiltered,
    doctor: doctorFiltered,
    medicines: medicinesFiltered,
    images: imagesFiltered,
  };
}

export function handleDoctorRecipe(recipe: Recipe): RecipeResponse {
  return {
    id: recipe.id,
    illness_name: recipe.illness_name,
    validade: recipe.validade,
    due: recipe.due,
    created_at: recipe.created_at,
  };
}

export function handleRecipes(recipes: RecipeType[]): RecipeResponse[] {
  let doctorFiltered;
  let medicinesFiltered;
  let cardFiltered;
  let imagesFiltered;

  const filteredRecipes = recipes.map(r => {
    doctorFiltered = handleDoctor(r.doctor);

    if (r.medicines && r.medicines.length > 0) {
      medicinesFiltered = r.medicines.map(m => handleMedicine(m));
    }
    cardFiltered = handleCard(r.card);

    if (r.images && r.images.length > 0)
      imagesFiltered = r.images.map(i => handleImage(i));

    delete doctorFiltered.recipes;

    return {
      id: r.id,
      illness_name: r.illness_name,
      validade: r.validade,
      due: r.due,
      card: cardFiltered,
      doctor: doctorFiltered,
      medicines: medicinesFiltered,
      images: imagesFiltered,
    };
  });

  return filteredRecipes;
}
