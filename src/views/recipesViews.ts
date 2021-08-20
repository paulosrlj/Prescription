import Recipe from '../entities/Recipe';
import { CardResponse, handleCard } from './cardViews';
import { handleDoctor, DoctorResponse } from './doctorsViews';
import { handleMedicine, MedicineResponse } from './medicinesViews';
import { handleManyImages, ImageResponse } from './imagesViews';

interface RecipeResponse {
  id: string;
  validade: Date;
  due: boolean;
  card: CardResponse;
  doctor: DoctorResponse;
  medicines: MedicineResponse[];
  images: ImageResponse[];
}

export function handleRecipe(recipe: Recipe): RecipeResponse {
  const doctorFiltered = handleDoctor(recipe.doctor);
  const medicinesFiltered = recipe.medicines.map(m => handleMedicine(m));
  const cardFiltered = handleCard(recipe.card);
  const imagesFiltered = handleManyImages(recipe.images);
  console.log(recipe.images);
  console.log(imagesFiltered);
  delete doctorFiltered.recipes;

  return {
    id: recipe.id,
    validade: recipe.validade,
    due: recipe.due,
    card: cardFiltered,
    doctor: doctorFiltered,
    medicines: medicinesFiltered,
    images: imagesFiltered,
  };
}
