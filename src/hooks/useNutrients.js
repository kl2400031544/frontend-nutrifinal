import { useState, useEffect } from 'react'
import { calculateDeficiencies } from '../utils/nutrientCalculator'
import { getRDA } from '../utils/rdaValues'

export const useNutrients = (totals, user) => {
  const [deficiencies, setDeficiencies] = useState([])

  useEffect(() => {
    if (!totals || !user) return

    const ageGroup = `${Math.floor(user.age / 3) * 3}-${Math.floor(user.age / 3) * 3 + 2}`
    const rda = getRDA(ageGroup, user.gender, 'all')

    const defs = calculateDeficiencies(totals, rda)
    setDeficiencies(defs)
  }, [totals, user])

  return { deficiencies }
}
