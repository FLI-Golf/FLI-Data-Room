// Curated icon list for the section icon picker, grouped by category.
// Each entry is the PascalCase lucide-svelte export name.

export interface IconCategory {
	label: string;
	icons: string[];
}

export const ICON_CATEGORIES: IconCategory[] = [
	{
		label: 'Business & Finance',
		icons: [
			'DollarSign','TrendingUp','TrendingDown','BarChart2','BarChart3','BarChart4',
			'LineChart','PieChart','CandlestickChart','Wallet','CreditCard','Banknote',
			'Coins','Receipt','Calculator','Percent','ArrowUpRight','ArrowDownRight',
			'Building2','Briefcase','HandCoins','BadgeDollarSign','CircleDollarSign',
			'Landmark','Scale','FileSpreadsheet','ClipboardList',
		],
	},
	{
		label: 'Sports & Competition',
		icons: [
			'Trophy','Medal','Award','Star','Crown','Zap','Flame','Target',
			'Disc','Dumbbell','Activity','Timer','Stopwatch','Flag','Swords',
			'Shield','ShieldCheck','Crosshair','Gauge','Bike','Footprints',
		],
	},
	{
		label: 'Media & Content',
		icons: [
			'Tv','Radio','Video','Film','Camera','Mic','Mic2','Headphones',
			'Music','Play','PlayCircle','Youtube','Twitch','Cast','Monitor',
			'Smartphone','Tablet','Laptop','Image','Images','FileVideo','Clapperboard',
		],
	},
	{
		label: 'People & Teams',
		icons: [
			'Users','User','UserCheck','UserPlus','UserCog','Users2','PersonStanding',
			'Contact','Handshake','HeartHandshake','Network','Group','Crown',
			'GraduationCap','Stethoscope','HardHat',
		],
	},
	{
		label: 'Strategy & Growth',
		icons: [
			'Rocket','Globe','Globe2','Map','MapPin','Compass','Navigation',
			'Layers','Blocks','GitBranch','GitMerge','Workflow','Route',
			'Milestone','Signpost','Telescope','Binoculars','Lightbulb','Brain',
			'Sparkles','Wand2','Magnet',
		],
	},
	{
		label: 'Documents & Data',
		icons: [
			'FileText','File','Files','FolderOpen','Folder','BookOpen','Book',
			'Newspaper','ClipboardCheck','ClipboardList','Database','Server',
			'HardDrive','Archive','Package','Inbox','Mail','Send','Link',
			'Paperclip','Search','Filter','SlidersHorizontal',
		],
	},
	{
		label: 'Legal & Compliance',
		icons: [
			'Scale','Shield','ShieldCheck','ShieldAlert','Lock','LockOpen',
			'Key','KeyRound','Fingerprint','Eye','EyeOff','AlertTriangle',
			'AlertCircle','CheckCircle2','XCircle','BadgeCheck','Stamp','Gavel',
		],
	},
	{
		label: 'Location & Events',
		icons: [
			'MapPin','Map','Building','Building2','Hotel','Landmark','Store',
			'Warehouse','Factory','Home','Calendar','CalendarDays','CalendarCheck',
			'Clock','Timer','Hourglass','Ticket','PartyPopper','Megaphone',
		],
	},
	{
		label: 'Technology',
		icons: [
			'Cpu','Code2','Terminal','Wifi','Bluetooth','Satellite','Antenna',
			'Bot','BrainCircuit','CircuitBoard','Microchip','QrCode','Barcode',
			'ScanLine','Webhook','Cloud','CloudUpload','CloudDownload','Share2',
		],
	},
];

// Flat list for search
export const ALL_ICONS: string[] = ICON_CATEGORIES.flatMap(c => c.icons);

// Deduplicated master list
export const ICON_LIST: string[] = [...new Set(ALL_ICONS)];
