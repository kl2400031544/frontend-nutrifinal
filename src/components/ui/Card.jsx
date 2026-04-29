import clsx from 'clsx'

export default function Card({ className, children, ...rest }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl shadow-card border border-slate-100 p-6',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
