import { Injectable, ServiceUnavailableException } from '@nestjs/common';

type DataEsRecord = {
  equip_numero?: string;
  equip_nom?: string;
  equip_type_name?: string;
  equip_type_famille?: string;
  equip_nature?: string;
  equip_sol?: string;
  equip_acc_libre?: boolean | string | null;
  equip_url?: string | null;
  equip_x?: number | string | null;
  equip_y?: number | string | null;
  equip_maj_date?: string | null;
  inst_nom?: string;
  inst_adresse?: string;
  inst_cp?: string;
  inst_acc_handi_bool?: boolean | string | null;
  new_name?: string;
  dep_nom?: string;
  reg_nom?: string;
  aps_name?: string[] | string | null;
};

type DataEsResponse = {
  total_count?: number;
  results?: DataEsRecord[];
};

const DATASET_URL =
  'https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records';

const SPORT_SEARCH_TERMS: Record<string, string> = {
  football: 'Football',
  basket: 'Basket-ball',
  badminton: 'Badminton',
  handball: 'Handball',
  volley: 'Volley-ball',
  tennis: 'Tennis',
};

function escapeQueryValue(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function readBoolean(value: boolean | string | null | undefined) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'boolean') return value;
  return value.toLowerCase() === 'true';
}

function readNumber(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function readActivities(value: string[] | string | null | undefined) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeExternalUrl(value: string | null | undefined) {
  const clean = value?.trim();
  if (!clean) return null;

  const candidate = /^https?:\/\//i.test(clean) ? clean : `https://${clean}`;

  try {
    const url = new URL(candidate);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

@Injectable()
export class PlacesService {
  async search(location: string, sport?: string) {
    const cleanLocation = location.trim();
    const normalizedSport = sport?.trim().toLowerCase();
    const sportTerm = normalizedSport ? SPORT_SEARCH_TERMS[normalizedSport] : undefined;

    const locationClause = /^\d{5}$/.test(cleanLocation)
      ? `inst_cp="${escapeQueryValue(cleanLocation)}"`
      : `search(new_name, "${escapeQueryValue(cleanLocation)}")`;

    const sportClause = sportTerm
      ? ` and (search(aps_name, "${escapeQueryValue(sportTerm)}") or search(equip_type_name, "${escapeQueryValue(sportTerm)}"))`
      : '';

    const params = new URLSearchParams({
      limit: '40',
      where: `${locationClause}${sportClause}`,
      select: [
        'equip_numero',
        'equip_nom',
        'equip_type_name',
        'equip_type_famille',
        'equip_nature',
        'equip_sol',
        'equip_acc_libre',
        'equip_url',
        'equip_x',
        'equip_y',
        'equip_maj_date',
        'inst_nom',
        'inst_adresse',
        'inst_cp',
        'inst_acc_handi_bool',
        'new_name',
        'dep_nom',
        'reg_nom',
        'aps_name',
      ].join(','),
      order_by: 'equip_nom',
    });

    const apiKey = process.env.DATA_ES_API_KEY?.trim();
    if (apiKey) {
      params.set('apikey', apiKey);
    }

    try {
      const response = await fetch(`${DATASET_URL}?${params.toString()}`, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'SportLink/1.0 (https://sportlink-app.site)',
        },
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) {
        throw new Error(`Data ES responded with ${response.status}`);
      }

      const payload = (await response.json()) as DataEsResponse;
      const results = (payload.results ?? []).map((record) => {
        const latitude = readNumber(record.equip_y);
        const longitude = readNumber(record.equip_x);
        const activities = readActivities(record.aps_name);

        return {
          id: record.equip_numero ?? `${record.inst_nom ?? 'lieu'}-${record.equip_nom ?? 'equipement'}`,
          name: record.equip_nom || record.equip_type_name || 'Équipement sportif',
          facilityName: record.inst_nom || null,
          type: record.equip_type_name || null,
          family: record.equip_type_famille || null,
          activities,
          address: record.inst_adresse || null,
          postalCode: record.inst_cp || null,
          city: record.new_name || cleanLocation,
          department: record.dep_nom || null,
          region: record.reg_nom || null,
          nature: record.equip_nature || null,
          surface: record.equip_sol || null,
          freeAccess: readBoolean(record.equip_acc_libre),
          accessible: readBoolean(record.inst_acc_handi_bool),
          latitude,
          longitude,
          website: normalizeExternalUrl(record.equip_url),
          updatedAt: record.equip_maj_date || null,
        };
      });

      return {
        query: {
          location: cleanLocation,
          sport: normalizedSport || null,
        },
        total: payload.total_count ?? results.length,
        results,
        source: {
          name: 'Data ES',
          publisher: 'Ministère chargé des Sports',
          url: 'https://equipements.sports.gouv.fr/',
          license: 'Licence Ouverte / Etalab 2.0',
        },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown Data ES error';
      throw new ServiceUnavailableException(
        `Les lieux sportifs sont momentanément indisponibles. ${message}`,
      );
    }
  }
}
