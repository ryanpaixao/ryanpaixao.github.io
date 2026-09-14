export function isExternalLink(to: string, base: string = window.location.href): boolean {
  try {
    return new URL(to, base).origin !== new URL(base).origin
  } catch {
    return false // relative or malformed ==> treat as internal
  }
}

export function shouldOpenNewTab(to: string, isExternal: boolean): boolean {
  return !!to && isExternal && /^(https?:)?\/\//i.test(to)
}
