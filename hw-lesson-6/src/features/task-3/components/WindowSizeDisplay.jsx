import {
  DEVICE_BREAKPOINTS,
  DEVICE_ICONS,
  DEVICE_LABELS,
  DEVICE_TYPES,
  WINDOW_SIZE_LABELS
} from '../constants'
import useWindowSize from '../hooks/useWindowSize'
import InfoRow from './InfoRow'

const WindowSizeDisplay = () => {
  const { width, height } = useWindowSize()

  const getDeviceType = (width) => {
    if (width <= DEVICE_BREAKPOINTS.MOBILE_MAX) {
      return DEVICE_TYPES.MOBILE
    }
    if (width <= DEVICE_BREAKPOINTS.TABLET_MAX) {
      return DEVICE_TYPES.TABLET
    }
    return DEVICE_TYPES.DESKTOP
  }

  const deviceType = getDeviceType(width)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">
          {DEVICE_ICONS[deviceType]}
        </div>
        {/* <h3 className="text-xl font-semibold text-gray-800">
          {DEVICE_LABELS[deviceType]}
        </h3> */}
      </div>

      <div className="space-y-4">
        <InfoRow
          label={WINDOW_SIZE_LABELS.WIDTH}
          value={`${width} ${WINDOW_SIZE_LABELS.PIXELS}`}
        />

        <InfoRow
          label={WINDOW_SIZE_LABELS.HEIGHT}
          value={`${height} ${WINDOW_SIZE_LABELS.PIXELS}`}
        />

        <InfoRow
          label={WINDOW_SIZE_LABELS.DEVICE_TYPE}
          value={DEVICE_LABELS[deviceType]}
          valueColor="text-green-600"
          valueFont="font-medium"
        />
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          💡 Змініть розмір вікна браузера, щоб побачити як змінюються значення в реальному часі
        </p>
      </div>
    </div>
  )
}

export default WindowSizeDisplay
