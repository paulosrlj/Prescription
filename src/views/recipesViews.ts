import Recipe from '../entities/Recipe';
import { CardResponse, handleCard } from './cardViews';
import { handleDoctor, DoctorResponse } from './doctorsViews';
import { handleMedicine, MedicineResponse } from './medicinesViews';

interface RecipeResponse {
  id: string;
  validade: Date;
  due: boolean;
  card: CardResponse;
  doctor: DoctorResponse;
  medicines: MedicineResponse[];
}

export function handleRecipe(recipe: Recipe): RecipeResponse {
  const doctorFiltered = handleDoctor(recipe.doctor);
  const medicinesFiltered = recipe.medicines.map(m => handleMedicine(m));
  const cardFiltered = handleCard(recipe.card);

  return {
    id: recipe.id,
    validade: recipe.validade,
    due: recipe.due,
    card: cardFiltered,
    doctor: doctorFiltered,
    medicines: medicinesFiltered,
  };
}
