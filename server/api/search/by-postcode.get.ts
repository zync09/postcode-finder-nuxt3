import { promises as fs } from 'fs';
import path from 'path';

let cachedPostcodes: PostcodeData[] | null = null;

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const postcodes = query.postcodes as string;

  if (!postcodes) {
    return { error: 'No postcodes provided' };
  }

  const postcodeList: string[] = postcodes.split(',').map(pc => pc.trim());

  if (postcodeList.length === 0) {
    return { error: 'No postcodes provided' };
  }

  try {
    const allPostcodes = await loadPostcodes();

    const filteredPostcodes = allPostcodes
      .filter(item => postcodeList.includes(item.postcode))
      .map(item => ({
        postcode: item.postcode,
        state: item.state,
        locality: item.locality,
      }));

    const unknownPostcodes = postcodeList.filter(pc => !filteredPostcodes.find(item => item.postcode === pc));

    return {
      filteredPostcodes,
      unknownPostcodes,
    };
  } catch (error) {
    return { error: 'Failed to load postcodes data' };
  }
});

async function loadPostcodes(): Promise<PostcodeData[]> {
  if (cachedPostcodes) return cachedPostcodes;

  const filePath = path.resolve(process.cwd(), 'public', 'postcodes.json');
  const fileData = await fs.readFile(filePath, 'utf-8');
  cachedPostcodes = JSON.parse(fileData);
  
  return cachedPostcodes || [];
}


type PostcodeData = {
  postcode: string;
  state: string;
  locality: string;
};