// types/societies.ts
export type Block = "T" | "TO" | "O" | "W" | "C" | "CC" | "M" | "S";

export type Social = "fb" | "insta" | "metawiki" | "linkedin" | "website" | "slack" | "twitter" | "email" | "youtube";

export interface Society {
  /** The chemical symbol equivalent for the society element. Can be any unique two-letter combination. */
  symbol: string;
  /** The full name of the society. */
  name: string;
  /** The year the society was founded. */
  year: number;
  /** 
   * The team size: (S)mall, (M)edium, (L)arge, e(X)tra (L)arge, and (N)ot (A)pplicable [for open societies].
   * There is no strict definition for this yet, use your discretion.
   */
  size: "S" | "M" | "L" | "XL" | "NA";
  /** Whether the society is recognized by the Technology Students' Gymkhana (TSG). */
  cosa: boolean;
  /** 
   * Links to the society's socials. Email addresses should be prepended with a `mailto:` and all URLs must use https.
   * See the `Social` type for supported socials.
   */
  links: Partial<Record<Social, string>>;
  /** A short description for the society. */
  description: string;
  /** 
   * Block of the periodic table:
   * T - Technical
   * O - Organizational
   * C - Creative
   * W - Welfare
   * U - Uncategorized
   *
   * A combination of these letters denotes a special block that is either a cross between two blocks or a sub-block.
   */
  block: Block;
  /** Whether the society is now inactive. */
  inactive?: boolean;
}
