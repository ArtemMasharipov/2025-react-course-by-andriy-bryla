import { Alert, Button, Input } from '../../../shared/ui'
import { TRAINER_CONFIG } from '../constants'

export const TrainerForm = ({ total, setTotal, onStart, error }) => (
  <div className="text-center space-y-6">
    {error && (
      <Alert type="error">
        {error}
      </Alert>
    )}

    <div className="bg-gray-50 rounded-lg p-6">
      <Input
        label={`Кількість прикладів (${TRAINER_CONFIG.MIN_EXAMPLES}-${TRAINER_CONFIG.MAX_EXAMPLES}):`}
        type="number"
        value={total || ''}
        onChange={(e) => setTotal(Number(e.target.value))}
        min={TRAINER_CONFIG.MIN_EXAMPLES}
        max={TRAINER_CONFIG.MAX_EXAMPLES}
        className="text-center w-32 mx-auto"
        required
      />
    </div>

    <Button
      onClick={onStart}
      size="lg"
      disabled={total <= 0}
    >
      🚀 Почати тренування
    </Button>
  </div>
)
