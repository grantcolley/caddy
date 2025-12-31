/**
 * Build an absolute path from URL-safe segments.
 * buildPath("admin", "users") -> "/admin/users"
 */
export function buildPath(...segments: string[]): string {
  return '/' + segments.map(stripSlashes).filter(Boolean).join('/');
}

/**
 * Join an absolute parent path with a child segment.
 * joinPaths("/admin/users", ":id") -> "/admin/users/:id"
 */
export function joinPaths(parent: string, child: string): string {
  return `${parent.replace(/\/+$/, '')}/${child.replace(/^\/+/, '')}`;
}

/**
 * Remove leading and trailing slashes.
 */
export function stripSlashes(value: string): string {
  return value.replace(/^\/+/, '').replace(/\/+$/, '');
}

/**
 * Assert a value exists (used to keep index routes safe).
 */
export function must(value: string | undefined, message: string): string {
  if (!value) throw new Error(message);
  return value;
}

/**
 * Convert names into URL-safe slugs.
 */
export function slug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-_/:%]+/g, '');
}

/**
 * Make a readable breadcrumb label from a path segment.
 */
export function prettifySegment(segment: string): string {
  if (segment.startsWith(':')) return segment.slice(1);
  return segment.replace(/-/g, ' ');
}
