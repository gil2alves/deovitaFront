import { Home, LocalHospital,LocalHospitalOutlined,LocalHospitalSharp, Medication, Person, } from "@mui/icons-material";

const PerfilsMenu = [
  // admin array =0 group =1
  [
    {
      name: "Dashboard",
      icon: Home,
      route: "/dashboard",
      isSubmenu: false,
    },


    {
      name: "Medicos",
      icon: Medication,
      route: "#",
      isSubmenu: true,
      submenu: [

        {
          name: "+ Medicos",
          submenuRoute: "/adicionar/medicos",
        },

      ]
    },
    {
      name: "Pacientes",
      icon: Person,
      route: "#",
      isSubmenu: true,
      submenu: [

        {
          name: "+ Pacientes",
          submenuRoute: "/adicionar/paciente",
        },

      ]
    },
  ],
  // admin array =1 group =2
  [
    {
      name: "Dashboard",
      icon: Home,
      route: "/dashboard/medico",
      isSubmenu: false,
    },
    {
      name: "Consultas",
      icon: LocalHospitalSharp,
      route: "#",
      isSubmenu: true,
      submenu: [

        {
          name: "+ Nova Consulta",
          submenuRoute: "/nova/consulta",
        },
        {
          name: "Todas as Consultas",
          submenuRoute: "/tabela/consulta",
        },

      ]
    },

  ],
  // admin array =2 group =3
  [
    {
      name: "Dashboard",
      icon: Home,
      route: "/dashboard/paciente",
      isSubmenu: false,
    },

  ],


];

export default PerfilsMenu;
