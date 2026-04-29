import AppShell from '../../components/layout/AppShell'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { Save } from 'lucide-react'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function RDAConfigPage() {
  const [rdaValues, setRdaValues] = useState({
    '6-8': { male: { Iron: 8, Calcium: 1000 }, female: { Iron: 8, Calcium: 1000 } },
    '9-11': { male: { Iron: 8, Calcium: 1200 }, female: { Iron: 8, Calcium: 1200 } },
  })

  const handleSave = () => {
    toast.success('RDA values updated successfully!')
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="font-display font-semibold text-3xl text-slate-900">RDA Configuration</h1>

        {Object.entries(rdaValues).map(([ageGroup, genders]) => (
          <div key={ageGroup} className="space-y-3">
            <h2 className="font-semibold text-slate-900">Age Group: {ageGroup} years</h2>
            {Object.entries(genders).map(([gender, nutrients]) => (
              <Card key={gender} className="space-y-3">
                <h3 className="font-medium text-slate-900 capitalize">{gender}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(nutrients).map(([nutrient, value]) => (
                    <Input
                      key={nutrient}
                      label={nutrient}
                      type="number"
                      value={value}
                      onChange={(e) => {
                        setRdaValues((prev) => ({
                          ...prev,
                          [ageGroup]: {
                            ...prev[ageGroup],
                            [gender]: {
                              ...prev[ageGroup][gender],
                              [nutrient]: e.target.value,
                            },
                          },
                        }))
                      }}
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ))}

        <div className="flex gap-3">
          <Button leftIcon={<Save size={18} />} onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="secondary">Reset to Defaults</Button>
        </div>
      </div>
    </AppShell>
  )
}
