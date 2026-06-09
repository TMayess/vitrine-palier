export default function LegalSection({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="font-display italic text-2xl text-palier-ivory mb-4 pb-2 border-b border-palier-cyan/15">
        {title}
      </h2>
      <div className="text-palier-muted leading-relaxed space-y-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  )
}
