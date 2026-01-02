export function toSlug(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

export function fromSlug(slug: string) {
  return slug.replace(/-/g, " ");
}
