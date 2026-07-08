export type BrandKey =
  | "all"
  | "apple"
  | "asus"
  | "hp"
  | "lenovo"
  | "dell"
  | "samsung"
  | "acer"
  | "msi"
  | "other";

export interface Brand {
  key: BrandKey;
  label: string;
  icon: string;
  color: string;
}

export const BRANDS: Brand[] = [
  { key: "all", label: "Semua", icon: "Grid3X3", color: "slate" },
  { key: "apple", label: "Apple", icon: "Laptop", color: "gray" },
  { key: "asus", label: "ASUS", icon: "Laptop", color: "blue" },
  { key: "hp", label: "HP", icon: "Laptop", color: "purple" },
  { key: "lenovo", label: "Lenovo", icon: "Laptop", color: "red" },
  { key: "dell", label: "Dell", icon: "Laptop", color: "green" },
  { key: "samsung", label: "Samsung", icon: "Laptop", color: "cyan" },
  { key: "acer", label: "Acer", icon: "Laptop", color: "red" },
  { key: "msi", label: "MSI", icon: "Laptop", color: "orange" },
  { key: "other", label: "Lainnya", icon: "Laptop", color: "slate" },
];

export interface Post {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  brand: BrandKey;
  likes: number;
  comments: number;
  views: number;
  time: string;
  image?: string;
}

export const MOCK_POSTS: Post[] = [
  {
    id: "post-001",
    author: "Rizky Pratama",
    avatar: "https://i.pravatar.cc/150?img=33",
    title: "Laptop ASUS VivoBook layar berkedip-kedip, solusi apa ya?",
    content: "Halo teman-teman, laptop ASUS VivoBook saya sudah 2 hari layar berkedip-kedip. Sudah coba restart tapi masih sama. Apakah ada yang pernah mengalami masalah serupa?",
    brand: "asus",
    likes: 24,
    comments: 12,
    views: 156,
    time: "2 jam lalu",
  },
  {
    id: "post-002",
    author: "Siti Aminah",
    avatar: "https://i.pravatar.cc/150?img=44",
    title: "Share pengalaman service di FixIn - sangat memuaskan!",
    content: "Baru selesai service laptop di FixIn, teknisinya sangat profesional dan harga terjangkau. Recommended banget untuk kalian yang butuh service laptop!",
    brand: "all",
    likes: 67,
    comments: 23,
    views: 432,
    time: "5 jam lalu",
  },
  {
    id: "post-003",
    author: "Budi Santoso",
    avatar: "https://i.pravatar.cc/150?img=12",
    title: "Tips: Cara merawat baterai laptop agar tahan lama",
    content: "Setelah pakai laptop selama 5 tahun, ini beberapa tips dari saya untuk merawat baterai laptop agar tidak cepat bocor. Semoga bermanfaat!",
    brand: "all",
    likes: 89,
    comments: 34,
    views: 678,
    time: "1 hari lalu",
  },
  {
    id: "post-004",
    author: "Dewi Kartika",
    avatar: "https://i.pravatar.cc/150?img=5",
    title: "Pertanyaan: Berapa biaya service keyboard laptop HP?",
    content: "Keyboard laptop HP saya ada beberapa tombol yang tidak berfungsi. Kira-kira biaya service keyboard laptop HP berapa ya? Terima kasih sebelumnya!",
    brand: "hp",
    likes: 15,
    comments: 8,
    views: 89,
    time: "1 hari lalu",
  },
  {
    id: "post-005",
    author: "Ahmad Fauzi",
    avatar: "https://i.pravatar.cc/150?img=15",
    title: "Rekomendasi: Teknisi terbaik untuk service MacBook di Jakarta",
    content: "Bagi kalian yang butuh service MacBook, saya recommend teknisi dari FixIn yang sudah berpengalaman mengatasi berbagai masalah MacBook. Service cepat dan garansi juga ada!",
    brand: "apple",
    likes: 45,
    comments: 19,
    views: 312,
    time: "2 hari lalu",
  },
  {
    id: "post-006",
    author: "Michael Wijaya",
    avatar: "https://i.pravatar.cc/150?img=8",
    title: "Lenovo ThinkPad T14s overheat saat gaming",
    content: "Baru beli Lenovo ThinkPad T14s sudah 2 minggu, tapi kok saat dipakai gaming sedikit saja suhunya langsung naik drastis? Apakah normal atau ada masalah?",
    brand: "lenovo",
    likes: 32,
    comments: 15,
    views: 234,
    time: "3 jam lalu",
  },
  {
    id: "post-007",
    author: "Sarah Putri",
    avatar: "https://i.pravatar.cc/150?img=25",
    title: "Dell XPS 13 layar mati total - berhasil diperbaiki!",
    content: "Alhamdulillah Dell XPS 13 saya yang layar mati total akhirnya bisa diperbaiki di FixIn. Teknisinya mas Rifki, sangat推荐!",
    brand: "dell",
    likes: 56,
    comments: 21,
    views: 445,
    time: "6 jam lalu",
  },
];

export function getPostsByBrand(brand: BrandKey): Post[] {
  if (brand === "all") return MOCK_POSTS;
  return MOCK_POSTS.filter((post) => post.brand === brand);
}

export function getPostById(id: string): Post | undefined {
  return MOCK_POSTS.find((post) => post.id === id);
}
