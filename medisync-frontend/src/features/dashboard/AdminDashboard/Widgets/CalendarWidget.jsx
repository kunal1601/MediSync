import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { calendarEvents } from '../data/dummyData'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function CalendarWidget() {
  const today = useMemo(() => new Date(), [])
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  )

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const monthLabel = viewDate
    .toLocaleString('default', { month: 'long', year: 'numeric' })
    .toUpperCase()

  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells = []
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, current: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true })
  }
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, current: false })
  }

  const prev = () => setViewDate(new Date(year, month - 1, 1))
  const next = () => setViewDate(new Date(year, month + 1, 1))
  const goToday = () =>
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1))

  const hasEvent = (day) => {
    const key = dateKey(year, month, day)
    return calendarEvents[key]?.length > 0
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={prev}
          className="rounded p-1 text-medisync-muted hover:bg-gray-100 hover:text-medisync-text"
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={goToday}
          className="text-xs font-semibold tracking-wide text-medisync-text hover:text-medisync-teal"
        >
          {monthLabel}
        </button>
        <button
          type="button"
          onClick={next}
          className="rounded p-1 text-medisync-muted hover:bg-gray-100 hover:text-medisync-text"
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
        {DAYS.map((d) => (
          <div key={d} className="py-1 font-medium text-medisync-muted">
            {d}
          </div>
        ))}
        {cells.map((cell, i) => {
          const todayCell = cell.current && isToday(cell.day)
          const event = cell.current && hasEvent(cell.day)
          return (
            <button
              key={i}
              type="button"
              title={
                todayCell
                  ? 'Today'
                  : event
                    ? calendarEvents[dateKey(year, month, cell.day)]?.join(', ')
                    : undefined
              }
              className={`relative mx-auto flex h-8 w-8 flex-col items-center justify-center rounded-full text-xs transition-colors ${
                todayCell
                  ? 'bg-medisync-teal font-semibold text-white'
                  : cell.current
                    ? 'text-medisync-text hover:bg-gray-100'
                    : 'text-gray-300'
              }`}
            >
              {cell.day}
              {event && !todayCell && (
                <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-medisync-teal" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
