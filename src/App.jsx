import { useState, useEffect, useCallback, useRef } from "react";
import {
  LayoutDashboard, Users, Package, CreditCard, BarChart3, Wallet, Settings,
  PlusCircle, Search, Bell, HelpCircle, TrendingUp, UserPlus, MoreVertical,
  ChevronLeft, ChevronRight, Download, Filter, CheckCircle2, Clock, Star,
  Edit2, Trash2, MapPin, ShieldCheck, Zap, Bot, Activity,
  Plane, ChevronDown, Languages, X, Send, Menu, LogOut, User,
  Moon, Sun, FileText, AlertTriangle, Check
} from "lucide-react";

// ═══════════════════════════════════════════
// i18n
// ═══════════════════════════════════════════
const i18n={tr:{
nav_dashboard:"Dashboard",nav_users:"Kullanıcılar",nav_packages:"Paketler",nav_payments:"Ödemeler",
nav_analytics:"BNLP Analizleri",nav_pool:"Havuz Yönetimi",nav_settings:"Ayarlar",
main_menu:"Ana Menü",system_status:"Sistem Durumu",all_systems:"Tüm sistemler aktif",
search_placeholder:"Arama yapın...",super_admin:"Super Admin",
welcome:"Hoş Geldiniz",overview:"Genel Bakış",
overview_desc:"TatilFinans ekosisteminin anlık performans verileri.",
last_24h:"Son 24 Saat",create_report:"Rapor Oluştur",
total_volume:"Toplam Hacim",active_users:"Aktif Kullanıcı",
completed_goals:"Tamamlanan Hedefler",avg_savings:"Ort. Birikim",
growth_chart:"Büyüme Grafiği",growth_chart_desc:"Aylık gelir ve kullanıcı artışı",
revenue:"Gelir",user_label:"Kullanıcı",
quick_actions:"Hızlı İşlemler",add_package:"Paket Ekle",
register_member:"Üye Kaydı",receive_payment:"Ödeme Al",announcement:"Duyuru",
pending_approvals:"Bekleyen Onaylar",new_count:"yeni",
membership_upgrade:"Üyelik Yükseltme",cancel_request:"İptal Talebi",payment_approval:"Ödeme Onayı",
management:"Yönetim",user_management:"Kullanıcı Yönetimi",
user_management_desc:"Tüm kullanıcıları denetleyin.",
new_user:"Yeni Kullanıcı",total_users:"Toplam Kullanıcı",
premium_members:"Premium Üyeler",active_savings_label:"Aktif Birikimler",
total_savings:"Toplam Birikim",increase:"Artış",of_total:"Toplamın",
goals_completed:"Hedef",avg:"Ort.",per_user:"/kullanıcı",
member_list:"Üye Listesi",records:"kayıt",filter:"Filtrele",export_label:"Dışa Aktar",
col_user:"Kullanıcı",col_membership:"Üyelik",col_active_saving:"Aktif Birikim",
col_total:"Toplam",col_status:"Durum",savings_unit:"Birikim",
status_active:"Aktif",status_passive:"Pasif",
campaign:"Kampanya",premium_campaign:"Premium Üyelik Kampanyası",
premium_campaign_desc:"%15 indirimli \"Tatil Paketi\" ile Premium üye sayısını artırın.",
manage_campaign:"Kampanyayı Yönet",users_label:"kullanıcı",
payments_label:"Ödemeler",financial_movements:"Finansal Hareketler",
and_installments:"& Taksitler",
payments_desc:"Tüm ödeme akışlarını ve tahsilat durumlarını yönetin.",
download_report:"Rapor İndir",monthly_collection:"Aylık Tahsilat",
compared_last_month:"Geçen aya göre",
pending:"BEKLEYEN",pending_val:"Adet",pending_sub:"Onay bekleyen EFT",
upcoming:"GELECEK",upcoming_sub:"30 günlük taksit yükü",
cc_ratio:"KK ORANI",cc_sub:"Kredi kartı kullanımı",
recent_transactions:"Son İşlemler",all:"Hepsi",pending_tab:"Bekleyen",failed_tab:"Başarılı",
col_transaction_id:"İşlem ID",col_package:"Paket",col_amount:"Tutar",
col_method:"Yöntem",col_date:"Tarih",
status_success:"Başarılı",status_waiting:"Bekliyor",transaction:"işlem",
packages_label:"Paketler",travel_packages:"Seyahat Paketleri",
packages_desc:"Tatil destinasyonlarını yönetin.",
new_package:"Yeni Paket",price:"Fiyat",sales:"Satış",
installments_12:"12 Taksit",no_interest:"Vade Farksız",edit:"Düzenle",
add_adventure:"Yeni Macera Ekle",add_adventure_desc:"Yeni destinasyon tanımlayın.",
start:"Başla",
tag_popular:"Popüler",tag_high_profit:"Yüksek Kazanç",tag_new_route:"Yeni Rota",
tag_winter:"Kış Sezonu",tag_romantic:"Romantik",
statistics:"İstatistikler",bnlp_analytics:"BNLP Analizleri",
bnlp_desc:"\"Biriktir Sonra Tatil Yap\" — kullanıcı alışkanlıkları.",
monthly:"AYLIK",yearly:"YILLIK",journey_status:"Yolculuk Durumu",
goal_completion:"Hedef Tamamlama Oranları",
flexible_installments:"Esnek Taksitlendirme",flex_desc:"Ortalama tercih edilen planlar.",
avg_installment:"Ort. Taksit",most_preferred:"En Çok",least_preferred:"En Az",
installments:"Taksit",view_matrix:"Tüm Matrisi Gör",
analytics_logs:"Analitik Loglar",
log_critical:"Kritik",log_success:"Başarı",log_info:"Bilgi",
log1_title:"Hedef Artışı",log1_desc:"\"Hakan Y.\" bütçesini %20 artırdı.",
log2_title:"Biriktirme Tamamlandı",log2_desc:"12/12 ödeme bitti.",
log3_title:"Sistem Optimizasyonu",log3_desc:"BNLP raporu oluşturuldu.",
today:"Bugün",yesterday:"Dün",
financial_arch:"Finansal Mimari",pool_management:"Havuz",pool_management2:"Yönetimi",
pool_desc:"Likidite dengesini koruyun.",
current_liquidity:"Mevcut Likidite",tree_growth:"Tatil Ağacı Büyümesi",
last_update:"Son",reserve_fill:"REZERV DOLULUK",
blocked:"Bloke Edilen",upcoming_payments:"Gelecek Ödemeler",free_fund:"Serbest Fon",
pool_return:"Havuz Getiri Oranı",above_market:"puan üzerinde.",
market_avg:"Piyasa ortalamasının",detailed_analysis:"Detaylı Analiz",
system_settings:"Sistem Ayarları",settings_desc:"Platform parametrelerini yapılandırın.",
general_config:"Genel Yapılandırma",security_auth:"Güvenlik & Yetkiler",
notification_settings:"Bildirim Ayarları",api_integrations:"API & Entegrasyonlar",
system_settings_sub:"Sistem ayarları",platform_identity:"Platform Kimliği",
platform_name:"Platform Adı",support_email:"Destek E-postası",
financial_params:"Finansal Parametreler",max_installments:"Maks. Taksit",
max_installments_desc:"En yüksek vade.",
pool_reserve_ratio:"Havuz Rezerv Oranı",pool_reserve_desc:"Min. likidite oranı.",
cancel:"İptal",save:"Kaydet",delete_label:"Sil",confirm_delete:"Silmek istediğinize emin misiniz?",
yes:"Evet",no:"Hayır",close:"Kapat",add:"Ekle",name_label:"Ad Soyad",email_label:"E-posta",
type_label:"Üyelik Tipi",saved:"Kaydedildi!",deleted:"Silindi!",
no_results:"Sonuç bulunamadı",export_success:"Dışa aktarıldı!",
notif_1:"Yeni ödeme onayı bekleniyor",notif_2:"Sistem bakımı yarın 03:00'te",notif_3:"3 yeni üye kaydı",
profile:"Profil",logout:"Çıkış Yap",theme:"Tema",
currency_label:"Para Birimi",language_label:"Dil",locale_settings:"Bölge & Dil",locale_desc:"Para birimi ve arayüz dilini ayarlayın.",
security_content:"İki faktörlü doğrulama, oturum yönetimi ve yetki seviyeleri.",
notif_content:"E-posta, SMS ve push bildirim tercihleri.",
api_content:"Webhook URL'leri, API anahtarları ve üçüncü parti entegrasyonlar.",
chat_placeholder:"Mesajınızı yazın...",chat_welcome:"Size nasıl yardımcı olabilirim?",
months:["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],
pay_types:{premium:"Premium Üye",standard:"Standart Üye",elite:"Elite Üye"},
pay_dates:["24 Haz 2024","23 Haz 2024","22 Haz 2024","22 Haz 2024","21 Haz 2024"],
ai_assistant:"Yapay Zeka Asistanı",
},en:{
nav_dashboard:"Dashboard",nav_users:"Users",nav_packages:"Packages",nav_payments:"Payments",
nav_analytics:"BNLP Analytics",nav_pool:"Pool Management",nav_settings:"Settings",
main_menu:"Main Menu",system_status:"System Status",all_systems:"All systems operational",
search_placeholder:"Search...",super_admin:"Super Admin",
welcome:"Welcome",overview:"Overview",
overview_desc:"Real-time performance data for TatilFinans.",
last_24h:"Last 24 Hours",create_report:"Create Report",
total_volume:"Total Volume",active_users:"Active Users",
completed_goals:"Goals Completed",avg_savings:"Avg. Savings",
growth_chart:"Growth Chart",growth_chart_desc:"Monthly revenue and user growth",
revenue:"Revenue",user_label:"Users",
quick_actions:"Quick Actions",add_package:"Add Package",
register_member:"Register",receive_payment:"Payment",announcement:"Announce",
pending_approvals:"Pending Approvals",new_count:"new",
membership_upgrade:"Membership Upgrade",cancel_request:"Cancel Request",payment_approval:"Payment Approval",
management:"Management",user_management:"User Management",
user_management_desc:"Monitor all users.",
new_user:"New User",total_users:"Total Users",
premium_members:"Premium Members",active_savings_label:"Active Savings",
total_savings:"Total Savings",increase:"Increase",of_total:"of total",
goals_completed:"Goals",avg:"Avg.",per_user:"/user",
member_list:"Member List",records:"records",filter:"Filter",export_label:"Export",
col_user:"User",col_membership:"Membership",col_active_saving:"Active Savings",
col_total:"Total",col_status:"Status",savings_unit:"Savings",
status_active:"Active",status_passive:"Inactive",
campaign:"Campaign",premium_campaign:"Premium Campaign",
premium_campaign_desc:"15% discounted Holiday Package.",
manage_campaign:"Manage Campaign",users_label:"users",
payments_label:"Payments",financial_movements:"Financial Transactions",
and_installments:"& Installments",
payments_desc:"Manage all payment flows.",
download_report:"Download Report",monthly_collection:"Monthly Collection",
compared_last_month:"vs. last month",
pending:"PENDING",pending_val:"Items",pending_sub:"EFT awaiting approval",
upcoming:"UPCOMING",upcoming_sub:"30-day installment load",
cc_ratio:"CC RATIO",cc_sub:"Credit card usage",
recent_transactions:"Recent Transactions",all:"All",pending_tab:"Pending",failed_tab:"Success",
col_transaction_id:"Transaction ID",col_package:"Package",col_amount:"Amount",
col_method:"Method",col_date:"Date",
status_success:"Success",status_waiting:"Pending",transaction:"transactions",
packages_label:"Packages",travel_packages:"Travel Packages",
packages_desc:"Manage destinations and pricing.",
new_package:"New Package",price:"Price",sales:"Sales",
installments_12:"12 Installments",no_interest:"0% Interest",edit:"Edit",
add_adventure:"Add Adventure",add_adventure_desc:"Define a new destination.",
start:"Start",
tag_popular:"Popular",tag_high_profit:"High Profit",tag_new_route:"New Route",
tag_winter:"Winter",tag_romantic:"Romantic",
statistics:"Statistics",bnlp_analytics:"BNLP Analytics",
bnlp_desc:"\"Save Now, Travel Later\" — user habits.",
monthly:"MONTHLY",yearly:"YEARLY",journey_status:"Journey Status",
goal_completion:"Goal Completion Rates",
flexible_installments:"Flexible Installments",flex_desc:"Average preferred plans.",
avg_installment:"Avg. Installment",most_preferred:"Most",least_preferred:"Least",
installments:"Installments",view_matrix:"View Matrix",
analytics_logs:"Analytics Logs",
log_critical:"Critical",log_success:"Success",log_info:"Info",
log1_title:"Goal Increase",log1_desc:"\"Hakan Y.\" increased budget 20%.",
log2_title:"Savings Completed",log2_desc:"12/12 payments done.",
log3_title:"System Optimization",log3_desc:"BNLP report generated.",
today:"Today",yesterday:"Yesterday",
financial_arch:"Financial Architecture",pool_management:"Pool",pool_management2:"Management",
pool_desc:"Maintain liquidity balance.",
current_liquidity:"Current Liquidity",tree_growth:"Holiday Tree Growth",
last_update:"Last",reserve_fill:"RESERVE FILL",
blocked:"Blocked",upcoming_payments:"Upcoming Payments",free_fund:"Free Fund",
pool_return:"Pool Return Rate",above_market:"points above.",
market_avg:"Market average by",detailed_analysis:"Detailed Analysis",
system_settings:"System Settings",settings_desc:"Configure platform parameters.",
general_config:"General Config",security_auth:"Security & Auth",
notification_settings:"Notifications",api_integrations:"API & Integrations",
system_settings_sub:"System settings",platform_identity:"Platform Identity",
platform_name:"Platform Name",support_email:"Support Email",
financial_params:"Financial Parameters",max_installments:"Max Installments",
max_installments_desc:"Highest option.",
pool_reserve_ratio:"Pool Reserve Ratio",pool_reserve_desc:"Min liquidity ratio.",
cancel:"Cancel",save:"Save",delete_label:"Delete",confirm_delete:"Are you sure you want to delete?",
yes:"Yes",no:"No",close:"Close",add:"Add",name_label:"Full Name",email_label:"Email",
type_label:"Membership Type",saved:"Saved!",deleted:"Deleted!",
no_results:"No results found",export_success:"Exported!",
notif_1:"New payment approval pending",notif_2:"System maintenance at 03:00",notif_3:"3 new registrations",
profile:"Profile",logout:"Log Out",theme:"Theme",
currency_label:"Currency",language_label:"Language",locale_settings:"Region & Language",locale_desc:"Set your currency and interface language.",
security_content:"Two-factor auth, session management and permission levels.",
notif_content:"Email, SMS and push notification preferences.",
api_content:"Webhook URLs, API keys and third-party integrations.",
chat_placeholder:"Type your message...",chat_welcome:"How can I help you?",
months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
pay_types:{premium:"Premium",standard:"Standard",elite:"Elite"},
pay_dates:["Jun 24, 2024","Jun 23, 2024","Jun 22, 2024","Jun 22, 2024","Jun 21, 2024"],
ai_assistant:"AI Assistant",
}};

// ═══════════════════════════════════════════
// HELPERS & DATA
// ═══════════════════════════════════════════
const R=33.5;
const fmt=(v,c)=>c==="USD"?"$"+(v/R).toLocaleString("en-US",{maximumFractionDigits:0}):"₺"+v.toLocaleString("tr-TR");
const INIT_USERS=[
  {id:1,name:"Ahmet Selim",email:"ahmet@tatilfinans.com",type:"Premium",savings:3,total:45250,status:"active",progress:65},
  {id:2,name:"Elif Yılmaz",email:"elif.y@example.com",type:"Standart",savings:1,total:8100,status:"active",progress:20},
  {id:3,name:"Mert Çelik",email:"mertcelik@company.tr",type:"Premium",savings:0,total:0,status:"passive",progress:0},
  {id:4,name:"Zeynep Kaya",email:"z.kaya@tatil.com",type:"Standart",savings:5,total:112400,status:"active",progress:90},
  {id:5,name:"Burak Demir",email:"burak.d@tatil.com",type:"Elite",savings:7,total:234000,status:"active",progress:95},
  {id:6,name:"Seda Arslan",email:"seda.a@example.com",type:"Premium",savings:2,total:18750,status:"active",progress:40},
];
const INIT_PAYMENTS=[
  {id:"#TF-98231",user:"Arda Kurt",typeKey:"premium",package:"Maldivler Rüyası",amount:12450,method:"KK",dateIdx:0,status:"success"},
  {id:"#TF-98232",user:"Selin Yılmaz",typeKey:"standard",package:"Ege Turu 2024",amount:8700,method:"EFT",dateIdx:1,status:"waiting"},
  {id:"#TF-98233",user:"Murat Boz",typeKey:"elite",package:"İskandinav Rüyası",amount:21000,method:"KK",dateIdx:2,status:"success"},
  {id:"#TF-98234",user:"Elif Yener",typeKey:"premium",package:"Bali Tropik Tur",amount:15200,method:"EFT",dateIdx:3,status:"waiting"},
  {id:"#TF-98235",user:"Can Özkan",typeKey:"elite",package:"Tokyo Modern",amount:54200,method:"KK",dateIdx:4,status:"success"},
];
const INIT_PACKAGES=[
  {id:1,name:"Maldivler Rüyası",price:42500,sales:"1,240",rating:4.9,tagKey:"tag_popular",img:"🏝️"},
  {id:2,name:"Bali Egzotik",price:28900,sales:"856",rating:4.7,tagKey:"tag_high_profit",img:"🌴"},
  {id:3,name:"Tokyo Modern",price:54200,sales:"312",rating:5.0,tagKey:"tag_new_route",img:"🗼"},
  {id:4,name:"Alp Ekspresi",price:36750,sales:"542",rating:4.8,tagKey:"tag_winter",img:"🏔️"},
  {id:5,name:"Santorini Balayı",price:38900,sales:"678",rating:4.9,tagKey:"tag_romantic",img:"🌅"},
];
const CHART_M=[40,55,45,70,60,85,75,90,80,95,85,100];
const CHART_Y=[30,42,38,55,50,65,60,72,68,78,72,85];

// ═══════════════════════════════════════════
// REUSABLE COMPONENTS
// ═══════════════════════════════════════════
const fadeUp=(d=0)=>({opacity:1,transform:"translateY(0)",transition:`all .5s cubic-bezier(.22,1,.36,1) ${d}s`});
const ini={opacity:0,transform:"translateY(16px)"};
function A({children,delay=0,className="",style={}}){
  const[v,setV]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setV(true),30);return()=>clearTimeout(t)},[]);
  return <div className={className} style={{...ini,...(v?fadeUp(delay):{}), ...style}}>{children}</div>;
}
function Bar({height,delay=0,color="#06b6d4"}){
  const[h,setH]=useState(0);
  useEffect(()=>{const t=setTimeout(()=>setH(height),100+delay*60);return()=>clearTimeout(t)},[height]);
  return(<div className="flex-1 relative group cursor-pointer" style={{height:"100%"}}>
    <div className="absolute bottom-0 w-full rounded-t-lg transition-all duration-700 ease-out hover:brightness-110"
      style={{height:`${h}%`,background:`linear-gradient(to top,${color},${color}dd)`}}>
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">%{height}</div>
    </div></div>);
}
function Stat({label,value,trend,icon:Icon,color,bg,delay=0}){
  return(<A delay={delay} className="bg-white p-5 rounded-2xl border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group cursor-default">
    <div className="flex justify-between items-start mb-3">
      <div className={`p-2.5 rounded-xl ${bg} ${color} group-hover:scale-110 transition-transform`}><Icon size={20}/></div>
      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1"><TrendingUp size={10}/>{trend}</span>
    </div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[.15em] mb-0.5">{label}</p>
    <p className="text-xl font-black text-slate-900 tracking-tight truncate">{value}</p>
  </A>);
}

