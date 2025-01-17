export interface Warga {
  id: number;
  name: string | null;
  anggotarumah: number | null;
  isactive: boolean | null;
  created_at: string;
}

export interface Rumah {
  id: number;
  blok: string | null;
  nomor: string | null;
  complete: string | null;
  created_at: string;
}

export interface RumahWarga {
  id: number;
  idrumah: number | null;
  idwarga: number | null;
  created_at: string;
  rumah?: Rumah;
  warga?: Warga;
}

export interface IuranKategori {
  id: number;
  name: string | null;
  nominal: number | null;
  berulang: boolean | null;
  created_at: string;
}

export interface Iuran {
  id: number;
  idwarga: number | null;
  idkategori: number | null;
  nominal: number | null;
  periode: string | null;
  tipepembayaran: 'cash' | 'transfer' | null;
  created_at: string;
  warga?: Warga;
  kategori?: IuranKategori;
}

export interface User {
  id: string;
  email: string;
}