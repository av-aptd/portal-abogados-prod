import { id } from "date-fns/locale";

export const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

export const months = [
  {
    name: "Enero",
    value: 0,
  },
  {
    name: "Febrero",
    value: 1,
  },
  {
    name: "Marzo",
    value: 2,
  },
  {
    name: "Abril",
    value: 3,
  },
  {
    name: "Mayo",
    value: 4,
  },
  {
    name: "Junio",
    value: 5,
  },
  {
    name: "Julio",
    value: 6,
  },
  {
    name: "Agosto",
    value: 7,
  },
  {
    name: "Septiembre",
    value: 8,
  },
  {
    name: "Octubre",
    value: 9,
  },
  {
    name: "Noviembre",
    value: 10,
  },
  {
    name: "Diciembre",
    value: 11,
  },
];

export const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

export const bankAccouts = [
  {
    id: 1,
    name: "Banco Sabadell",
    iban: "ES60 0081 0200 2000 0333 9139",
    concept: "Nombre cliente y LSO",
  },
  {
    id: 2,
    name: "Banco Santander",
    iban: "ES83 0049 4704 1120 1613 4058",
    concept: "Nombre cliente y LSO",
  },
  {
    id: 3,
    name: "Caixabank",
    iban: "ES82 2100 3678 0822 0009 3454",
    concept: "Nombre cliente y LSO",
  },
  {
    id: 4,
    name: "BBVA",
    iban: "ES03 0182 0262 9102 0245 6296",
    concept: "Nombre cliente y LSO",
  },
];

export const provinces = [
  { id: 1, name: "Álava" },
  { id: 2, name: "Albacete" },
  { id: 3, name: "Alacant" },
  { id: 4, name: "Almería" },
  { id: 5, name: "Ávila" },
  { id: 6, name: "Badajoz" },
  { id: 7, name: "Illes Balears" },
  { id: 8, name: "Barcelona" },
  { id: 9, name: "Burgos" },
  { id: 10, name: "Cáceres" },
  { id: 11, name: "Cádiz" },
  { id: 12, name: "Castelló" },
  { id: 13, name: "Ciudad Real" },
  { id: 14, name: "Córdoba" },
  { id: 15, name: "A Coruña" },
  { id: 16, name: "Cuenca" },
  { id: 17, name: "Girona" },
  { id: 18, name: "Granada" },
  { id: 19, name: "Guadalajara" },
  { id: 20, name: "Gipuzkoa" },
  { id: 21, name: "Huelva" },
  { id: 22, name: "Huesca" },
  { id: 23, name: "Jaén" },
  { id: 24, name: "León" },
  { id: 25, name: "Lleida" },
  { id: 26, name: "La Rioja" },
  { id: 27, name: "Lugo" },
  { id: 28, name: "Madrid" },
  { id: 29, name: "Málaga" },
  { id: 30, name: "Murcia" },
  { id: 31, name: "Nafarroa" },
  { id: 32, name: "Ourense" },
  { id: 33, name: "Asturias" },
  { id: 34, name: "Palencia" },
  { id: 35, name: "Las Palmas" },
  { id: 36, name: "Pontevedra" },
  { id: 37, name: "Salamanca" },
  { id: 38, name: "Sta. Cruz de Tenerife" },
  { id: 39, name: "Cantabria" },
  { id: 40, name: "Segovia" },
  { id: 41, name: "Sevilla" },
  { id: 42, name: "Soria" },
  { id: 43, name: "Tarragona" },
  { id: 44, name: "Teruel" },
  { id: 45, name: "Toledo" },
  { id: 46, name: "Valéncia" },
  { id: 47, name: "Valladolid" },
  { id: 48, name: "Bizkaia" },
  { id: 49, name: "Zamora" },
  { id: 50, name: "Zaragoza" },
  { id: 51, name: "Ceuta" },
  { id: 52, name: "Melilla" },
];

export const getProvinceName = (id: any) => {
  const province = provinces.find((province) => province.id === id);
  return province ? province.name : "No encontrado";
};

export const getTenantName = ({ tenants, tenantid }: any) => {
  if (tenants == null) return null;
  return tenants.find((item: any) => item.id == tenantid)?.name;
};

export const canRefund = (profile: any) => {
  return profile.groups?.includes("Contabilidad");
};