// Toast notification
function Toast({message,onClose}){
  useEffect(()=>{const t=setTimeout(onClose,2500);return()=>clearTimeout(t)},[]);
  return(<div className="fixed top-20 right-6 z-[999] bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-sm font-bold animate-bounce">
    <Check size={16}/>{message}</div>);
}

// Modal
function Modal({open,onClose,title,children,wide}){
  if(!open)return null;
  return(<div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"/>
    <div className={`relative bg-white rounded-2xl shadow-2xl p-6 w-full ${wide?"max-w-2xl":"max-w-md"} max-h-[80vh] overflow-y-auto`} onClick={e=>e.stopPropagation()}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900" style={{fontFamily:"'Outfit',sans-serif"}}>{title}</h3>
        <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-all"><X size={18} className="text-slate-400"/></button>
      </div>
      {children}
    </div></div>);
}

// Context Menu
function CtxMenu({items,onClose}){
  const ref=useRef();
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))onClose()};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h)},[]);
  return(<div ref={ref} className="absolute right-0 top-8 z-50 bg-white rounded-xl shadow-xl border border-slate-100 py-1 min-w-[160px]">
    {items.map((item,i)=>(
      <button key={i} onClick={()=>{item.action();onClose()}} className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-slate-50 transition-all ${item.danger?"text-red-500":"text-slate-700"}`}>
        {item.icon&&<item.icon size={14}/>}{item.label}
      </button>
    ))}
  </div>);
}

// Skeleton loader
function Skeleton({rows=3}){
  return(<div className="space-y-3 animate-pulse">{Array.from({length:rows}).map((_,i)=>(
    <div key={i} className="flex gap-3">
      <div className="w-10 h-10 rounded-full bg-slate-200"/>
      <div className="flex-1 space-y-2 py-1"><div className="h-3 bg-slate-200 rounded w-3/4"/><div className="h-3 bg-slate-200 rounded w-1/2"/></div>
    </div>))}</div>);
}

// CSV Export
function exportCSV(data,filename){
  if(!data.length)return;
  const keys=Object.keys(data[0]);
  const csv=[keys.join(","),...data.map(r=>keys.map(k=>JSON.stringify(r[k]??"")).join(","))].join("\n");
  const blob=new Blob([csv],{type:"text/csv"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=filename;a.click();
}

// ═══════════════════════════════════════════
// SIDEBAR (mobile responsive)
// ═══════════════════════════════════════════
function Sidebar({active,setActive,collapsed,setCollapsed,mobileOpen,setMobileOpen,t}){
  const items=[
    {id:"dashboard",label:t.nav_dashboard,icon:LayoutDashboard},
    {id:"users",label:t.nav_users,icon:Users},
    {id:"packages",label:t.nav_packages,icon:Package},
    {id:"payments",label:t.nav_payments,icon:CreditCard},
    {id:"analytics",label:t.nav_analytics,icon:BarChart3},
    {id:"pool",label:t.nav_pool,icon:Wallet},
    {id:"settings",label:t.nav_settings,icon:Settings},
  ];
  const nav=(id)=>{setActive(id);setMobileOpen(false)};
  const sidebarContent=(
    <>
      <div className="px-4 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg shrink-0" style={{background:"linear-gradient(135deg,#06b6d4,#0891b2)",boxShadow:"0 4px 16px rgba(6,182,212,.3)"}}>TF</div>
          {!collapsed&&<div className="min-w-0"><h2 className="text-white font-black text-lg tracking-tight leading-none" style={{fontFamily:"'Outfit',sans-serif"}}>TatilFinans</h2><p className="text-cyan-400/60 text-[9px] uppercase tracking-[.25em] font-bold mt-0.5">Management Suite</p></div>}
        </div>
        <button onClick={()=>{if(window.innerWidth<768)setMobileOpen(false);else setCollapsed(!collapsed)}} className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">
          {collapsed?<ChevronRight size={16}/>:window.innerWidth<768?<X size={16}/>:<ChevronLeft size={16}/>}
        </button>
      </div>
      {!collapsed&&<p className="px-5 text-[9px] text-slate-500 font-bold uppercase tracking-[.2em] mb-2">{t.main_menu}</p>}
      <nav className="flex-1 space-y-0.5 px-2 overflow-y-auto">
        {items.map(i=>(
          <button key={i.id} onClick={()=>nav(i.id)}
            className={`w-full flex items-center gap-3 rounded-xl transition-all duration-200 group relative ${collapsed?"px-0 py-3 justify-center":"px-4 py-2.5"} ${active===i.id?"bg-cyan-500/10 text-cyan-400":"text-slate-400 hover:text-white hover:bg-white/5"}`}>
            {active===i.id&&<div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-cyan-400"/>}
            <i.icon size={19} strokeWidth={active===i.id?2.2:1.8}/>
            {!collapsed&&<span className="font-semibold text-[13px]">{i.label}</span>}
          </button>
        ))}
      </nav>
      {!collapsed&&<div className="px-3 mt-auto">
        <div className="rounded-2xl p-4" style={{background:"linear-gradient(135deg,rgba(6,182,212,.08),rgba(6,182,212,.02))",border:"1px solid rgba(6,182,212,.1)"}}>
          <div className="flex items-center gap-2 mb-2"><Activity size={14} className="text-cyan-400"/><span className="text-[10px] text-cyan-300/80 font-bold uppercase tracking-wider">{t.system_status}</span></div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/><span className="text-[11px] text-slate-300 font-medium">{t.all_systems}</span></div>
        </div>
      </div>}
    </>
  );
  return(<>
    {/* Desktop */}
    <aside className="hidden md:flex fixed left-0 top-0 h-screen flex-col py-5 z-50 transition-all duration-300"
      style={{width:collapsed?72:256,background:"linear-gradient(180deg,#0c1222,#111b32)",borderRight:"1px solid rgba(255,255,255,.04)"}}>
      {sidebarContent}
    </aside>
    {/* Mobile overlay */}
    {mobileOpen&&<div className="md:hidden fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/50" onClick={()=>setMobileOpen(false)}/>
      <aside className="relative h-screen w-64 flex flex-col py-5" style={{background:"linear-gradient(180deg,#0c1222,#111b32)"}}>
        {sidebarContent}
      </aside>
    </div>}
  </>);
}

// ═══════════════════════════════════════════
// TOPBAR (search, notifications, profile dropdown)
// ═══════════════════════════════════════════
function TopBar({collapsed,t,searchQuery,setSearchQuery,setMobileOpen}){
  const[notifOpen,setNotifOpen]=useState(false);
  const[profileOpen,setProfileOpen]=useState(false);
  const notifRef=useRef();
  const profRef=useRef();
  useEffect(()=>{const h=e=>{if(notifRef.current&&!notifRef.current.contains(e.target))setNotifOpen(false);if(profRef.current&&!profRef.current.contains(e.target))setProfileOpen(false)};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h)},[]);
  const notifs=[{text:t.notif_1,time:"5m",read:false},{text:t.notif_2,time:"1h",read:false},{text:t.notif_3,time:"3h",read:true}];
  return(
    <header className="fixed top-0 right-0 h-14 z-40 px-4 md:px-6 flex items-center justify-between transition-all duration-300"
      style={{left:window.innerWidth<768?0:collapsed?72:256,background:"rgba(255,255,255,.9)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(0,0,0,.06)"}}>
      <div className="flex items-center gap-2">
        <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl" onClick={()=>setMobileOpen(true)}><Menu size={20}/></button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15}/>
          <input type="text" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder={t.search_placeholder}
            className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-sm w-44 lg:w-52 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-300 transition-all"/>
          {searchQuery&&<button onClick={()=>setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={14}/></button>}
        </div>
      </div>
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button onClick={()=>{setNotifOpen(!notifOpen);setProfileOpen(false)}} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all relative">
            <Bell size={17}/><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"/>
          </button>
          {notifOpen&&<div className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800">{t.notification_settings}</span>
              <span className="text-[10px] bg-red-50 text-red-500 font-bold px-2 py-0.5 rounded-full">2 {t.new_count}</span>
            </div>
            {notifs.map((n,i)=>(
              <div key={i} className={`px-4 py-3 flex gap-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 ${n.read?"opacity-60":""}`}>
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.read?"bg-slate-300":"bg-cyan-500"}`}/>
                <div><p className="text-xs text-slate-700 leading-relaxed">{n.text}</p><p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p></div>
              </div>
            ))}
          </div>}
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all hidden sm:block"><HelpCircle size={17}/></button>
        <div className="h-5 w-px bg-slate-200 mx-0.5 hidden sm:block"/>
        {/* Profile */}
        <div ref={profRef} className="relative">
          <button onClick={()=>{setProfileOpen(!profileOpen);setNotifOpen(false)}} className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-50 transition-all">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white font-bold text-[10px] shadow-md">A</div>
            <span className="text-xs font-bold text-slate-800 hidden lg:block">Admin</span>
            <ChevronDown size={13} className="text-slate-400"/>
          </button>
          {profileOpen&&<div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-1">
            <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 flex items-center gap-2 hover:bg-slate-50"><User size={14}/>{t.profile}</button>
            <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 flex items-center gap-2 hover:bg-slate-50"><Settings size={14}/>{t.system_settings}</button>
            <div className="border-t border-slate-100 my-1"/>
            <button className="w-full px-4 py-2.5 text-left text-sm text-red-500 flex items-center gap-2 hover:bg-red-50"><LogOut size={14}/>{t.logout}</button>
          </div>}
        </div>
      </div>
    </header>
  );
}

