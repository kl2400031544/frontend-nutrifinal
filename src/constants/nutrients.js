export const NUTRIENTS = {
  IRON: 'Iron',
  CALCIUM: 'Calcium',
  VITAMIN_D: 'Vitamin D',
  VITAMIN_B12: 'Vitamin B12',
  ZINC: 'Zinc',
  PROTEIN: 'Protein',
  FIBER: 'Fiber',
  VITAMIN_C: 'Vitamin C',
  FOLATE: 'Folate',
  MAGNESIUM: 'Magnesium',
  POTASSIUM: 'Potassium',
  OMEGA3: 'Omega-3',
}

export const NUTRIENT_UNITS = {
  [NUTRIENTS.IRON]: 'mg',
  [NUTRIENTS.CALCIUM]: 'mg',
  [NUTRIENTS.VITAMIN_D]: 'mcg',
  [NUTRIENTS.VITAMIN_B12]: 'mcg',
  [NUTRIENTS.ZINC]: 'mg',
  [NUTRIENTS.PROTEIN]: 'g',
  [NUTRIENTS.FIBER]: 'g',
  [NUTRIENTS.VITAMIN_C]: 'mg',
  [NUTRIENTS.FOLATE]: 'mcg',
  [NUTRIENTS.MAGNESIUM]: 'mg',
  [NUTRIENTS.POTASSIUM]: 'mg',
  [NUTRIENTS.OMEGA3]: 'g',
}

export const NUTRIENT_COLORS = {
  [NUTRIENTS.IRON]: '#E74C3C',
  [NUTRIENTS.CALCIUM]: '#3498DB',
  [NUTRIENTS.VITAMIN_D]: '#F39C12',
  [NUTRIENTS.VITAMIN_B12]: '#9B59B6',
  [NUTRIENTS.ZINC]: '#1ABC9C',
  [NUTRIENTS.PROTEIN]: '#E67E22',
  [NUTRIENTS.FIBER]: '#27AE60',
  [NUTRIENTS.VITAMIN_C]: '#C0392B',
  [NUTRIENTS.FOLATE]: '#8E44AD',
  [NUTRIENTS.MAGNESIUM]: '#16A085',
  [NUTRIENTS.POTASSIUM]: '#D35400',
  [NUTRIENTS.OMEGA3]: '#2980B9',
}

export const AGE_GROUPS = [
  { label: '6-8 years', value: '6-8' },
  { label: '9-11 years', value: '9-11' },
  { label: '12-14 years', value: '12-14' },
  { label: '15-18 years', value: '15-18' },
]

export const GENDERS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
]

export const ALLERGIES = [
  'Nuts',
  'Dairy',
  'Gluten',
  'Eggs',
  'Soy',
  'Shellfish',
]

export const HEALTH_CONDITIONS = [
  'Anemia',
  'Diabetes',
  'Lactose Intolerance',
  'Celiac',
  'None',
]

export const DIETARY_PREFERENCES = [
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Non-Vegetarian', value: 'non-vegetarian' },
  { label: 'Vegan', value: 'vegan' },
]

export const MEAL_FREQUENCIES = [
  { label: '3 meals/day', value: 3 },
  { label: '4 meals/day', value: 4 },
  { label: '5 meals/day', value: 5 },
]

export const FOOD_CATEGORIES = [
  'Grains',
  'Dairy',
  'Vegetables',
  'Fruits',
  'Protein',
  'Snacks',
]
