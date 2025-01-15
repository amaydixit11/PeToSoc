// import { Society } from "@/types/societies";

// utils/societies.ts
export class SocietyError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "SocietyError";
    }
  }
  
// export function validateSocieties(societies: Society[]): void {
//   const symbolMap = new Map<string, number>();

//   societies.forEach((society, index) => {
//     // Check for empty symbols
//     if (!society.symbol) {
//       throw new SocietyError(`Society "${society.name}" has an empty symbol.`);
//     }

//     // Check for duplicate symbols
//     if (symbolMap.has(society.symbol)) {
//       const duplicateIndex = symbolMap.get(society.symbol)!;
//       throw new SocietyError(
//         `Societies "${society.name}" and "${societies[duplicateIndex].name}" have the same symbol.`
//       );
//     }
//     symbolMap.set(society.symbol, index);

//     // Check for required links
//     if (!society.inactive && Object.keys(society.links).length === 0) {
//       throw new SocietyError(`Society "${society.name}" has no links.`);
//     }

//     // Validate URLs
//     Object.entries(society.links).forEach(([type, url]) => {
//       if (type === 'email' && !url.startsWith('mailto:')) {
//         throw new SocietyError(
//           `Society "${society.name}" has an invalid email link. Email links must start with "mailto:".`
//         );
//       }
//       if (type !== 'email' && !url.startsWith('https://')) {
//         throw new SocietyError(
//           `Society "${society.name}" has an invalid ${type} link. URLs must use HTTPS.`
//         );
//       }
//     });
//   });
// }