// ═══════════════════════════════════════════
// SCREENS
// ═══════════════════════════════════════════
function DashboardScreen({currency,t,setScreen,toast}){
  return(
<div className="space-y-8">
  <A className="flex flex-col md:flex-row md:items-end justify-between gap-4">
    <div><p className="text-cyan-600 font-bold text-xs tracking-widest uppercase mb-1">{t.welcome}</p>
    <h1 className="text-3xl font-black tracking-tight text-slate-900" style={{fontFamily:"'Outfit',sans-serif"}}>{t.overview}</h1>
    <p className="text-slate-500 text-sm mt-1">{t.overview_desc}</p></div>
    <div className="flex items-center gap-2">
      <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-slate-500"><Clock size={14}/>{t.last_24h}</div>
      <button onClick={()=>toast(t.export_success)} className="bg-cyan-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-cyan-600/25 hover:bg-cyan-700 transition-all active:scale-95">{t.create_report}</button>
    </div>
  </A>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <Stat label={t.total_volume} value={fmt(4200000,currency)} trend="+18%" icon={Wallet} color="text-cyan-600" bg="bg-cyan-50" delay={.05}/>
    <Stat label={t.active_users} value="1,284" trend="+5%" icon={Users} color="text-indigo-600" bg="bg-indigo-50" delay={.1}/>
    <Stat label={t.completed_goals} value="342" trend="+12%" icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" delay={.15}/>
    <Stat label={t.avg_savings} value={fmt(12450,currency)} trend="+2%" icon={TrendingUp} color="text-amber-600" bg="bg-amber-50" delay={.2}/>
  </div>
  <div className="grid grid-cols-12 gap-5">
    <A delay={.15} className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div><h3 className="text-lg font-bold text-slate-900" style={{fontFamily:"'Outfit',sans-serif"}}>{t.growth_chart}</h3><p className="text-xs text-slate-400 mt-0.5">{t.growth_chart_desc}</p></div>
        <div className="flex gap-4"><span className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-600"><div className="w-2 h-2 rounded-full bg-cyan-500"/>{t.revenue}</span><span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400"><div className="w-2 h-2 rounded-full bg-slate-300"/>{t.user_label}</span></div>
      </div>
      <div className="flex items-end gap-1.5" style={{height:220}}>{CHART_M.map((h,i)=><Bar key={i} height={h} delay={i}/>)}</div>
      <div className="flex justify-between mt-3 px-1">{t.months.map((m,i)=><span key={i} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex-1 text-center">{m}</span>)}</div>
    </A>
    <div className="col-span-12 lg:col-span-4 space-y-5">
      <A delay={.2} className="rounded-2xl p-6 text-white relative overflow-hidden" style={{background:"linear-gradient(135deg,#0f172a,#1e293b)"}}>
        <h3 className="text-base font-bold mb-4" style={{fontFamily:"'Outfit',sans-serif"}}>{t.quick_actions}</h3>
        <div className="grid grid-cols-2 gap-2">
          {[{icon:Package,label:t.add_package,color:"text-cyan-400",go:"packages"},{icon:UserPlus,label:t.register_member,color:"text-amber-400",go:"users"},{icon:CreditCard,label:t.receive_payment,color:"text-emerald-400",go:"payments"},{icon:Bell,label:t.announcement,color:"text-indigo-400",go:"dashboard"}].map((a,i)=>(
            <button key={i} onClick={()=>setScreen(a.go)} className="bg-white/[.06] hover:bg-white/[.12] p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all active:scale-95 border border-white/[.04]">
              <a.icon size={18} className={a.color}/><span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">{a.label}</span>
            </button>))}
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"/>
      </A>
      <A delay={.25} className="bg-white rounded-2xl p-5 border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900 text-sm" style={{fontFamily:"'Outfit',sans-serif"}}>{t.pending_approvals}</h3>
          <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full">3 {t.new_count}</span>
        </div>
        <div className="space-y-3">
          {[{name:"Caner Öz",action:t.membership_upgrade,time:"5dk"},{name:"Selin Ak",action:t.cancel_request,time:"12dk"},{name:"Bora Y.",action:t.payment_approval,time:"24dk"}].map((x,i)=>(
            <div key={i} className="flex items-center justify-between group cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-all">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-[11px] font-bold text-slate-600 border border-slate-100">{x.name[0]}</div>
                <div><p className="text-xs font-bold text-slate-800">{x.name}</p><p className="text-[10px] text-slate-400">{x.action}</p></div>
              </div><span className="text-[10px] font-bold text-slate-400 group-hover:text-cyan-600 transition-colors">{x.time}</span>
            </div>))}
        </div>
      </A>
    </div>
  </div>
</div>);}

function UsersScreen({currency,t,users,setUsers,searchQuery,toast}){
  const[modal,setModal]=useState(null);
  const[delModal,setDelModal]=useState(null);
  const[ctxId,setCtxId]=useState(null);
  const[page,setPage]=useState(1);
  const perPage=4;
  const filtered=users.filter(u=>!searchQuery||u.name.toLowerCase().includes(searchQuery.toLowerCase())||u.email.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalPages=Math.max(1,Math.ceil(filtered.length/perPage));
  const paged=filtered.slice((page-1)*perPage,page*perPage);
  const[form,setForm]=useState({name:"",email:"",type:"Standart"});

  const handleSave=()=>{
    if(!form.name||!form.email)return;
    if(modal==="edit"&&form.id){
      setUsers(prev=>prev.map(u=>u.id===form.id?{...u,name:form.name,email:form.email,type:form.type}:u));
    }else{
      setUsers(prev=>[...prev,{id:Date.now(),name:form.name,email:form.email,type:form.type,savings:0,total:0,status:"active",progress:0}]);
    }
    setModal(null);toast(t.saved);
  };
  const handleDelete=(id)=>{setUsers(prev=>prev.filter(u=>u.id!==id));setDelModal(null);toast(t.deleted)};
  const doExport=()=>{exportCSV(users.map(u=>({name:u.name,email:u.email,type:u.type,savings:u.savings,total:u.total,status:u.status})),"users.csv");toast(t.export_success)};

  return(
<div className="space-y-6">
  <A className="flex flex-col md:flex-row md:items-end justify-between gap-4">
    <div><p className="text-cyan-600 font-bold text-xs tracking-widest uppercase mb-1">{t.management}</p>
    <h1 className="text-3xl font-black tracking-tight text-slate-900" style={{fontFamily:"'Outfit',sans-serif"}}>{t.user_management}</h1>
    <p className="text-slate-500 text-sm mt-1">{t.user_management_desc}</p></div>
    <button onClick={()=>{setForm({name:"",email:"",type:"Standart"});setModal("add")}} className="flex items-center gap-2 bg-cyan-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-cyan-600/25 hover:bg-cyan-700 transition-all active:scale-95"><UserPlus size={18}/>{t.new_user}</button>
  </A>
  <A delay={.05} className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {[{label:t.total_users,value:String(users.length),trend:`%12 ${t.increase}`,color:"text-cyan-600"},
      {label:t.premium_members,value:String(users.filter(u=>u.type==="Premium").length),trend:`${t.of_total} %${Math.round(users.filter(u=>u.type==="Premium").length/users.length*100)}`,color:"text-amber-600"},
      {label:t.active_savings_label,value:String(users.filter(u=>u.savings>0).length),trend:`${users.reduce((a,u)=>a+u.savings,0)} ${t.goals_completed}`,color:"text-indigo-600"},
      {label:t.total_savings,value:fmt(users.reduce((a,u)=>a+u.total,0),currency),trend:`${t.avg} ${fmt(Math.round(users.reduce((a,u)=>a+u.total,0)/users.length),currency)}`,color:"text-cyan-600"}
    ].map((s,i)=>(
      <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{s.label}</p><p className="text-xl font-black text-slate-900 truncate">{s.value}</p><div className={`mt-1.5 flex items-center text-[11px] font-bold ${s.color}`}>{s.trend.includes("%")&&<TrendingUp size={11} className="mr-1"/>}{s.trend}</div></div>
    ))}
  </A>
  <A delay={.1} className="bg-white rounded-2xl overflow-hidden border border-slate-100">
    <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50">
      <div className="flex items-center gap-3"><h3 className="font-bold text-sm text-slate-800">{t.member_list}</h3><span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full">{filtered.length} {t.records}</span></div>
      <div className="flex gap-2"><button onClick={doExport} className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 hover:bg-slate-100"><Download size={13}/>{t.export_label}</button></div>
    </div>
    {paged.length===0?<div className="p-8 text-center text-slate-400 text-sm">{t.no_results}</div>:
    <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="bg-slate-50/80">
      {[t.col_user,t.col_membership,t.col_active_saving,t.col_total,t.col_status,""].map((h,i)=><th key={i} className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h}</th>)}
    </tr></thead><tbody className="divide-y divide-slate-50">
      {paged.map(u=>(
        <tr key={u.id} className="hover:bg-cyan-50/30 transition-colors">
          <td className="px-6 py-3.5"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center text-cyan-700 font-bold text-xs border border-cyan-100">{u.name.split(" ").map(n=>n[0]).join("")}</div><div><p className="font-bold text-slate-800 text-sm">{u.name}</p><p className="text-[11px] text-slate-400">{u.email}</p></div></div></td>
          <td className="px-6 py-3.5"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${u.type==="Premium"?"bg-amber-50 text-amber-700 border border-amber-100":u.type==="Elite"?"bg-purple-50 text-purple-700 border border-purple-100":"bg-slate-50 text-slate-600 border border-slate-100"}`}>{u.type}</span></td>
          <td className="px-6 py-3.5 font-semibold text-slate-700 text-sm">{u.savings} {t.savings_unit}</td>
          <td className="px-6 py-3.5"><span className="font-bold text-slate-800 text-sm">{fmt(u.total,currency)}</span><div className="w-20 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden"><div className="bg-cyan-500 h-full rounded-full" style={{width:`${u.progress}%`}}/></div></td>
          <td className="px-6 py-3.5"><div className="flex items-center gap-1.5"><span className={`w-1.5 h-1.5 rounded-full ${u.status==="active"?"bg-emerald-500":"bg-red-400"}`}/><span className={`text-xs font-semibold ${u.status==="active"?"text-emerald-600":"text-red-500"}`}>{u.status==="active"?t.status_active:t.status_passive}</span></div></td>
          <td className="px-6 py-3.5 text-right relative">
            <button onClick={()=>setCtxId(ctxId===u.id?null:u.id)} className="p-1.5 text-slate-300 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all"><MoreVertical size={16}/></button>
            {ctxId===u.id&&<CtxMenu onClose={()=>setCtxId(null)} items={[
              {label:t.edit,icon:Edit2,action:()=>{setForm({id:u.id,name:u.name,email:u.email,type:u.type});setModal("edit")}},
              {label:u.status==="active"?t.status_passive:t.status_active,icon:u.status==="active"?AlertTriangle:CheckCircle2,action:()=>{setUsers(prev=>prev.map(x=>x.id===u.id?{...x,status:x.status==="active"?"passive":"active"}:x));toast(t.saved)}},
              {label:t.delete_label,icon:Trash2,danger:true,action:()=>setDelModal(u.id)}
            ]}/>}
          </td>
        </tr>))}
    </tbody></table></div>}
    <div className="bg-slate-50/60 px-6 py-3.5 flex items-center justify-between">
      <p className="text-[11px] text-slate-400">{(page-1)*perPage+1}–{Math.min(page*perPage,filtered.length)} / {filtered.length}</p>
      <div className="flex items-center gap-1">
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="p-1.5 rounded-lg border border-slate-200 text-slate-400 disabled:opacity-30"><ChevronLeft size={14}/></button>
        {Array.from({length:totalPages}).map((_,i)=><button key={i} onClick={()=>setPage(i+1)} className={`w-7 h-7 rounded-lg font-bold text-xs ${page===i+1?"bg-cyan-600 text-white":"text-slate-500 hover:bg-slate-100"}`}>{i+1}</button>)}
        <button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)} className="p-1.5 rounded-lg border border-slate-200 text-slate-400 disabled:opacity-30"><ChevronRight size={14}/></button>
      </div>
    </div>
  </A>
  <A delay={.15} className="relative rounded-2xl overflow-hidden" style={{background:"linear-gradient(135deg,#0f172a,#1e3a5f)"}}>
    <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 flex items-center justify-end pr-12"><Plane size={180} className="text-cyan-400 rotate-[-15deg]"/></div>
    <div className="relative z-10 px-8 py-8 max-w-lg"><span className="text-cyan-400 text-[10px] font-bold uppercase tracking-[.2em]">{t.campaign}</span>
    <h3 className="text-white text-xl font-black mt-2 mb-2" style={{fontFamily:"'Outfit',sans-serif"}}>{t.premium_campaign}</h3>
    <p className="text-slate-400 text-sm mb-5">{t.premium_campaign_desc}</p>
    <button onClick={()=>toast(t.saved)} className="bg-cyan-400 text-slate-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-cyan-300 active:scale-95">{t.manage_campaign}</button></div>
  </A>
  {/* Add/Edit User Modal */}
  <Modal open={!!modal} onClose={()=>setModal(null)} title={modal==="edit"?t.edit:t.new_user}>
    <div className="space-y-4">
      <div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{t.name_label}</label><input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20"/></div>
      <div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{t.email_label}</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20"/></div>
      <div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{t.type_label}</label><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-4 text-sm"><option>Standart</option><option>Premium</option><option>Elite</option></select></div>
      <div className="flex justify-end gap-2 pt-2"><button onClick={()=>setModal(null)} className="px-5 py-2 rounded-xl font-bold text-slate-500 hover:bg-slate-50 text-sm">{t.cancel}</button><button onClick={handleSave} className="px-5 py-2 bg-cyan-600 text-white rounded-xl font-bold text-sm hover:bg-cyan-700 active:scale-95">{modal==="edit"?t.save:t.add}</button></div>
    </div>
  </Modal>
  {/* Delete Confirm */}
  <Modal open={!!delModal} onClose={()=>setDelModal(null)} title={t.delete_label}>
    <p className="text-sm text-slate-600 mb-4">{t.confirm_delete}</p>
    <div className="flex justify-end gap-2"><button onClick={()=>setDelModal(null)} className="px-5 py-2 rounded-xl font-bold text-slate-500 hover:bg-slate-50 text-sm">{t.no}</button><button onClick={()=>handleDelete(delModal)} className="px-5 py-2 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 active:scale-95">{t.yes}</button></div>
  </Modal>
</div>);}

function PaymentsScreen({currency,t,payments,searchQuery,toast}){
  const[tab,setTab]=useState(0);
  const[page,setPage]=useState(1);
  const perPage=4;
  const tabFilter=tab===0?payments:tab===1?payments.filter(p=>p.status==="waiting"):payments.filter(p=>p.status==="success");
  const filtered=tabFilter.filter(p=>!searchQuery||p.user.toLowerCase().includes(searchQuery.toLowerCase())||p.package.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalPages=Math.max(1,Math.ceil(filtered.length/perPage));
  const paged=filtered.slice((page-1)*perPage,page*perPage);
  const doExport=()=>{exportCSV(payments.map(p=>({id:p.id,user:p.user,package:p.package,amount:p.amount,method:p.method,status:p.status})),"payments.csv");toast(t.export_success)};
  const tabs=[t.all,t.pending_tab,t.failed_tab];
  return(
<div className="space-y-6">
  <A className="flex flex-col md:flex-row md:items-end justify-between gap-4">
    <div><nav className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest"><span>{t.management}</span><ChevronRight size={10}/><span className="text-cyan-600">{t.payments_label}</span></nav>
    <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900" style={{fontFamily:"'Outfit',sans-serif"}}>{t.financial_movements} <span className="text-cyan-600">{t.and_installments}</span></h1>
    <p className="text-slate-500 text-sm mt-1">{t.payments_desc}</p></div>
    <button onClick={doExport} className="bg-cyan-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-600/25 hover:bg-cyan-700"><Download size={16}/>{t.download_report}</button>
  </A>
  <div className="grid grid-cols-12 gap-4">
    <A delay={.05} className="col-span-12 lg:col-span-4 text-white p-6 rounded-2xl relative overflow-hidden" style={{background:"linear-gradient(135deg,#0891b2,#06b6d4)"}}>
      <div className="relative z-10"><p className="text-cyan-100 text-xs font-medium mb-0.5">{t.monthly_collection}</p><h3 className="text-2xl font-black tracking-tight mb-3 truncate">{fmt(payments.reduce((a,p)=>a+p.amount,0),currency)}</h3>
      <div className="flex items-center gap-1.5 bg-white/15 w-fit px-2.5 py-1 rounded-full text-[11px] font-bold"><TrendingUp size={12}/>{t.compared_last_month} +12.4%</div></div>
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"/>
    </A>
    <A delay={.1} className="col-span-12 lg:col-span-8 grid grid-cols-3 gap-4">
      {[{label:t.pending,value:`${payments.filter(p=>p.status==="waiting").length} ${t.pending_val}`,sub:t.pending_sub,icon:Clock,color:"bg-amber-50 text-amber-600"},
        {label:t.upcoming,value:fmt(450000,currency),sub:t.upcoming_sub,icon:BarChart3,color:"bg-indigo-50 text-indigo-600"},
        {label:t.cc_ratio,value:`%${Math.round(payments.filter(p=>p.method==="KK").length/payments.length*100)}`,sub:t.cc_sub,icon:CreditCard,color:"bg-cyan-50 text-cyan-600"}
      ].map((x,i)=>(
        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-between">
          <div className={`p-2.5 rounded-xl ${x.color} w-fit mb-3`}><x.icon size={18}/></div>
          <div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{x.label}</p><p className="text-lg font-black text-slate-900 truncate">{x.value}</p><p className="text-[11px] text-slate-400 mt-0.5">{x.sub}</p></div>
        </div>))}
    </A>
  </div>
  <A delay={.15} className="bg-white rounded-2xl overflow-hidden border border-slate-100">
    <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50">
      <h3 className="font-bold text-sm text-slate-800">{t.recent_transactions}</h3>
      <div className="flex bg-slate-100 rounded-lg p-0.5">{tabs.map((x,i)=>(<button key={x} onClick={()=>{setTab(i);setPage(1)}} className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${tab===i?"bg-white text-cyan-600 shadow-sm":"text-slate-400"}`}>{x}</button>))}</div>
    </div>
    {paged.length===0?<div className="p-8 text-center text-slate-400 text-sm">{t.no_results}</div>:
    <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="bg-slate-50/50">
      {[t.col_transaction_id,t.col_user,t.col_package,t.col_amount,t.col_method,t.col_date,t.col_status].map((h,i)=><th key={i} className={`px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest ${h===t.col_amount?"text-right":""}`}>{h}</th>)}
    </tr></thead><tbody className="divide-y divide-slate-50">
      {paged.map((p,i)=>(
        <tr key={i} className="hover:bg-cyan-50/20 transition-colors">
          <td className="px-5 py-3.5"><span className="font-mono text-xs text-slate-400">{p.id}</span></td>
          <td className="px-5 py-3.5"><div className="flex items-center gap-2.5"><div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-cyan-700">{p.user.split(" ").map(n=>n[0]).join("")}</div><div><span className="text-sm font-bold text-slate-800 block">{p.user}</span><span className="text-[10px] text-slate-400">{t.pay_types[p.typeKey]}</span></div></div></td>
          <td className="px-5 py-3.5 text-sm text-slate-700">{p.package}</td>
          <td className="px-5 py-3.5 text-right text-sm font-bold text-slate-800">{fmt(p.amount,currency)}</td>
          <td className="px-5 py-3.5"><span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase">{p.method}</span></td>
          <td className="px-5 py-3.5 text-xs text-slate-500">{t.pay_dates[p.dateIdx]}</td>
          <td className="px-5 py-3.5"><div className={`flex items-center gap-1 ${p.status==="success"?"text-emerald-600":"text-amber-600"}`}>{p.status==="success"?<CheckCircle2 size={14}/>:<Clock size={14}/>}<span className="text-xs font-bold">{p.status==="success"?t.status_success:t.status_waiting}</span></div></td>
        </tr>))}
    </tbody></table></div>}
    <div className="px-6 py-3 bg-slate-50/50 flex items-center justify-between">
      <p className="text-[11px] text-slate-400">{(page-1)*perPage+1}–{Math.min(page*perPage,filtered.length)} / {filtered.length}</p>
      <div className="flex items-center gap-1">
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="p-1.5 rounded-lg border border-slate-200 text-slate-400 disabled:opacity-30"><ChevronLeft size={14}/></button>
        {Array.from({length:totalPages}).map((_,i)=><button key={i} onClick={()=>setPage(i+1)} className={`w-7 h-7 rounded-lg font-bold text-xs ${page===i+1?"bg-cyan-600 text-white":"text-slate-500 hover:bg-slate-100"}`}>{i+1}</button>)}
        <button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)} className="p-1.5 rounded-lg border border-slate-200 text-slate-400 disabled:opacity-30"><ChevronRight size={14}/></button>
      </div>
    </div>
  </A>
</div>);}

