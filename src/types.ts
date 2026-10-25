export interface Website {
  id: string;
  name: string;
  domain: string;
  url: string;
  category: string;
  categorySlug: string;
  accent: string;
  badge?: string | null;
  logo?: string | null;
  description: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  icon: string;
  accent: string;
  description: string;
  count: number;
}

export type ModalType = 'support' | 'request' | 'about' | 'dmca' | 'privacy' | 'terms' | null;