export const especialUsers = [
  {
    id: 1,
    email: "tonino131825@gmail.com",
  },
  {
    id: 2,
    email: "javi_hervas99@hotmail.com",
  },
  {
    id: 3,
    email: "victoralonso3_1@hotmail.com",
  },
  {
    id: 4,
    email: "oscar.nogales.jimenez@gmail.com",
  },
  {
    id: 5,
    email: "guillemfish@hotmail.com",
  },
  {
    id: 6,
    email: "rafiaahmed075@gmail.com",
  },
  {
    id: 7,
    email: "taoufikhalifi@gmail.com",
  },
  {
    id: 8,
    email: "steffersonj@gmail.com",
  },
  {
    id: 9,
    email: "bertatejero@gmail.com",
  },
  {
    id: 10,
    email: "yeky.ace@gmail.com",
  },
  {
    id: 11,
    email: "Susana.cuelloparrilla@gmail.com",
  },
  {
    id: 12,
    email: "felinieto32@gmail.com",
  },
  {
    id: 13,
    email: "manuel_degomar@hotmail.es",
  },
  {
    id: 14,
    email: "harcher@hotmail.es",
  },
  {
    id: 15,
    email: "rosperezangelf@gmail.com",
  },
  {
    id: 16,
    email: "arantxaaguera@gmail.com",
  },
  {
    id: 17,
    email: "borjay7@gmail.com",
  },
  {
    id: 18,
    email: "arantxaaguera@gmail.com",
  },
  {
    id: 19,
    email: "acatsanchez@gmail.com",
  },
  {
    id: 20,
    email: "ludmilahristova47@gmail.com",
  },
  {
    id: 21,
    email: "diemexter@hotmail.com",
  },
  {
    id: 22,
    email: "mpepika@gmail.com",
  },
  {
    id: 23,
    email: "josepferrando.7@gmail.com",
  },
  {
    id: 24,
    email: "francaiz@hotmail.com",
  },
  {
    id: 25,
    email: "hilmerysteban@gmail.com",
  },
  {
    id: 26,
    email: "jgsjosegarcia@gmail.com",
  },
  {
    id: 27,
    email: "fm_angela@hotmail.com",
  },
  {
    id: 28,
    email: "amzil_2525@hotmail.com",
  },
  {
    id: 29,
    email: "montesdesion22@gmail.com",
  },
  {
    id: 30,
    email: "nati.melero@hotmail.es",
  },
  {
    id: 31,
    email: "aitor2201@hotmail.com",
  },
  {
    id: 32,
    email: "antonio.bernadcanto@gmail.com",
  },
  {
    id: 33,
    email: "ambarmodagc@gmail.com",
  },
  {
    id: 34,
    email: "susisushi66@gmail.com",
  },
  {
    id: 35,
    email: "antoniocorreabarrull756@gmail.com",
  },
  {
    id: 36,
    email: "mirza6870@gmail.com",
  },
  {
    id: 37,
    email: "domi68@hotmail.es",
  },
  {
    id: 38,
    email: "azizdabdou@hotmail.com",
  },
  {
    id: 39,
    email: "estevecaio@gmail.com",
  },
  {
    id: 40,
    email: "juanm.quess@gmail.com",
  },
  {
    id: 41,
    email: "magahepu@gmail.com",
  },
  {
    id: 42,
    email: "soniamartinezrodriguez00@gmail.com",
  },
  {
    id: 43,
    email: "fr6887566@gmail.com",
  },
  {
    id: 44,
    email: "alvarofernandez1294@gmail.com",
  },
  {
    id: 45,
    email: "cultiusjhb@gmail.com",
  },
  {
    id: 46,
    email: "drcarfer@gmail.com",
  },
  {
    id: 47,
    email: "lu24051998@gmail.com",
  },
  {
    id: 48,
    email: "ely.martos.g@gmail.com",
  },
  {
    id: 49,
    email: "felixysary@gmail.com",
  },
  {
    id: 50,
    email: "monicamariad20@gmail.com",
  },
  {
    id: 51,
    email: "meggyclocchiatti02@gmail.com",
  },
  {
    id: 52,
    email: "lu24051998@gmail.com",
  },
  {
    id: 53,
    email: "yoyobaes70@gmail.com",
  },
  {
    id: 54,
    email: "yoyobaes70@gmail.com",
  },
  {
    id: 55,
    email: "jaimegarcialopez@hotmail.com",
  },
  {
    id: 56,
    email: "waidotanas@gmail.com",
  },
  {
    id: 57,
    email: "gabacravoecanela2004@gmail.com",
  },
  {
    id: 58,
    email: "zaratrusta29@gmail.com",
  },
  {
    id: 59,
    email: "ajlopex@gmail.com",
  },
  {
    id: 60,
    email: "balterspm@gmail.com",
  },
  {
    id: 61,
    email: "orlandogongoe@gmail.com",
  },
  {
    id: 62,
    email: "alejandrodhm1@hotmail.com",
  },
  {
    id: 63,
    email: "ancoque@hotmail.com",
  },
  {
    id: 64,
    email: "jjavieralonso58@gmail.com",
  },
  {
    id: 65,
    email: "k9roesma@hotmail.com",
  },
  {
    id: 66,
    email: "edu__4343@hotmail.com",
  },
  {
    id: 67,
    email: "ancoque@hotmail.com",
  },
  {
    id: 68,
    email: "albin.urizar@gmail.com",
  },
  { id: 69, email: "davidpinamontes85@gmail.com" },
  {
    id: 70,
    email: "edwinvaldez.0808@gmail.com",
  },
  {
    id: 71,
    email: "cesarmedina_2012@hotmail.com",
  },
  {
    id: 72,
    email: "jairoroal88@gmail.com",
  },
  {
    id: 73,
    email: "ajotav7@gmail.com",
  },
  {
    id: 74,
    email: "lavoro1586@hotmail.com",
  },
  {
    id: 75,
    email: "miguel80.marto@gmail.com",
  },
  {
    id: 76,
    email: "raquelbesora86@gmail.com",
  },
];

export const bankFlipUsers = [
  "alex.verdaguer@abogadosparatusdeudas.es",
  "roman@abogadosparatusdeudas.es",
  "daniela.lopez@abogadosparatusdeudas.es",
];