function PackagesScreen({currency,t,packages,setPackages,toast}){
  const[modal,setModal]=useState(null);
  const[delModal,setDelModal]=useState(null);
  const[form,setForm]=useState({name:"",price:0,tagKey:"tag_popular",img:"🌍"});
  const emojis=["🏝️","🌴","🗼","🏔️","🌅","🏖️","⛷️","🌍","🗽","🏯"];
  const handleSave=()=>{
    if(!form.name)return;
    if(modal==="edit"&&form.id){setPackages(prev=>prev.map(p=>p.id===form.id?{...p,...form}:p))}
    else{setPackages(prev=>[...prev,{id:Date.now(),name:form.name,price:Number(form.price),sales:"0",rating:4.5,tagKey:form.tagKey,img:form.img}])}
    setModal(null);toast(t.saved);
  };
  return(
<div className="space-y-6">
  <A className="flex flex-col md:flex-row md:items-end justify-between gap-4">
    <div><nav className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1"><span>{t.management}</span><ChevronRight size={10}/><span className="text-cyan-600">{t.packages_label}</span></nav>
    <h1 className="text-3xl font-black text-slate-900 tracking-tight" style={{fontFamily:"'Outfit',sans-serif"}}>{t.travel_packages}</h1>
    <p className="text-slate-500 text-sm mt-1">{t.packages_desc}</p></div>
    <button onClick={()=>{setForm({name:"",price:0,tagKey:"tag_popular",img:"🌍"});setModal("add")}} className="bg-cyan-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-600/25 hover:bg-cyan-700 active:scale-95"><PlusCircle size={18}/>{t.new_package}</button>
  </A>
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
    {packages.map((p,idx)=>(
      <A key={p.id} delay={idx*.05} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
        <div className="h-40 relative overflow-hidden flex items-center justify-center" style={{background:`linear-gradient(135deg,${["#e0f7fa","#fef3c7","#ede9fe","#e0f2fe","#fce7f3","#f0fdf4"][idx%6]},${["#b2ebf2","#fde68a","#c4b5fd","#bae6fd","#fbcfe8","#bbf7d0"][idx%6]})`}}>
          <span className="text-6xl group-hover:scale-125 transition-transform duration-500">{p.img}</span>
          <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-700 uppercase tracking-wider">{t[p.tagKey]||p.tagKey}</div>
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-amber-500"><Star size={12} fill="currentColor"/><span className="text-xs font-bold">{p.rating}</span></div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-3" style={{fontFamily:"'Outfit',sans-serif"}}>{p.name}</h3>
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl mb-3">
            <div><p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">{t.price}</p><p className="text-lg font-black text-cyan-600 truncate">{fmt(p.price,currency)}</p></div>
            <div className="text-right"><p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">{t.sales}</p><p className="text-base font-bold text-slate-800">{p.sales}</p></div>
          </div>
          <div className="flex gap-1.5 mb-4"><span className="px-2.5 py-1 bg-cyan-50 text-cyan-700 text-[10px] font-bold rounded-lg">{t.installments_12}</span><span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-lg">{t.no_interest}</span></div>
          <div className="mt-auto flex items-center gap-2">
            <button onClick={()=>{setForm({id:p.id,...p});setModal("edit")}} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 active:scale-95"><Edit2 size={14}/>{t.edit}</button>
            <button onClick={()=>setDelModal(p.id)} className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl"><Trash2 size={16}/></button>
          </div>
        </div>
      </A>))}
    <A delay={.3} className="group border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center hover:border-cyan-500 hover:bg-cyan-50/20 cursor-pointer" onClick={()=>{setForm({name:"",price:0,tagKey:"tag_popular",img:"🌍"});setModal("add")}}>
      <div className="w-14 h-14 rounded-full bg-slate-50 group-hover:bg-cyan-100 flex items-center justify-center mb-4"><MapPin size={24} className="text-slate-300 group-hover:text-cyan-600"/></div>
      <h3 className="text-base font-bold text-slate-800 mb-1">{t.add_adventure}</h3>
      <p className="text-slate-400 text-xs max-w-[180px] mb-4">{t.add_adventure_desc}</p>
      <span className="text-cyan-600 font-bold flex items-center gap-1 text-sm">{t.start} <ChevronRight size={14}/></span>
    </A>
  </div>
  <Modal open={!!modal} onClose={()=>setModal(null)} title={modal==="edit"?t.edit:t.new_package}>
    <div className="space-y-4">
      <div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{t.name_label}</label><input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20"/></div>
      <div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{t.price} (TL)</label><input type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20"/></div>
      <div><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Emoji</label><div className="flex flex-wrap gap-2">{emojis.map(e=><button key={e} onClick={()=>setForm({...form,img:e})} className={`text-2xl p-1 rounded-lg ${form.img===e?"bg-cyan-100 ring-2 ring-cyan-500":""}`}>{e}</button>)}</div></div>
      <div className="flex justify-end gap-2 pt-2"><button onClick={()=>setModal(null)} className="px-5 py-2 rounded-xl font-bold text-slate-500 hover:bg-slate-50 text-sm">{t.cancel}</button><button onClick={handleSave} className="px-5 py-2 bg-cyan-600 text-white rounded-xl font-bold text-sm hover:bg-cyan-700 active:scale-95">{modal==="edit"?t.save:t.add}</button></div>
    </div>
  </Modal>
  <Modal open={!!delModal} onClose={()=>setDelModal(null)} title={t.delete_label}>
    <p className="text-sm text-slate-600 mb-4">{t.confirm_delete}</p>
    <div className="flex justify-end gap-2"><button onClick={()=>setDelModal(null)} className="px-5 py-2 rounded-xl font-bold text-slate-500 hover:bg-slate-50 text-sm">{t.no}</button><button onClick={()=>{setPackages(prev=>prev.filter(p=>p.id!==delModal));setDelModal(null);toast(t.deleted)}} className="px-5 py-2 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 active:scale-95">{t.yes}</button></div>
  </Modal>
</div>);}

