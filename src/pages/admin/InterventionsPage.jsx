import { useState, useEffect } from 'react'
import AppShell from '../../components/layout/AppShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { Send, Clock, CheckCircle, MessageCircle } from 'lucide-react'
import { useSyncStore } from '../../store/syncStore'
import { syncEmitter } from '../../store/syncStore'

export default function InterventionsPage() {
  const { sendIntervention } = useSyncStore()
  const [activeTab, setActiveTab] = useState('pending')
  const [showSendModal, setShowSendModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [interventionMessage, setInterventionMessage] = useState('')

  const [interventions, setInterventions] = useState({
    pending: [
      { id: 1, userId: 'user1', user: 'Rahul Kumar', deficiency: 'Vitamin D', flagDate: '3 days ago' },
      { id: 2, userId: 'user2', user: 'Priya Singh', deficiency: 'Iron', flagDate: '5 days ago' },
    ],
    sent: [
      { id: 3, userId: 'user3', user: 'Arjun Patel', deficiency: 'Calcium', status: 'delivered', date: '2 days ago', message: 'Include fortified milk in diet' },
      { id: 4, userId: 'user4', user: 'Neha Verma', deficiency: 'Zinc', status: 'acknowledged', date: '1 week ago', message: 'Add more zinc-rich foods' },
    ],
  })

  // Listen for intervention acknowledgments
  useEffect(() => {
    const unsubscribe = syncEmitter.on('intervention_acknowledged', (data) => {
      setInterventions(prev => ({
        ...prev,
        sent: prev.sent.map(item =>
          item.id === data.interventionId
            ? { ...item, status: 'acknowledged' }
            : item
        ),
      }))
    })
    return unsubscribe
  }, [])

  const handleSendIntervention = () => {
    if (!selectedUser || !interventionMessage.trim()) return

    const newIntervention = {
      id: Date.now(),
      userId: selectedUser.userId,
      user: selectedUser.user,
      deficiency: selectedUser.deficiency,
      status: 'delivered',
      date: 'just now',
      message: interventionMessage,
    }

    // Send via sync store
    sendIntervention('admin1', selectedUser.userId, interventionMessage, selectedUser.deficiency)

    // Update UI
    setInterventions(prev => ({
      ...prev,
      pending: prev.pending.filter(item => item.id !== selectedUser.id),
      sent: [newIntervention, ...prev.sent],
    }))

    // Reset form
    setShowSendModal(false)
    setSelectedUser(null)
    setInterventionMessage('')
  }

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="font-display font-semibold text-3xl text-slate-900">Interventions</h1>

        <div className="flex gap-2">
          <button onClick={() => setActiveTab('pending')} className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'pending' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
            Pending ({interventions.pending.length})
          </button>
          <button onClick={() => setActiveTab('sent')} className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'sent' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
            Sent ({interventions.sent.length})
          </button>
        </div>

        {activeTab === 'pending' && (
          <div className="space-y-3">
            {interventions.pending.length > 0 ? (
              interventions.pending.map((item) => (
                <Card key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{item.user}</p>
                    <p className="text-sm text-slate-600">Deficiency: {item.deficiency}</p>
                    <p className="text-xs text-slate-500">Flagged {item.flagDate}</p>
                  </div>
                  <Button
                    size="sm"
                    leftIcon={<Send size={16} />}
                    onClick={() => {
                      setSelectedUser(item)
                      setShowSendModal(true)
                    }}
                  >
                    Send
                  </Button>
                </Card>
              ))
            ) : (
              <Card className="text-center py-8">
                <p className="text-slate-500">No pending interventions</p>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'sent' && (
          <div className="space-y-3">
            {interventions.sent.length > 0 ? (
              interventions.sent.map((item) => (
                <Card key={item.id} className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-slate-900">{item.user}</p>
                      <Badge variant={item.status === 'acknowledged' ? 'success' : 'info'}>
                        {item.status === 'acknowledged' ? <CheckCircle size={14} className="mr-1" /> : null}
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Deficiency: {item.deficiency}</p>
                    <p className="text-sm bg-slate-50 p-2 rounded border border-slate-200 text-slate-700">
                      {item.message}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">{item.date}</p>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="text-center py-8">
                <p className="text-slate-500">No sent interventions yet</p>
              </Card>
            )}
          </div>
        )}

        {/* Send Intervention Modal */}
        {showSendModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <div className="space-y-4">
                <div>
                  <h2 className="font-semibold text-slate-900 mb-1">Send Intervention</h2>
                  <p className="text-sm text-slate-600">To: {selectedUser.user}</p>
                  <p className="text-sm text-slate-600">Issue: {selectedUser.deficiency}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea
                    value={interventionMessage}
                    onChange={(e) => setInterventionMessage(e.target.value)}
                    placeholder="Type your intervention message..."
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    rows={4}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowSendModal(false)
                      setSelectedUser(null)
                      setInterventionMessage('')
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSendIntervention}>Send</Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  )
}
