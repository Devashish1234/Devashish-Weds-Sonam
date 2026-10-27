type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  light?: boolean
  centered?: boolean
  titleId?: string
}

export function SectionHeading({ eyebrow, title, description, light = false, centered = true, titleId }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${centered ? 'section-heading--center' : ''} ${light ? 'section-heading--light' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      {description && <p className="section-heading__description">{description}</p>}
    </div>
  )
}