function AnalyticsScreen({t,currency}){
  const[period,setPeriod]=useState("monthly");
  const data=period==="monthly"?CHART_M:CHART_Y;
  return(
<div className="space-y-6">
  <A className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
    <div><p className="text-cyan-600 font-bold text-xs tracking-widest uppercase mb-1">{t.statistics}</p>
    <h1 className="text-3xl font-black text-slate-900 tracking-tight" style={{fontFamily:"'Outfit',sans-serif"}}>{t.bnlp_analytics}</h1>
    <p className="text-slate-500 text-sm mt-1 italic">{t.bnlp_desc}</p></div>
    <div className="flex gap-2">
      <div className="flex bg-slate-100 rounded-lg p-0.5">
        <button onClick={()=>setPeriod("monthly")} className={`px-4 py-1.5 rounded-md text-[11px] font-bold transition-all ${period==="monthly"?"bg-white text-cyan-600 shadow-sm":"text-slate-400"}`}>{t.monthly}</button>
        <button onClick={()=>setPeriod("yearly")} className={`px-4 py-1.5 rounded-md text-[11px] font-bold transition-all ${period==="yearly"?"bg-white text-cyan-600 shadow-sm":"text-slate-400"}`}>{t.yearly}</button>
      </div>
    </div>
  </A>
  <div className="grid grid-cols-12 gap-5">
    <A delay={.05} className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-7 border border-slate-100">
      <div className="flex justify-between items-start mb-10">
        <div><span className="text-[10px] font-bold uppercase tracking-[.2em] text-cyan-600 mb-1 block">{t.journey_status}</span><h3 className="text-lg font-bold text-slate-900" style={{fontFamily:"'Outfit',sans-serif"}}>{t.goal_completion}</h3></div>
        <div className="text-right"><span className="text-4xl font-black text-cyan-600 tracking-tighter">%{period==="monthly"?"78.4":"72.1"}</span><p className="text-[11px] text-slate-400 mt-1 flex items-center justify-end gap-1 font-bold"><TrendingUp size={11} className="text-cyan-600"/>+4.2%</p></div>
      </div>
      <div className="flex items-end gap-1.5" style={{height:180}}>{data.map((h,i)=><Bar key={`${period}-${i}`} height={h} delay={i} color={h>75?"#06b6d4":"#94a3b8"}/>)}</div>
      <div className="flex justify-between mt-3 px-1">{t.months.map((m,i)=><span key={i} className="text-[10px] font-bold text-slate-400 uppercase flex-1 text-center">{m}</span>)}</div>
    </A>
    <A delay={.1} className="col-span-12 lg:col-span-4 text-white rounded-2xl p-7 flex flex-col justify-between" style={{background:"linear-gradient(135deg,#0891b2,#0e7490)"}}>
      <div><h3 className="text-lg font-bold mb-1" style={{fontFamily:"'Outfit',sans-serif"}}>{t.flexible_installments}</h3><p className="text-cyan-100/70 text-xs mb-6">{t.flex_desc}</p>
      <div className="space-y-5"><div className="flex items-center justify-between"><span className="text-sm font-medium text-cyan-100">{t.avg_installment}</span><span className="text-3xl font-black">9.2</span></div>
      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden"><div className="bg-amber-400 h-full w-3/4 rounded-full"/></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/[.08] rounded-xl p-4 border border-white/[.06]"><p className="text-[9px] uppercase font-bold tracking-widest text-cyan-100/50 mb-1">{t.most_preferred}</p><p className="text-lg font-bold">12 {t.installments}</p></div>
        <div className="bg-white/[.08] rounded-xl p-4 border border-white/[.06]"><p className="text-[9px] uppercase font-bold tracking-widest text-cyan-100/50 mb-1">{t.least_preferred}</p><p className="text-lg font-bold">3 {t.installments}</p></div>
      </div></div></div>
      <button className="mt-6 w-full bg-white text-cyan-700 rounded-xl py-3 font-bold text-sm hover:bg-cyan-50 active:scale-[.98]">{t.view_matrix}</button>
    </A>
  </div>
  <A delay={.15}>
    <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-slate-900" style={{fontFamily:"'Outfit',sans-serif"}}>{t.analytics_logs}</h3></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[{time:`14:22 • ${t.today}`,tag:t.log_critical,title:t.log1_title,desc:t.log1_desc,icon:TrendingUp,color:"bg-cyan-50 text-cyan-600",tagC:"bg-red-50 text-red-600"},
        {time:`12:10 • ${t.today}`,tag:t.log_success,title:t.log2_title,desc:t.log2_desc,icon:ShieldCheck,color:"bg-amber-50 text-amber-600",tagC:"bg-emerald-50 text-emerald-600"},
        {time:`09:45 • ${t.yesterday}`,tag:t.log_info,title:t.log3_title,desc:t.log3_desc,icon:Zap,color:"bg-slate-50 text-slate-500",tagC:"bg-slate-100 text-slate-500"}
      ].map((l,i)=>(
        <div key={i} className="bg-white p-5 rounded-2xl flex items-start gap-4 hover:shadow-md border border-slate-100">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${l.color}`}><l.icon size={20}/></div>
          <div className="min-w-0"><div className="flex justify-between items-center mb-1.5"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{l.time}</span><span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase ${l.tagC}`}>{l.tag}</span></div>
          <p className="text-sm font-bold text-slate-800 mb-0.5">{l.title}</p><p className="text-[11px] text-slate-400">{l.desc}</p></div>
        </div>))}
    </div>
  </A>
