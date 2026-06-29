export default function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-4 text-violet-700">
        {icon}
      </div>

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <strong className="mt-1 block text-2xl text-slate-900">
        {value}
      </strong>
    </div>
  )
}