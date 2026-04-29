import { NUTRIENTS } from '../constants/nutrients'

export const calculateMealNutrients = (foods) => {
  const totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    [NUTRIENTS.IRON]: 0,
    [NUTRIENTS.CALCIUM]: 0,
    [NUTRIENTS.VITAMIN_D]: 0,
    [NUTRIENTS.VITAMIN_B12]: 0,
    [NUTRIENTS.ZINC]: 0,
    [NUTRIENTS.PROTEIN]: 0,
    [NUTRIENTS.FIBER]: 0,
    [NUTRIENTS.VITAMIN_C]: 0,
    [NUTRIENTS.FOLATE]: 0,
    [NUTRIENTS.MAGNESIUM]: 0,
    [NUTRIENTS.POTASSIUM]: 0,
    [NUTRIENTS.OMEGA3]: 0,
  }

  foods.forEach((food) => {
    const portion = (food.portion || 100) / 100

    totals.calories += (food.calories || 0) * portion
    totals.protein += (food.protein || 0) * portion
    totals.carbs += (food.carbs || 0) * portion
    totals.fat += (food.fat || 0) * portion
    totals.fiber += (food.fiber || 0) * portion
    totals[NUTRIENTS.IRON] += (food.iron || 0) * portion
    totals[NUTRIENTS.CALCIUM] += (food.calcium || 0) * portion
    totals[NUTRIENTS.VITAMIN_D] += (food.vitaminD || 0) * portion
    totals[NUTRIENTS.VITAMIN_B12] += (food.vitaminB12 || 0) * portion
    totals[NUTRIENTS.ZINC] += (food.zinc || 0) * portion
    totals[NUTRIENTS.PROTEIN] += (food.protein || 0) * portion
    totals[NUTRIENTS.FIBER] += (food.fiber || 0) * portion
    totals[NUTRIENTS.VITAMIN_C] += (food.vitaminC || 0) * portion
    totals[NUTRIENTS.FOLATE] += (food.folate || 0) * portion
    totals[NUTRIENTS.MAGNESIUM] += (food.magnesium || 0) * portion
    totals[NUTRIENTS.POTASSIUM] += (food.potassium || 0) * portion
    totals[NUTRIENTS.OMEGA3] += (food.omega3 || 0) * portion
  })

  return totals
}

export const calculateDailyTotals = (meals) => {
  let allFoods = []
  meals.forEach((meal) => {
    allFoods = allFoods.concat(meal.foods || [])
  })
  return calculateMealNutrients(allFoods)
}

export const calculateDeficiencies = (totals, rda) => {
  const deficiencies = []

  Object.keys(rda).forEach((nutrient) => {
    const current = totals[nutrient] || 0
    const rdaValue = rda[nutrient] || 0
    const percent = rdaValue > 0 ? (current / rdaValue) * 100 : 100

    if (percent < 100) {
      deficiencies.push({
        nutrient,
        current,
        rda: rdaValue,
        percent: Math.round(percent),
        severity: getSeverity(percent),
      })
    }
  })

  return deficiencies.sort((a, b) => a.percent - b.percent)
}

export const getSeverity = (percent) => {
  if (percent < 50) return 'critical'
  if (percent < 70) return 'moderate'
  if (percent < 100) return 'mild'
  return 'normal'
}
