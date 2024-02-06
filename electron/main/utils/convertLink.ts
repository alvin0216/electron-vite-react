const ProgramData = process.env.ProgramData || '';
const LOCALAPPDATA = process.env.LOCALAPPDATA || '';

export function convertLink(link: string) {
  return link.replace('%localappdata%', LOCALAPPDATA).replace('%ProgramData%', ProgramData);
}