</div>);}

function PoolScreen({currency,t}){return(
<div className="space-y-6">
  <A><p className="text-cyan-600 font-bold text-xs tracking-widest uppercase mb-1">{t.financial_arch}</p>
  <h1 className="text-3xl font-black tracking-tight text-slate-900" style={{fontFamily:"'Outfit',sans-serif"}}>{t.pool_management} <span className="text-cyan-600">{t.pool_management2}</span></h1>
  <p className="text-slate-500 text-sm mt-1">{t.pool_desc}</p></A>
  <div className="grid grid-cols-12 gap-5">
    <A delay={.05} className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-7 border border-slate-100 relative overflow-hidden">
      <div className="flex justify-between items-start mb-10">
        <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.current_liquidity}</p><div className="flex items-baseline gap-2"><span className="text-3xl font-black tracking-tight text-slate-900 truncate">{fmt(12450000,currency)}</span><span className="text-cyan-600 font-bold text-xs bg-cyan-50 px-2.5 py-1 rounded-lg">+12.4%</span></div></div>
        <div className="text-right"><span className="text-amber-600 font-bold text-[11px] flex items-center gap-1 uppercase tracking-wider"><Zap size={12} fill="currentColor"/>{t.tree_growth}</span><span className="text-slate-400 text-[10px] font-bold mt-1 block">{t.last_update}: 14:22</span></div>
      </div>
      <div className="space-y-6">
        <div><div className="flex justify-between text-[10px] font-bold mb-2 tracking-widest"><span className="text-slate-400 uppercase">{t.reserve_fill}</span><span className="text-cyan-600">82%</span></div><div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{width:"82%",background:"linear-gradient(90deg,#06b6d4,#0891b2)"}}/></div></div>
        <div className="grid grid-cols-3 gap-4">
          {[{label:t.blocked,val:fmt(3200000,currency),cls:"bg-slate-50"},{label:t.upcoming_payments,val:fmt(1800000,currency),cls:"bg-slate-50 border-l-4 border-amber-400"},{label:t.free_fund,val:fmt(7450000,currency),cls:"bg-cyan-600 text-white"}].map((x,i)=>(
            <div key={i} className={`p-5 rounded-2xl ${x.cls}`}><p className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${x.cls.includes("cyan")?"text-cyan-100":"text-slate-400"}`}>{x.label}</p><p className="text-lg font-black truncate">{x.val}</p></div>))}
        </div>
      </div>
    </A>
    <A delay={.1} className="col-span-12 lg:col-span-4 text-white rounded-2xl p-7 relative overflow-hidden flex flex-col justify-between" style={{background:"linear-gradient(135deg,#0f172a,#1e293b)"}}>
      <div><TrendingUp size={36} className="text-amber-400 mb-4"/><p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{t.pool_return}</p><p className="text-5xl font-black tracking-tighter mb-3">%24.8</p><p className="text-slate-400 text-xs">{t.market_avg} <span className="text-white font-bold">4.2</span> {t.above_market}</p></div>
      <button className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-white/[.06]">{t.detailed_analysis} <ChevronRight size={14}/></button>
    </A>
  </div>
</div>);}

function SettingsScreen({t,toast,currency,setCurrency,lang,setLang}){
  const[sec,setSec]=useState("genel");
  const[platformName,setPlatformName]=useState("TatilFinans Management");
  const[supportEmail,setSupportEmail]=useState("destek@tatilfinans.com");
  const[maxInst,setMaxInst]=useState("12");
  const[reserveRatio,setReserveRatio]=useState(20);
  const[twoFA,setTwoFA]=useState(true);
  const[sessionTimeout,setSessionTimeout]=useState("30");
  const[emailNotif,setEmailNotif]=useState(true);
  const[smsNotif,setSmsNotif]=useState(false);
  const[pushNotif,setPushNotif]=useState(true);
  const secs=[{id:"genel",label:t.general_config,icon:Settings},{id:"guvenlik",label:t.security_auth,icon:ShieldCheck},{id:"bildirim",label:t.notification_settings,icon:Bell},{id:"entegrasyon",label:t.api_integrations,icon:Zap}];

  const Toggle=({checked,onChange,label})=>(
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
      <span className="font-bold text-slate-800 text-sm">{label}</span>
      <button onClick={()=>onChange(!checked)} className={`w-10 h-5 rounded-full transition-colors relative ${checked?"bg-cyan-600":"bg-slate-300"}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${checked?"left-5":"left-0.5"}`}/>
      </button>
    </div>
  );

  return(
<div className="space-y-6">
  <A><h1 className="text-3xl font-black tracking-tight text-slate-900" style={{fontFamily:"'Outfit',sans-serif"}}>{t.system_settings}</h1><p className="text-slate-500 text-sm mt-1">{t.settings_desc}</p></A>
  <div className="grid grid-cols-12 gap-6">
    <A delay={.05} className="col-span-12 lg:col-span-4 space-y-2">
      {secs.map(s=>(
        <button key={s.id} onClick={()=>setSec(s.id)} className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all text-left ${sec===s.id?"bg-white shadow-md border border-slate-100":"hover:bg-slate-50 text-slate-500"}`}>
          <div className={`p-2.5 rounded-xl ${sec===s.id?"bg-cyan-600 text-white":"bg-slate-100 text-slate-400"}`}><s.icon size={18}/></div>
          <div><p className={`font-bold text-sm ${sec===s.id?"text-slate-800":"text-slate-600"}`}>{s.label}</p><p className="text-[10px] text-slate-400 font-medium">{t.system_settings_sub}</p></div>
        </button>))}
    </A>
    <A delay={.1} className="col-span-12 lg:col-span-8 bg-white rounded-2xl p-7 border border-slate-100">
      {sec==="genel"&&<div className="space-y-8">
        <section><h3 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2" style={{fontFamily:"'Outfit',sans-serif"}}><div className="w-1 h-5 bg-cyan-600 rounded-full"/>{t.platform_identity}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t.platform_name}</label><input type="text" value={platformName} onChange={e=>setPlatformName(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20"/></div>
          <div className="space-y-1.5"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t.support_email}</label><input type="email" value={supportEmail} onChange={e=>setSupportEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20"/></div>
        </div></section>
        <section><h3 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2" style={{fontFamily:"'Outfit',sans-serif"}}><div className="w-1 h-5 bg-indigo-500 rounded-full"/>{t.locale_settings}</h3>
        <p className="text-xs text-slate-400 mb-4">{t.locale_desc}</p>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div><p className="font-bold text-slate-800 text-sm">{t.currency_label}</p><p className="text-[11px] text-slate-400">{currency==="TL"?"Türk Lirası (₺)":"US Dollar ($)"}</p></div>
            <div className="flex bg-white border border-slate-200 p-0.5 rounded-xl">
              {["TL","USD"].map(c=>(<button key={c} onClick={()=>setCurrency(c)} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${currency===c?"bg-cyan-600 text-white shadow-sm":"text-slate-400 hover:text-slate-600"}`}>{c==="TL"?"₺ TL":"$ USD"}</button>))}
            </div>
          </div>
          <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div><p className="font-bold text-slate-800 text-sm">{t.language_label}</p><p className="text-[11px] text-slate-400">{lang==="tr"?"Türkçe":"English"}</p></div>
            <div className="flex bg-white border border-slate-200 p-0.5 rounded-xl items-center">
              <Languages size={14} className="text-slate-400 ml-2 mr-1"/>
              {["tr","en"].map(l=>(<button key={l} onClick={()=>setLang(l)} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all uppercase ${lang===l?"bg-cyan-600 text-white shadow-sm":"text-slate-400 hover:text-slate-600"}`}>{l==="tr"?"Türkçe":"English"}</button>))}
            </div>
          </div>
        </div></section>
        <section><h3 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2" style={{fontFamily:"'Outfit',sans-serif"}}><div className="w-1 h-5 bg-amber-500 rounded-full"/>{t.financial_params}</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100"><div><p className="font-bold text-slate-800 text-sm">{t.max_installments}</p><p className="text-[11px] text-slate-400">{t.max_installments_desc}</p></div><select value={maxInst} onChange={e=>setMaxInst(e.target.value)} className="bg-white border border-slate-200 rounded-xl py-2 px-4 text-sm font-bold cursor-pointer"><option value="12">12 {t.installments}</option><option value="18">18 {t.installments}</option><option value="24">24 {t.installments}</option></select></div>
          <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100"><div><p className="font-bold text-slate-800 text-sm">{t.pool_reserve_ratio}</p><p className="text-[11px] text-slate-400">{t.pool_reserve_desc}</p></div><div className="flex items-center gap-3"><input type="range" min="5" max="50" value={reserveRatio} onChange={e=>setReserveRatio(Number(e.target.value))} className="w-28 accent-cyan-600"/><span className="text-sm font-black text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-lg">%{reserveRatio}</span></div></div>
        </div></section>
      </div>}

      {sec==="guvenlik"&&<div className="space-y-6">
        <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2" style={{fontFamily:"'Outfit',sans-serif"}}><div className="w-1 h-5 bg-indigo-500 rounded-full"/>{t.security_auth}</h3>
        <p className="text-sm text-slate-500 mb-4">{t.security_content}</p>
        <Toggle checked={twoFA} onChange={setTwoFA} label="Two-Factor Authentication (2FA)"/>
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="font-bold text-slate-800 text-sm">Session Timeout</span>
          <select value={sessionTimeout} onChange={e=>setSessionTimeout(e.target.value)} className="bg-white border border-slate-200 rounded-xl py-2 px-4 text-sm font-bold cursor-pointer"><option value="15">15 min</option><option value="30">30 min</option><option value="60">60 min</option></select>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="font-bold text-slate-800 text-sm mb-2">Admin Roles</p>
          <div className="space-y-2 text-xs text-slate-600">{["Super Admin — Full access","Editor — Read/Write","Viewer — Read only"].map((r,i)=><div key={i} className="flex items-center gap-2"><CheckCircle2 size={14} className="text-cyan-600"/>{r}</div>)}</div>
        </div>
      </div>}

      {sec==="bildirim"&&<div className="space-y-6">
        <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2" style={{fontFamily:"'Outfit',sans-serif"}}><div className="w-1 h-5 bg-amber-500 rounded-full"/>{t.notification_settings}</h3>
        <p className="text-sm text-slate-500 mb-4">{t.notif_content}</p>
        <Toggle checked={emailNotif} onChange={setEmailNotif} label="E-posta / Email"/>
        <Toggle checked={smsNotif} onChange={setSmsNotif} label="SMS"/>
        <Toggle checked={pushNotif} onChange={setPushNotif} label="Push Notifications"/>
      </div>}

      {sec==="entegrasyon"&&<div className="space-y-6">
        <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2" style={{fontFamily:"'Outfit',sans-serif"}}><div className="w-1 h-5 bg-emerald-500 rounded-full"/>{t.api_integrations}</h3>
        <p className="text-sm text-slate-500 mb-4">{t.api_content}</p>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
          <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">API Key</p><div className="flex gap-2"><input type="text" readOnly value="tfk_live_••••••••••••••••••••" className="flex-1 bg-white border border-slate-200 rounded-xl py-2 px-4 text-sm font-mono"/><button className="px-3 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold hover:bg-cyan-700">Copy</button></div></div>
          <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Webhook URL</p><input type="text" defaultValue="https://api.tatilfinans.com/webhooks" className="w-full bg-white border border-slate-200 rounded-xl py-2 px-4 text-sm"/></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {["Stripe","Iyzico","Firebase","Google Analytics"].map(s=>(
            <div key={s} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700">{s}</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{t.status_active}</span>
            </div>))}
        </div>
      </div>}

      <div className="pt-6 border-t border-slate-100 flex justify-end gap-2 mt-6">
        <button className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-50 text-sm">{t.cancel}</button>
        <button onClick={()=>toast(t.saved)} className="px-6 py-2.5 bg-cyan-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-cyan-600/20 hover:bg-cyan-700 active:scale-95">{t.save}</button>
      </div>
    </A>
  </div>
