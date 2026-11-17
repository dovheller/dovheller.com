export const languages = ['he', 'en'] as const;
export type Language = (typeof languages)[number];
export const views = ['home', 'about', 'capabilities', 'cyber', 'proofs', 'approach', 'contact'] as const;
export type View = (typeof views)[number];

export const site = {
  email: 'contact@dovheller.com',
  gtmId: undefined as string | undefined,
  ga4Id: undefined as string | undefined,
  whatsapp: undefined as string | undefined,
  contactEndpoint: undefined as string | undefined,
};

export const labels = {
  he: { home: 'ראשי', about: 'דב הלר', capabilities: 'יכולות', cyber: 'סייבר', proofs: 'הוכחות', approach: 'דרך עבודה', contact: 'קשר' },
  en: { home: 'Home', about: 'Dov Heller', capabilities: 'Capabilities', cyber: 'Cyber', proofs: 'Selected work', approach: 'Approach', contact: 'Contact' }
} satisfies Record<Language, Record<View, string>>;