</div>);}

// AI Chat Panel
function AiChat({open,onClose,t}){
  const[msgs,setMsgs]=useState([{role:"ai",text:t.chat_welcome}]);
  const[input,setInput]=useState("");
  const endRef=useRef();
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"})},[msgs]);
  const send=()=>{
    if(!input.trim())return;
    const userMsg=input;setInput("");
    setMsgs(prev=>[...prev,{role:"user",text:userMsg}]);
    setTimeout(()=>{setMsgs(prev=>[...prev,{role:"ai",text:`"${userMsg}" — Bu özellik yakında aktif olacak. Şimdilik demo modundayız.`}])},800);
  };
  if(!open)return null;
  return(
    <div className="fixed bottom-24 right-6 w-80 h-[420px] bg-white rounded-2xl shadow-2xl border border-slate-100 z-[100] flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between" style={{background:"linear-gradient(135deg,#06b6d4,#0891b2)"}}>
        <div className="flex items-center gap-2"><Bot size={18} className="text-white"/><span className="text-sm font-bold text-white">{t.ai_assistant}</span></div>
        <button onClick={onClose} className="text-white/70 hover:text-white"><X size={16}/></button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {msgs.map((m,i)=>(
          <div key={i} className={`flex ${m.role==="user"?"justify-end":"justify-start"}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${m.role==="user"?"bg-cyan-600 text-white rounded-br-sm":"bg-slate-100 text-slate-700 rounded-bl-sm"}`}>{m.text}</div>
          </div>
        ))}
        <div ref={endRef}/>
      </div>
      <div className="px-3 py-2 border-t border-slate-100 flex gap-2">
        <input type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder={t.chat_placeholder}
          className="flex-1 bg-slate-50 border border-slate-100 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/20"/>
        <button onClick={send} className="p-2 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 active:scale-95"><Send size={14}/></button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function App(){
  const[screen,setScreen]=useState("dashboard");
  const[currency,setCurrency]=useState("TL");
  const[lang,setLang]=useState("tr");
  const[collapsed,setCollapsed]=useState(false);
  const[mobileOpen,setMobileOpen]=useState(false);
  const[key,setKey]=useState(0);
  const[searchQuery,setSearchQuery]=useState("");
  const[users,setUsers]=useState(INIT_USERS);
  const[payments]=useState(INIT_PAYMENTS);
  const[packages,setPackages]=useState(INIT_PACKAGES);
  const[toastMsg,setToastMsg]=useState(null);
  const[chatOpen,setChatOpen]=useState(false);

  const t=i18n[lang];
  const toast=(msg)=>setToastMsg(msg);
  const go=(s)=>{setScreen(s);setKey(k=>k+1);setSearchQuery("")};

  const render=()=>{
    switch(screen){
      case "dashboard":return <DashboardScreen currency={currency} t={t} setScreen={go} toast={toast}/>;
      case "users":return <UsersScreen currency={currency} t={t} users={users} setUsers={setUsers} searchQuery={searchQuery} toast={toast}/>;
      case "payments":return <PaymentsScreen currency={currency} t={t} payments={payments} searchQuery={searchQuery} toast={toast}/>;
      case "packages":return <PackagesScreen currency={currency} t={t} packages={packages} setPackages={setPackages} toast={toast}/>;
      case "analytics":return <AnalyticsScreen t={t} currency={currency}/>;
      case "pool":return <PoolScreen currency={currency} t={t}/>;
      case "settings":return <SettingsScreen t={t} toast={toast} currency={currency} setCurrency={setCurrency} lang={lang} setLang={setLang}/>;
      default:return <DashboardScreen currency={currency} t={t} setScreen={go} toast={toast}/>;
    }
  };

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box}body{margin:0;font-family:'Outfit',-apple-system,BlinkMacSystemFont,sans-serif;background:#f8fafc}
        ::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:99px}input[type="range"]{height:4px}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        .animate-bounce{animation:bounce .6s ease-in-out 2}
      `}</style>
      <div className="min-h-screen" style={{fontFamily:"'Outfit',sans-serif",background:"#f8fafc"}}>
        <Sidebar active={screen} setActive={go} collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} t={t}/>
        <TopBar collapsed={collapsed} t={t} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setMobileOpen={setMobileOpen}/>
        <main className="transition-all duration-300" style={{marginLeft:window.innerWidth<768?0:collapsed?72:256,padding:"72px 16px 48px",paddingLeft:window.innerWidth<768?16:28,paddingRight:window.innerWidth<768?16:28}}>
          <div key={key}>{render()}</div>
        </main>

        {/* AI FAB */}
        <button onClick={()=>setChatOpen(!chatOpen)} className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
          style={{background:"linear-gradient(135deg,#06b6d4,#0891b2)",boxShadow:"0 8px 32px rgba(6,182,212,.35)"}}>
          {chatOpen?<X size={24} className="text-white"/>:<Bot size={26} className="text-white group-hover:rotate-12 transition-transform"/>}
        </button>
        <AiChat open={chatOpen} onClose={()=>setChatOpen(false)} t={t}/>

        {/* Toast */}
        {toastMsg&&<Toast message={toastMsg} onClose={()=>setToastMsg(null)}/>}
      </div>
    </>
  );
}
